import fs from "fs-extra";
import nearley from "nearley";
import path from "path";
import rules from "./grammar/index.ne";
const ext = ".btfunction";

export const grammar = nearley.Grammar.fromCompiled(rules);
export const parse = (input: string) => {
  const parser = new nearley.Parser(grammar);
  parser.feed(input);
  return parser.results[0][0];
};
export const load = (file: string, out?: string) => {
  const parser = new nearley.Parser(grammar);
  let wd;
  let toLoad;
  if (fs.lstatSync(file).isDirectory()) {
    let entry;
    try {
      entry =
        fs.readJSONSync(path.join(file, "pack.mcmeta")).entry || `index${ext}`;
    } catch (err) {
      if (err.code != "ENOENT") throw err;
      throw new Error(
        "specified file is a directory and the pack.mcmeta file is missing"
      );
    }
    if (!fs.existsSync(path.join(file, entry)))
      throw new Error(
        `main field in pack.mcmeta is empty or missing and there is no index${ext} file`
      );
    wd = file;
    toLoad = path.resolve(wd, entry);
  } else {
    toLoad = file;
    wd = path.dirname(file);
  }
  const output = out || path.join(wd, "data");
  const mctags = { tick: [], load: [] };
  const generated = {};
  let curnsp;
  load(toLoad);

  for (let [tag, values] of Object.entries(mctags)) {
    if (values.length) {
      let mcfuncpath = path.join(output, "minecraft/tags/functions");
      fs.mkdirpSync(mcfuncpath);
      fs.writeJSONSync(path.join(mcfuncpath, `${tag}.json`), { values });
    }
  }
  for (let [nsp, data] of Object.entries(generated)) {
    folder({ name: "btfngen", data }, [nsp, "functions"]);
  }

  function load(crfile) {
    parser.feed(fs.readFileSync(crfile, "utf8"));
    const parsed = parser.results[0][0];
    parsed.forEach(stmnt =>
      ({
        namespace: () => {
          curnsp = stmnt.name;
          fs.emptyDirSync(path.join(output, curnsp, "functions"));
          folder(Object.assign(stmnt, { name: "functions" }), [curnsp]);
        },
        include: () => {
          let fpath = path.resolve(path.dirname(crfile), stmnt.include);
          if (path.extname(fpath) == "") {
            fpath = fpath + ext;
          }
          load(fpath);
        }
      }[stmnt.type]())
    );
  }
  function folder(data, flpath) {
    flpath.push(data.name);
    fs.mkdirpSync(path.join(output, ...flpath));
    data.data.forEach(statement =>
      ({
        function: func => {
          const handleCommand = com =>
            ({
              function: () => {
                generated[curnsp] = generated[curnsp]
                  ? generated[curnsp].concat(com)
                  : [com];
                com.name = `func${generated[curnsp].length}`;
                return `function ${curnsp}:btfngen/${com.name}`;
              },
              execute: () =>
                com.text.replace(
                  /%EXECUTECOMMAND%/,
                  handleCommand(com.command)
                ),
              if: () =>
                `execute ${com.not ? "unless" : "if"} ${
                  com.condition
                } run ${handleCommand({
                  type: "function",
                  commands: com.commands
                })}`,
              undefined: () => com.text
            }[com.type]());
          let fnfile = func.commands.reduce(
            (str, cur) => str + handleCommand(cur) + "\n",
            ""
          );
          if (func.mctag) {
            mctags[func.mctag].push(
              `${curnsp}:${flpath
                .slice(2)
                .concat(func.name)
                .join("/")}`
            );
          }
          fs.writeFileSync(
            path.join(output, ...flpath, func.name + ".mcfunction"),
            fnfile
          );
        },
        folder: data => folder(data, flpath)
      }[statement.type](statement))
    );
  }
};
