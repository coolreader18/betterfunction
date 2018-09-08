import * as nearley from "nearley";
import { TransformContext } from "./compile";
import { Err } from "./errors";
import * as rules from "./grammar/index.ne";
import {
  btfnNamespace,
  FuncTransformContext,
  Plugin,
  PluginChild,
  PluginFunc,
  PluginFuncType
} from "./plugin";
import * as btfn from "./token-defs";

export const transformNamespace = (
  nsp: btfn.NamespaceStatement | btfn.FolderStatement,
  ctx: TransformContext
) => {
  ctx.addNamespace(nsp.name);
  ctx.stack.push(nsp.name);
  for (const stmnt of nsp.statements) {
    switch (stmnt.type) {
      // In case there were to be namespace-exclusive statements
      default:
        transformFolderChild(stmnt, ctx);
        break;
    }
  }
  ctx.stack.pop();
};

export const transformFolder = (
  folder: btfn.FolderStatement | btfn.NamespaceStatement,
  ctx: TransformContext
) => {
  ctx.addFolder(folder.name);
  ctx.stack.push(folder.name);
  for (const stmnt of folder.statements) {
    transformFolderChild(stmnt, ctx);
  }
  ctx.stack.pop();
};

const transformFolderChild = (
  stmnt: btfn.FolderStatement["statements"][number],
  ctx: TransformContext
) => {
  switch (stmnt.type) {
    case "functionStatement":
      transformFunction(stmnt, ctx);
      break;
    case "folderStatement":
      transformFolder(stmnt, ctx);
      break;
  }
};

export const transformFunction = (
  func: btfn.FunctionStatement,
  ctx: TransformContext
): BtfnOutputFunction => {
  if (func.mctag) ctx.addTagged(func.mctag, func.name);
  const cmds: string[] = [];
  for (const stmnt of func.statements) {
    validateCall(ctx.lib, stmnt);
    cmds.push(transformCall(stmnt, ctx));
  }
  return {
    type: "function",
    outputText: cmds.join("\n"),
    tag: func.mctag
  };
};

export const validateCall = (lib: Plugin, { params, func }: btfn.Call) => {
  const funcDef = getFuncDef(lib, func);
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
export const validateTypes = (
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

export const transformCall = (call: btfn.Call, ctx: TransformContext): string =>
  getFuncDef(ctx.lib, call.func)!.transform(
    call.params.posits,
    call.params.named,
    ctx.funcCtx
  );

const getFuncDef = (lib: Plugin, { path }: btfn.FuncIdent): PluginFunc => {
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
    lib
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
export const parseCall = (content: string): btfn.Call => {
  content += ";";
  const parser = new nearley.Parser(callGrammar);
  parser.feed(content);
  return parser.results[0];
};

export interface BtfnOutputNamespace {
  type: "namespace";
  generated: string[];
  children: BtfnOutputFolder["children"];
}
export interface BtfnOutputFolder {
  type: "folder";
  children: {
    [k: string]: BtfnOutputFunction | BtfnOutputFolder;
  };
}
export interface BtfnOutputFunction {
  type: "function";
  outputText: string;
  tag: "tick" | "load" | null;
}
