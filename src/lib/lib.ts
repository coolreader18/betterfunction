type FindFromType<T extends LibType> = Extract<
  betterfunction.Expression,
  { type: T }
>;
type TupleValues<T extends any[]> = T extends Array<infer U> ? U : never;

export const btfnNamespace: unique symbol = Symbol("namespace");
interface ProtoLib {
  [k: string]: LibChild;
}
export interface Lib extends ProtoLib {
  [btfnNamespace]: true;
}
export type LibChild = LibFunc | Lib;
export type LibType = betterfunction.Expression["type"];
export type LibFuncType = LibType | LibType[];
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
export interface LibFunc<
  P extends LibFuncType[] = LibFuncType[],
  N extends { [k: string]: LibType } = { [k: string]: LibType }
> {
  posits: P;
  named: N;
  transform: (
    posits: {
      [k in keyof P]: FindFromType<
        Extract<P[k] extends LibType[] ? TupleValues<P[k]> : P[k], LibType>
      >
    },
    named: { [k in keyof N]: FindFromType<N[k]> },
    ctx: FuncTransformContext
  ) => string;
}
export const nsp = (nsp: ProtoLib): Lib => ({
  ...nsp,
  [btfnNamespace]: true
});
export const fn = <P extends LibFuncType[], N extends { [k: string]: LibType }>(
  func: LibFunc<P, N>
) => func;
