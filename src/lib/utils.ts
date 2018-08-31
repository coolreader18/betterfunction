import { SimpleCall } from "./lib";
import * as path from "path";
import * as fs from "fs-extra";

export const transformSimpleCall = ({
  func,
  named,
  posits
}: SimpleCall): betterfunction.CallStatement => ({
  type: "callStatement",
  func: {
    type: "funcIdent",
    path: func.split("::")
  },
  parens: false,
  params: {
    type: "callParams",
    posits,
    named
  }
});

export const feedStream = (
  parser: nearley.Parser,
  stream: NodeJS.ReadableStream
) => stream.on("data", (data: string) => parser.feed(data));

export const getEntryOut = (file: string, outDir?: string) => {
  file = path.resolve(file);
  let config: {
    entry: string;
    dir: string;
  };
  if (fs.statSync(file).isDirectory()) {
    const packPath = path.join(file, "pack.mcmeta");

    const entry: string =
      (fs.existsSync(packPath) && fs.readJSONSync(packPath).entry) ||
      path.join(file, `main${ext}`);

    if (!fs.existsSync(entry)) {
      throw new Error(`the entry file ${entry} does not exist`);
    }
    config = { dir: file, entry };
  } else {
    config = {
      entry: file,
      dir: path.dirname(file)
    };
  }
  return {
    outDir:
      outDir != null ? path.resolve(outDir) : path.join(config.dir, "data"),
    ...config
  };
};

export const ext = ".btfunction";
