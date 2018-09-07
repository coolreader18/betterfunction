import {
  PluginFuncType,
  PluginFunc,
  StringEnum,
  PluginChild,
  Namespace
} from ".";
import { btfnNamespace } from "./btfn-namespace";
import * as btfn from "../token-defs";

export const nsp = (nsp: { [k: string]: PluginChild }): Namespace => ({
  ...nsp,
  [btfnNamespace]: true
});
export const fn = <
  P extends PluginFuncType[],
  N extends { [k: string]: PluginFuncType }
>(
  func: PluginFunc<P, N>
) => func;
export const strEnum = <O extends string>(...options: O[]): StringEnum<O> => ({
  type: "string",
  options
});
export const p = <T extends PluginFuncType[]>(...a: T) => a;
export const mkString = <S extends string>(content: S): btfn.String<S> => ({
  type: "string",
  content
});
