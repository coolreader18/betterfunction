import { SimpleCall } from "./plugin";
import * as path from "path";
import * as fs from "fs-extra";
import * as btfn from "./token-defs";

export const simpleCall = ({ func, named, posits }: SimpleCall): btfn.Call => ({
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

interface Entry {
  /** The directory containing the entry file */
  dir: string;
  /** The entry file */
  entry: string;
  /** The directory to output to */
  outDir: string;
}
export const getEntryOut = (file: string, outDir?: string): Entry => {
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

export class TransformContext {
  mctags: { tick: string[][]; load: string[][] } = { tick: [], load: [] };
  gen: string[] = [];
  stack: string[] = [];
  genFunc(content: string) {
    const id = this.gen.push(content);
    return `${this.stack[0]}:btfngen/func${id}`;
  }
}
