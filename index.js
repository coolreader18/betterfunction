#!/usr/bin/env node
if (process.argv[2]) {
  const nearley = require("nearley");
  const grammar = require("./grammar.js");
  const fs = require("fs-extra");
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  const path = require("path");
  let wd = path.dirname(path.join(process.cwd(), process.argv[2]));
  String.prototype.trimLeft = function trimLeft() {
    return this.replace(/^\s*/, "");
  };
  const ext = ".crfunction"; // still not sure

  const tick = [];
  const generated = {};
  let curnsp;
  load(path.join(wd, path.basename(process.argv[2])));

  if (tick.length) {
    let mcfuncpath = path.join(wd, "data/minecraft/tags/functions");
    fs.mkdirpSync(mcfuncpath);
    fs.writeJSONSync(path.join(mcfuncpath, "tick.json"), { values: tick });
  }
  for (let nsp in generated) {
    folder(
      { name: "crfngen", data: generated[nsp] },
      path.join("data", nsp, "functions")
    );
  }

  console.log("\x1b[32m", "Done!");

  function load(crfile) {
    let crfn = fs.readFileSync(crfile, "utf8");
    parser.feed(crfn);
    let parsed = parser.results[0][0];
    parsed.forEach(statement => {
      if (statement) {
        ({
          namespace(data) {
            curnsp = data.name;
            let relpath = path.join("data", curnsp, "functions");
            fs.emptyDirSync(path.join(wd, relpath));
            folder(Object.assign(data, { name: "" }), relpath);
          },
          include(file) {
            let fpath = path.join(path.dirname(crfile), file.include);
            if (path.extname(fpath) == "") {
              fpath = fpath + ext;
            }
            load(fpath);
          }
        }[statement.type](statement));
      }
    });
  }
  function folder(data, flpath) {
    flpath = path.join(flpath, data.name);
    fs.mkdirpSync(flpath);
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
                return `function ${curnsp}:crfngen/${com.name}`;
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
          if (func.tick) {
            let nsppath = flpath
              .split("/")
              .slice(1)
              .join("/");
            tick.push(`${curnsp}:${nsppath ? nsppath + "/" : ""}${func.name}`);
          }
          fs.writeFileSync(
            path.join(wd, flpath, func.name + ".mcfunction"),
            fnfile
          );
        },
        folder: data => folder(data, flpath)
      }[statement.type](statement))
    );
  }
} else {
  console.error("\x1b[31m", new Error("Must supply an argument").toString());
}
