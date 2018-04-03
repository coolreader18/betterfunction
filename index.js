#!/usr/bin/env node
const nearley = require("nearley");
const grammar = require("./grammar.js");
const fs = require("fs-extra");
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
const path = require("path");
const { terminal: term } = require("terminal-kit");
const ext = ".crfunction"; // still not sure
require("yargs").usage(
  "$0 <file> [args]",
  "parse a creeperfunction file into a datapack",
  yargs =>
    yargs
      .positional("file", {
        description: "the file or folder to parse into a datapack",
        type: "string"
      })
      .option("output", {
        alias: "o",
        type: "string",
        description:
          "where to save the datapack instead dirname(crfunction)/data"
      }),
  argv => {
    const file = path.resolve(process.cwd(), argv.file);
    let wd;
    let toLoad;
    if (fs.lstatSync(file).isDirectory()) {
      let entry;
      try {
        entry = fs.readJSONSync(path.join(file, "pack.mcmeta")).entry;
      } catch (err) {
        if (err.code != "ENOENT") throw err;
        throw new Error(
          "specified file is a directory and the pack.mcmeta file is missing"
        );
      }
      if (!entry)
        throw new Error("main field in pack.mcmeta is empty or missing");
      wd = file;
      toLoad = path.resolve(wd, entry);
    } else {
      toLoad = file;
      wd = path.dirname(file);
    }
    const output = argv.output
      ? path.join(process.cwd(), argv.output)
      : path.join(wd, "data");
    const tick = [];
    const generated = {};
    let curnsp;
    load(toLoad);

    if (tick.length) {
      let mcfuncpath = path.join(output, "minecraft/tags/functions");
      fs.mkdirpSync(mcfuncpath);
      fs.writeJSONSync(path.join(mcfuncpath, "tick.json"), { values: tick });
    }
    for (let [nsp, data] of Object.entries(generated)) {
      folder({ name: "crfngen", data }, [nsp, "functions"]);
    }

    term.green.bold("Done!\n");

    function load(crfile) {
      parser.feed(fs.readFileSync(crfile, "utf8"));
      const parsed = parser.results[0][0];
      parsed.forEach(stmnt => {
        if (stmnt) {
          ({
            namespace: () => {
              curnsp = stmnt.name;
              fs.emptyDirSync(path.join(output, curnsp, "functions"));
              folder(Object.assign(stmnt, { name: "functions" }), [curnsp]);
            },
            include: () => {
              let fpath = path.join(path.dirname(crfile), stmnt.include);
              if (path.extname(fpath) == "") {
                fpath = fpath + ext;
              }
              load(fpath);
            }
          }[stmnt.type]());
        }
      });
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
              tick.push(`${curnsp}:${flpath.slice(2).join("/")}${func.name}`);
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
  }
).argv;
