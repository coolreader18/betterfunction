import { nsp, fn } from "./plugin";

const stdlib = nsp({
  heyo: fn({
    posits: [["bool", "string"]],
    named: { a: "bool" },
    transform: ([first], {}) => {
      console.log(first);
      return String(first.content);
    }
  })
});

export default stdlib;
