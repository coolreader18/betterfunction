import { Err, ErrType } from "../errors";

type FindFromType<T extends PluginType> = Extract<
  betterfunction.Expression,
  { type: T }
>;
type TupleValues<T extends any[]> = T extends Array<infer U> ? U : never;

export const btfnNamespace: unique symbol = Symbol("namespace");
export interface Plugin {
  [btfnNamespace]: true;
  [k: string]: PluginChild;
}
export type PluginChild = PluginFunc | Plugin | string;
export type PluginType = betterfunction.Expression["type"];
export type PluginFuncType = PluginType | PluginType[] | StringEnum;
export interface StringEnum<O extends string = string> {
  type: "string";
  options: O[];
}
export interface FuncTransformContext {
  genFunc: (content: string | betterfunction.Function) => string;
  transformCall: (
    call: betterfunction.CallStatement | string | SimpleCall
  ) => string;
}
export interface SimpleCall {
  func: string;
  posits: betterfunction.Expression[];
  named: { [k: string]: betterfunction.Expression };
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
    ? betterfunction.String<O>
    : FindFromType<
        Extract<
          T[k] extends PluginType[] ? TupleValues<T[k]> : T[k],
          PluginType
        >
      >
};
export const toStr = (
  strs: TemplateStringsArray | betterfunction.Expression,
  ...exprs: Array<betterfunction.Expression | string | undefined | boolean>
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
  func: betterfunction.Function,
  ctx: FuncTransformContext
): string => toStr`function ${ctx.genFunc(func.statements.join("\n"))}`;
export const tagId: ["tag", "id"] = ["tag", "id"];
export * from "./mc-data";
export * from "./utils";

const _toStr = (expr: betterfunction.Expression) => {
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

const singleSelStr = (val: betterfunction.ValSelector): string => {
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
