export const btfnNamespace: unique symbol = Symbol("namespace");
interface ProtoLib {
  [k: string]: LibChild;
}
export interface Lib extends ProtoLib {
  [btfnNamespace]: true;
}
export type LibChild = LibFunc | Lib;
export type LibType = betterfunction.Expression["type"];
export interface LibFunc {
  posits: LibType[];
  named: { [k: string]: LibType };
  transform: (
    posits: betterfunction.Expression[],
    named: { [k: string]: betterfunction.Expression }
  ) => string;
}
export const nsp = (nsp: ProtoLib): Lib => ({
  ...nsp,
  [btfnNamespace]: true
});

const stdlib: Lib = nsp({
  heyo: {
    posits: ["bool"],
    named: {},
    transform: ([bool]: [betterfunction.Bool]) => {
      console.log(bool);
      return String(bool.content);
    }
  }
});

export default stdlib;
