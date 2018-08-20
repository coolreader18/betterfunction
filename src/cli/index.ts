import chalk from "chalk";
import path from "path";
import yargs from "yargs";
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
    btfn.load(file, output ? path.resolve(process.cwd(), output) : undefined);
    console.log(chalk.green.bold("Done!\n"));
  }
).argv;
