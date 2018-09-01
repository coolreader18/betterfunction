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
