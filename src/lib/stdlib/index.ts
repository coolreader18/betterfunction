import {
  fn,
  nsp,
  p,
  strEnum,
  tagId,
  toStr,
  mkString,
  gamemode,
  difficulty
} from "../plugin";

import mcCommands from "./mc-commands";

const stdlib = nsp({
  ...mcCommands
});

export default stdlib;
