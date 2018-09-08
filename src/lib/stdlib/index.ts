import mcCommands from "./mc-commands";
import btfnStd from "./btfn-std";
import { Plugin } from "../plugin";

const stdlib: Plugin = {
  ...mcCommands,
  ...btfnStd
};

export default stdlib;
