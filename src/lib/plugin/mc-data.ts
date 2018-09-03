import { strEnum } from "./utils";

export const gamemode = strEnum(
  "adventure",
  "creative",
  "survival",
  "spectator"
);
export const difficulty = strEnum("peaceful", "easy", "normal", "hard");
