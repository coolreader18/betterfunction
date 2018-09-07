import * as fs from "fs-extra";

import * as nearley from "nearley";
import * as rules from "./grammar/index.ne";
import * as path from "path";
import {
  btfnNamespace,
  Plugin,
  PluginChild,
  PluginFunc,
  nsp,
  FuncTransformContext,
  PluginFuncType
} from "./plugin";
import stdlib from "./stdlib";
import { simpleCall, getEntryOut, TransformContext } from "./utils";
import { Err } from "./errors";
import * as btfn from "./token-defs";

export { btfn as tokens };

const btfnLib: Plugin = nsp({ ...stdlib });

export const grammar = nearley.Grammar.fromCompiled(rules);

export const process = (file: string, out?: string) => {
  const { outDir, entry } = getEntryOut(file, out);

  const output = transform(fs.readFileSync(entry, "utf8"));

  fs.mkdirpSync(outDir);

  for (const [tag, val] of Object.entries(output.tags)) {
    if (!val.length) continue;
    const tagsPath = path.join(outDir, "minecraft/tags/functions");
    fs.mkdirpSync(tagsPath);
    fs.writeJSONSync(path.join(tagsPath, `${tag}.json`), {
      values: val.map(([nsp, ...funcPath]) => `${nsp}:${funcPath.join("/")}`)
    });
  }

  for (const [name, nsp] of Object.entries(output.namespaces)) {
    const funcsDir = path.join(outDir, name, "functions");

    writeChildren(nsp.children, funcsDir);

    const genDir = path.join(funcsDir, "btfngen");
    nsp.generated.forEach((func, i) => {
      fs.writeFileSync(path.join(genDir, `${func}${i + 1}.mcfunction`), func);
    });
  }
};
const writeChildren = (children: BtfnOutputFolder["children"], dir: string) => {
  fs.mkdirpSync(dir);
  for (const [name, child] of Object.entries(children)) {
    switch (child.type) {
      case "folder":
        writeChildren(child.children, path.join(dir, name));
        break;
      case "function":
        fs.writeFileSync(
          path.join(dir, `${name}.mcfunction`),
          child.outputText
        );
        break;
    }
  }
};

interface BtfnOutput {
  namespaces: {
    [k: string]: BtfnOutputNamespace;
  };
  tags: {
    tick: string[][];
    load: string[][];
  };
}

export const transform = (content: string): BtfnOutput => {
  const parser = new nearley.Parser(grammar);
  parser.feed(content);
  const parsed: btfn.File = parser.results[0];
  const ctx = new TransformContext();
  const out: BtfnOutput = { namespaces: {}, tags: ctx.mctags };
  for (const stmnt of parsed.statements) {
    switch (stmnt.type) {
      case "namespaceStatement":
        ctx.stack.push(stmnt.name);
        const nsp = transformNamespace(stmnt, ctx);
        ctx.stack.pop();
        out.namespaces[stmnt.name] = nsp;
        break;
    }
  }
  return out;
};

interface BtfnOutputNamespace {
  type: "namespace";
  generated: string[];
  children: BtfnOutputFolder["children"];
}
const transformNamespace = (
  nsp: btfn.NamespaceStatement | btfn.FolderStatement,
  ctx: TransformContext
) => {
  const out: BtfnOutputNamespace = {
    type: "namespace",
    generated: [],
    children: {}
  };
  ctx.gen = out.generated;
  out.children = transformFolder(nsp, ctx).children;
  return out;
};

interface BtfnOutputFolder {
  type: "folder";
  children: {
    [k: string]: BtfnOutputFunction | BtfnOutputFolder;
  };
}
const transformFolder = (
  folder: btfn.FolderStatement | btfn.NamespaceStatement,
  ctx: TransformContext
): BtfnOutputFolder => {
  const out: BtfnOutputFolder = {
    type: "folder",
    children: {}
  };
  for (const stmnt of folder.statements) {
    switch (stmnt.type) {
      case "functionStatement":
        out.children[stmnt.name] = transformFunction(stmnt, ctx);
        break;
      case "folderStatement":
        ctx.stack.push(stmnt.type);
        out.children[stmnt.name] = transformFolder(stmnt, ctx);
        ctx.stack.pop();
        break;
    }
  }
  return out;
};

interface BtfnOutputFunction {
  type: "function";
  outputText: string;
  tag: "tick" | "load" | null;
}
const transformFunction = (
  func: btfn.FunctionStatement,
  ctx: TransformContext
): BtfnOutputFunction => {
  if (func.mctag) ctx.mctags[func.mctag].push([...ctx.stack, func.name]);
  const cmds: string[] = [];
  for (const stmnt of func.statements) {
    validateCall(stmnt);
    cmds.push(transformCall(stmnt, funcTransCtx(ctx)));
  }
  return {
    type: "function",
    outputText: cmds.join("\n"),
    tag: func.mctag
  };
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
