import * as fs from "fs-extra";
import * as nearley from "nearley";
import * as path from "path";
import * as rules from "./grammar/index.ne";
import {
  btfnNamespace,
  Plugin,
  PluginChild,
  PluginFunc,
  nsp,
  FuncTransformContext,
  PluginFuncType,
  toStr
} from "./plugin";
import stdlib from "./stdlib";
import { simpleCall, getEntryOut, TransformContext } from "./utils";
import { Err, ErrType } from "./errors";

const btfnLib: Plugin = nsp({ ...stdlib });

export const grammar = nearley.Grammar.fromCompiled(rules);

export const load = (file: string, out?: string) => {
  const parser = new nearley.Parser(grammar);

  const { outDir, entry, dir } = getEntryOut(file, out);
  const mctags = { tick: [], load: [] };
  const generated = {};

  parser.feed(fs.readFileSync(entry, "utf8"));
  const parsed: betterfunction.File = parser.results[0];
};

export const transform = (content: string) => {
  const parser = new nearley.Parser(grammar);
  parser.feed(content);
  const parsed: betterfunction.File = parser.results[0];
  const ctx = new TransformContext();
  for (const stmnt of parsed.statements) {
    switch (stmnt.type) {
      case "namespaceStatement":
        ctx.stack.push(stmnt.name);
        const nsp = transformNamespace(stmnt, ctx);
        ctx.stack.pop();
        console.log(nsp.function);
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
    cmds.push(transformCall(stmnt, funcTransCtx(ctx)));
  }
  return cmds.join("\n");
};
const funcTransCtx = (ctx: TransformContext): FuncTransformContext => ({
  genFunc: content =>
    ctx.genFunc(
      typeof content === "object"
        ? content.statements
            .map(call => {
              ctx.stack.push("inline_function");
              const out = transformCall(call, funcTransCtx(ctx));
              ctx.stack.pop();
              return out;
            })
            .join("\n")
        : content
    ),
  transformCall: callInput => {
    let call: betterfunction.CallStatement;
    if (typeof callInput === "string") call = parseCall(callInput);
    else if ("type" in callInput) call = callInput;
    else {
      call = simpleCall(callInput);
    }
    return transformCall(call, funcTransCtx(ctx));
  }
});

const validateCall = ({ params, func }: betterfunction.CallStatement) => {
  const funcDef = getFuncDef(func);
  if (!funcDef) return false;
  if (params.posits.length !== funcDef.posits.length) return false;
  const positsValid = params.posits.every((posit, i) =>
    validateTypes(posit, funcDef.posits[i], func.path)
  );
  if (!positsValid) return false;
  const namedValid = Object.entries(params.named).every(
    ([key, posit]) =>
      key in funcDef.named &&
      validateTypes(posit, funcDef.named[key], func.path)
  );
  if (!namedValid) return false;
  return true;
};
const validateTypes = (
  expr: betterfunction.Expression,
  funcType: PluginFuncType,
  path: string[]
): boolean => {
  const userType = expr.type;
  if (Array.isArray(funcType)) {
    return funcType.some(cur => validateTypes(expr, cur, path));
  } else if (typeof funcType === "object") {
    switch (funcType.type) {
      case "string":
        return (
          expr.type === "string" && funcType.options.includes(expr.content)
        );
    }
  } else if (typeof funcType === "string") {
    return userType === funcType;
  }
  throw new Err(
    ErrType.LIBRARY,
    `Invalid Type for function definition of ${path.join("::")}`
  );
};

const transformCall = (
  call: betterfunction.CallStatement,
  ctx: FuncTransformContext
): string =>
  getFuncDef(call.func)!.transform(call.params.posits, call.params.named, ctx);

const getFuncDef = ({ path }: betterfunction.FuncIdent): PluginFunc | null => {
  let cur: PluginChild = btfnLib;
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

  return typeof cur === "string"
    ? {
        posits: [],
        named: {},
        transform: () => cur as string
      }
    : (cur as PluginFunc);
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
