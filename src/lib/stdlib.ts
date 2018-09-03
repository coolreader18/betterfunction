import { nsp, fn, toStr } from "./plugin";

const stdlib = nsp({
  advancement: nsp({
    grant: fn({
      posits: ["selector"],
      named: {},
      transform: ([sel]) => toStr`advancement grant ${sel}`
    })
  })
});

export default stdlib;
