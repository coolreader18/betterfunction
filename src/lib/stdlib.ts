import { fn, nsp, p, strEnum, tagId, toStr } from "../plugin";

const stdlib = nsp({
  advancement: nsp({
    grant: fn({
      posits: p(
        "selector",
        strEnum("everything", "from", "only", "through", "until")
      ),
      named: { target: tagId },
      transform: ([sel, { content: criteria }], { target }) =>
        toStr`advancement grant ${sel} ${criteria} ${
          criteria !== "everything" ? target : ""
        }`
    }),
    revoke: fn({
      posits: p(
        "selector",
        strEnum("everything", "from", "only", "through", "until")
      ),
      named: { target: tagId },
      transform: ([sel, { content: criteria }], { target }) =>
        toStr`advancement revoke ${sel} ${criteria} ${
          criteria !== "everything" ? target : ""
        }`
    })
  })
});

export default stdlib;
