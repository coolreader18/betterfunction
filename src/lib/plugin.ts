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
export type PluginFuncType = PluginType | PluginType[];
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
  N extends { [k: string]: PluginType } = { [k: string]: PluginType }
> {
  posits: P;
  named: N;
  transform: (
    posits: {
      [k in keyof P]: FindFromType<
        Extract<
          P[k] extends PluginType[] ? TupleValues<P[k]> : P[k],
          PluginType
        >
      >
    },
    named: { [k in keyof N]: FindFromType<N[k]> },
    ctx: FuncTransformContext
  ) => string;
}
export const nsp = (nsp: ProtoPlugin): Plugin => ({
  ...nsp,
  [btfnNamespace]: true
});
export const fn = <
  P extends PluginFuncType[],
  N extends { [k: string]: PluginType }
>(
  func: PluginFunc<P, N>
) => func;
