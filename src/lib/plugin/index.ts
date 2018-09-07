import { Err, ErrType } from "../errors";
import { btfnNamespace } from "./btfn-namespace";
import * as btfn from "../token-defs";

type FindFromType<T extends PluginType> = Extract<btfn.Expression, { type: T }>;
type TupleValues<T extends any[]> = T extends Array<infer U> ? U : never;

export { btfnNamespace };
export interface Plugin {
  [k: string]: PluginChild;
}
export interface Namespace extends Plugin {
  [btfnNamespace]: true;
}
export type PluginChild = PluginFunc | Namespace | string;
export type PluginType = btfn.Expression["type"];
export type PluginFuncType = PluginType | PluginType[] | StringEnum;
export interface StringEnum<O extends string = string> {
  type: "string";
  options: O[];
}
export interface FuncTransformContext {
  genFunc: (content: string | btfn.Function) => string;
  transformCall: (call: btfn.Call | string | SimpleCall) => string;
}
export interface SimpleCall {
  func: string;
  posits: btfn.Expression[];
  named: { [k: string]: btfn.Expression };
}
export interface PluginFunc<
  P extends PluginFuncType[] = PluginFuncType[],
  N extends { [k: string]: PluginFuncType } = { [k: string]: PluginFuncType }
> {
  posits: P;
  named: N;
  transform: (
    posits: MapTypes<P>,
    named: Partial<MapTypes<N>>,
    ctx: FuncTransformContext
  ) => string;
}

type MapTypes<T extends { [k: string]: PluginFuncType } | PluginFuncType[]> = {
  [k in keyof T]: T[k] extends StringEnum<infer O>
    ? btfn.String<O>
    : FindFromType<
        Extract<
          T[k] extends PluginType[] ? TupleValues<T[k]> : T[k],
          PluginType
        >
      >
};
export const toStr = (
  strs: TemplateStringsArray | btfn.Expression,
  ...exprs: Array<btfn.Expression | string | undefined | boolean>
) => {
  if ("raw" in strs) {
    return strs.reduce((prev, cur, i) => {
      const expr = exprs[i - 1];
      let str = "";

      if (typeof expr === "string") str = expr;
      else if (typeof expr === "object") str = _toStr(expr);

      return `${prev}${str}${cur}`;
    });
  }
  return _toStr(strs);
};
export const funcToCmd = (
  func: btfn.Function,
  ctx: FuncTransformContext
): string => toStr`function ${ctx.genFunc(func.statements.join("\n"))}`;
export const tagId: ["tag", "id"] = ["tag", "id"];
export * from "./mc-data";
export * from "./utils";

const _toStr = (expr: btfn.Expression) => {
  switch (expr.type) {
    case "bool":
    case "num":
    case "string":
      return JSON.stringify(expr.content);
    case "selector":
      return `@${expr.target}[${Object.entries(expr.args)
        .map(([key, val]) => `${key}=${singleSelStr(val)}`)
        .join()}]`;
    case "tag":
    case "id":
      return `${expr.type === "tag" ? "#" : ""}${expr.nsp}:${expr.path.join(
        "/"
      )}`;
    default:
      throw new Err(
        ErrType.LIBRARY,
        `Expression of type ${expr.type} cannot be converted into a string`
      );
  }
};

const singleSelStr = (val: btfn.ValSelector): string => {
  switch (val.type) {
    case "optional":
      return `${val.not ? "!" : ""}${singleSelStr(val.value)}`;
    case "range":
      const start = val.start === null ? "" : val.start;
      const end = val.end === null ? "" : val.end;
      return `${start}..${end}`;
    case "map":
      return `{${Object.entries(val.data)
        .map(([key, val]) => `${key}=${singleSelStr(val)}`)
        .join()}}`;
    default:
      return toStr(val);
  }
};
