import * as chalk from "chalk";
import * as fs from "fs-extra";
import * as yargs from "yargs";
import * as btfn from "../lib/index";

yargs.usage(
  "$0 <file|directory> [args]",
  "parse a betterfunction file into a datapack",
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
  ({ file, output }) => {
    btfn.transform(
      fs.readFileSync(file, "utf8")
      //output ? path.resolve(process.cwd(), output) : undefined
    );
    console.log(chalk.default.green.bold("Done!\n"));
  }
).argv;
