import { Err, ErrType } from "./errors";
import { isTemplate } from "./utils";

type FindFromType<T extends PluginType> = Extract<
  betterfunction.Expression,
  { type: T }
>;
type TupleValues<T extends any[]> = T extends Array<infer U> ? U : never;

export const btfnNamespace: unique symbol = Symbol("namespace");
interface ProtoPlugin {
  [k: string]: PluginChild;
}
export interface Plugin extends ProtoPlugin {
  [btfnNamespace]: true;
}
export type PluginChild = PluginFunc | Plugin;
export type PluginType = betterfunction.Expression["type"];
export type PluginFuncType = PluginType | PluginType[] | StringEnum;
export interface StringEnum {
  type: "string";
  options: string[];
}
export interface FuncTransformContext {
  genFunc: (content: string) => string;
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
    posits: { [k in keyof P]: TypeFromFuncType<P[k]> },
    named: { [k in keyof N]: TypeFromFuncType<N[k]> },
    ctx: FuncTransformContext
  ) => string;
}

type TypeFromFuncType<T> = T extends PluginFuncType
  ? T extends StringEnum
    ? betterfunction.String & { content: TupleValues<T["options"]> }
    : FindFromType<
        Extract<T extends PluginType[] ? TupleValues<T> : T, PluginType>
      >
  : never;

export const nsp = (nsp: ProtoPlugin): Plugin => ({
  ...nsp,
  [btfnNamespace]: true
});
export const fn = <
  P extends PluginFuncType[],
  N extends { [k: string]: PluginFuncType }
>(
  func: PluginFunc<P, N>
) => func;
export const strEnum = (...options: string[]): StringEnum => ({
  type: "string",
  options
});
export const toStr = (
  strs: TemplateStringsArray | betterfunction.Expression,
  ...exprs: Array<betterfunction.Expression | string>
) => {
  if ("raw" in strs) {
    return strs.reduce((prev, cur, i) => {
      const expr = exprs[i - 1];
      return `${prev}${typeof expr === "string" ? expr : _toStr(expr)}${cur}`;
    });
  }
  return _toStr(strs);
};

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
    default:
      throw new Err(
        ErrType.LIBRARY,
        `Expression of type ${expr.type} cannot be converted into a string`
      );
  }
};

const singleSelStr = (val: betterfunction.ValSelector): string => {
  console.log(val);
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
