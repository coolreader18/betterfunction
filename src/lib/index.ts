import * as fs from "fs-extra";
import * as nearley from "nearley";
import * as path from "path";
import * as rules from "./grammar/index.ne";
import stdlib, {
  btfnNamespace,
  Lib,
  LibChild,
  LibFunc,
  LibType,
  nsp
} from "./lib";

const ext = ".btfunction";

const btfnLib: Lib = nsp({});
console.log(require("./lib"));

export const grammar = nearley.Grammar.fromCompiled(rules);
export const load = (file: string, out?: string) => {
  const parser = new nearley.Parser(grammar);

  const { outDir, entry, dir } = getEntryOut(file, out);
  const mctags = { tick: [], load: [] };
  const generated = {};

  parser.feed(fs.readFileSync(entry, "utf8"));
  const parsed: betterfunction.File = parser.results[0];
};

interface TransformContext {
  mctags: { tick: string[][]; load: string[][] };
  gen: string[];
  stack: string[];
}
export const transform = (content: string) => {
  const parser = new nearley.Parser(grammar);
  parser.feed(content);
  const parsed: betterfunction.File = parser.results[0];
  const ctx: TransformContext = {
    mctags: { tick: [], load: [] },
    gen: [],
    stack: []
  };
  for (const stmnt of parsed.statements) {
    switch (stmnt.type) {
      case "namespaceStatement":
        ctx.stack.push(stmnt.name);
        transformNamespace(stmnt, ctx);
        ctx.stack.pop();
        break;
    }
  }
};

interface NamespaceChildren {
  [k: string]: string | NamespaceChildren;
}
const transformNamespace = (
  nsp: betterfunction.NamespaceStatement | betterfunction.FolderStatement,
  ctx: TransformContext
) => {
  const children: NamespaceChildren = {};
  for (const stmnt of nsp.statements) {
    switch (stmnt.type) {
      case "functionStatement":
        children[stmnt.name] = transformFunction(stmnt, ctx);
        break;
      case "folderStatement":
        ctx.stack.push(stmnt.type);
        children[stmnt.name] = transformNamespace(stmnt, ctx);
        ctx.stack.pop();
        break;
    }
  }
  return children;
};

const transformFunction = (
  func: betterfunction.FunctionStatement,
  ctx: TransformContext
) => {
  if (func.mctag) ctx.mctags[func.mctag].push([...ctx.stack, func.name]);
  const cmds: string[] = [];
  for (const stmnt of func.statements) {
    const valid = validateCall(stmnt);
    if (!valid) throw new Error("oof");
    cmds.push(transformCall(stmnt));
  }
  return cmds.join("\n");
};

const validateCall = (call: betterfunction.CallStatement): boolean => {
  const funcDef = getFuncDef(call.func);
  if (!funcDef) return false;
  if (call.params.posits.length !== funcDef.posits.length) return false;
  const positsValid = call.params.posits.every((posit, i) =>
    validateTypes(posit.type, funcDef.posits[i])
  );
  if (!positsValid) return false;
  const namedValid = !Object.entries(call.params.named).some(
    ([key, posit]) =>
      key in funcDef.named && validateTypes(posit.type, funcDef.named[key])
  );
  if (!namedValid) return false;
  return true;
};
const validateTypes = (left: LibType, right: LibType) => left === right;

const transformCall = (call: betterfunction.CallStatement): string =>
  getFuncDef(call.func)!.transform(call.params.posits, call.params.named);

const getFuncDef = ({ path }: betterfunction.FuncIdent): LibFunc | null => {
  let cur: LibChild = btfnLib;
  const len = path.length;
  for (const [child, i] of path.map((cur, i) => [cur, i])) {
    cur = cur[child];
    if (
      !cur ||
      (cur[btfnNamespace] && i === len - 1) ||
      (!cur[btfnNamespace] && i < len - 1)
    ) {
      return null;
    }
  }
  return cur as LibFunc;
};

const feedStream = (parser: nearley.Parser, stream: NodeJS.ReadableStream) =>
  stream.on("data", (data: string) => parser.feed(data));

const getEntryOut = (file: string, outDir?: string) => {
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

Object.assign(btfnLib, stdlib);
