import * as fs from "fs-extra";
import * as nearley from "nearley";
import * as path from "path";
import * as rules from "./grammar/index.ne";
import {
  btfnNamespace,
  Lib,
  LibChild,
  LibFunc,
  LibType,
  nsp,
  FuncTransformContext,
  LibFuncType
} from "./lib";
import stdlib from "./stdlib";
import { transformSimpleCall, getEntryOut } from "./utils";

const btfnLib: Lib = nsp({ ...stdlib });

export const grammar = nearley.Grammar.fromCompiled(rules);

export const load = (file: string, out?: string) => {
  const parser = new nearley.Parser(grammar);

  const { outDir, entry, dir } = getEntryOut(file, out);
  const mctags = { tick: [], load: [] };
  const generated = {};

  parser.feed(fs.readFileSync(entry, "utf8"));
  const parsed: betterfunction.File = parser.results[0];
};

class TransformContext {
  mctags: { tick: string[][]; load: string[][] } = { tick: [], load: [] };
  gen: string[] = [];
  stack: string[] = [];
  genFunc(content: string) {
    const id = this.gen.push(content);
    return `${this.stack[0]}:btfngen/func${id}`;
  }
  getFuncCtx(): FuncTransformContext {
    return {
      genFunc: this.genFunc.bind(this),
      transformCall: callInput => {
        let call: betterfunction.CallStatement;
        if (typeof callInput === "string") call = parseCall(callInput);
        else if ("type" in callInput) call = callInput;
        else {
          call = transformSimpleCall(callInput);
        }

        return transformCall(call, this.getFuncCtx());
      }
    };
  }
}

export const transform = (content: string) => {
  const parser = new nearley.Parser(grammar);
  parser.feed(content);
  const parsed: betterfunction.File = parser.results[0];
  const ctx = new TransformContext();
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
): string => {
  if (func.mctag) ctx.mctags[func.mctag].push([...ctx.stack, func.name]);
  const cmds: string[] = [];
  for (const stmnt of func.statements) {
    const valid = validateCall(stmnt);
    if (!valid) throw new Error("oof");
    cmds.push(transformCall(stmnt, ctx.getFuncCtx()));
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
const validateTypes = (userType: LibType, funcType: LibFuncType): boolean => {
  if (Array.isArray(funcType)) {
    return funcType.includes(userType);
  } else {
    return userType === funcType;
  }
};

const transformCall = (
  call: betterfunction.CallStatement,
  ctx: FuncTransformContext
): string =>
  getFuncDef(call.func)!.transform(call.params.posits, call.params.named, ctx);

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

const callGrammar = nearley.Grammar.fromCompiled({
  ...rules,
  ParserStart: "callStatement"
});
const parseCall = (content: string): betterfunction.CallStatement => {
  content += ";";
  const parser = new nearley.Parser(callGrammar);
  parser.feed(content);
  return parser.results[0];
};
