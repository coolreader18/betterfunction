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
import { Err } from "./errors";
import * as btfn from "./token-defs";

export { btfn as tokens };

const btfnLib: Plugin = nsp({ ...stdlib });

export const grammar = nearley.Grammar.fromCompiled(rules);

export const load = (file: string, out?: string) => {
  const parser = new nearley.Parser(grammar);

  const { outDir, entry, dir } = getEntryOut(file, out);
  const mctags = { tick: [], load: [] };
  const generated = {};

  parser.feed(fs.readFileSync(entry, "utf8"));
  const parsed: btfn.File = parser.results[0];
};

export const transform = (content: string) => {
  const parser = new nearley.Parser(grammar);
  parser.feed(content);
  const parsed: btfn.File = parser.results[0];
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
  nsp: btfn.NamespaceStatement | btfn.FolderStatement,
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
  func: btfn.FunctionStatement,
  ctx: TransformContext
): string => {
  if (func.mctag) ctx.mctags[func.mctag].push([...ctx.stack, func.name]);
  const cmds: string[] = [];
  for (const stmnt of func.statements) {
    validateCall(stmnt);
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
    let call: btfn.Call;
    if (typeof callInput === "string") call = parseCall(callInput);
    else if ("type" in callInput) call = callInput;
    else {
      call = simpleCall(callInput);
    }
    return transformCall(call, funcTransCtx(ctx));
  }
});

const validateCall = ({ params, func }: btfn.Call) => {
  const funcDef = getFuncDef(func);
  if (params.posits.length !== funcDef.posits.length)
    throw new Err({
      type: "argsNumber",
      func: func.path,
      expect: funcDef.posits.length,
      actual: params.posits.length
    });
  params.posits.forEach((posit, i) => {
    if (!validateTypes(posit, funcDef.posits[i], func.path))
      throw new Err({
        type: "argsType",
        func: func.path,
        ind: i,
        expect: funcDef.posits[i],
        actual: posit.type
      });
  });
  Object.entries(params.named).forEach(([key, posit]) => {
    const passes =
      key in funcDef.named &&
      validateTypes(posit, funcDef.named[key], func.path);
    if (!passes)
      throw new Err({
        type: "namedArgs",
        func: func.path,
        key,
        expect: funcDef.named[key],
        actual: posit.type
      });
  });
};
const validateTypes = (
  expr: btfn.Expression,
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
  throw new Err({
    type: "plugin",
    msg: `Invalid type for function definition of ${path.join("::")}`
  });
};

const transformCall = (call: btfn.Call, ctx: FuncTransformContext): string =>
  getFuncDef(call.func)!.transform(call.params.posits, call.params.named, ctx);

const getFuncDef = ({ path }: btfn.FuncIdent): PluginFunc => {
  const len = path.length;

  const funcDef: PluginFunc | string = path.reduce(
    (prev: PluginChild | Plugin, cur, i) => {
      const child = prev[cur];
      if (
        !child ||
        (child[btfnNamespace] && i === len - 1) ||
        (!child[btfnNamespace] && i < len - 1)
      ) {
        throw new Err({ type: "badFunc", func: path });
      }
      return child;
    },
    btfnLib
  );

  return typeof funcDef === "string"
    ? {
        posits: [],
        named: {},
        transform: () => funcDef
      }
    : funcDef;
};

const callGrammar = nearley.Grammar.fromCompiled({
  ...rules,
  ParserStart: "callStatement"
});
const parseCall = (content: string): btfn.Call => {
  content += ";";
  const parser = new nearley.Parser(callGrammar);
  parser.feed(content);
  return parser.results[0];
};
