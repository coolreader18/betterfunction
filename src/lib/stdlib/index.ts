import { nsp } from "../plugin";

import mcCommands from "./mc-commands";
import btfnStd from "./btfn-std";

const stdlib = nsp({
  ...mcCommands,
  ...btfnStd
});

export default stdlib;
