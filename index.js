//#!/usr/bin/env node
if (process.argv[2]) {
  const nearley = require("nearley");
  const grammar = require("./grammar.js");
  const fs = require("fs-extra");
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  const path = require("path");
  var wd = path.dirname(path.join(process.cwd(), process.argv[2]));
  String.prototype.trimLeft = function trimLeft() {
    return this.replace(/^\s*/, "");
  };
  let ext = ".crfunction"; // still not sure

  var tick = [];
  var curnsp;
  load(path.join(wd, path.basename(process.argv[2])));

  if (tick.length) {
    var mcfuncpath = path.join(wd, "data/minecraft/tags/functions");
    fs.mkdirpSync(mcfuncpath);
    fs.writeJSONSync(path.join(mcfuncpath, "tick.json"), { values: tick });
  }

  console.log("\x1b[32m", "Done!");

  function load(crfile) {
    var crfn = fs.readFileSync(crfile, "utf8");
    parser.feed(crfn);
    var parsed = parser.results[0][0];
    parsed.forEach(statement => {
      if (statement) {
        ({
          namespace(data) {
            curnsp = data.name;
            var relpath = path.join("data", curnsp, "functions");
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
    var flpath = path.join(flpath, data.name);
    fs.mkdirpSync(flpath);
    data.data.forEach(statement => {
      ({
        ["function"](func) {
          var fnfile = func.commands.join("\n");
          var reg = /%crfngen(\d+)%/g;
          for (var res = reg.exec(fnfile); res; res = reg.exec(fnfile)) {
            fnfile = fnfile.replace(
              new RegExp(res[0]),
              `${curnsp}:crfngen/func${res[1]}`
            );
          }
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
        folder(data) {
          folder(data, flpath);
        }
      }[statement.type](statement));
    });
  }
} else {
  console.error("\x1b[31m", new Error("Must supply an argument").toString());
}
