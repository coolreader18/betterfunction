import { fn, nsp, p, strEnum, tagId, toStr } from "../plugin";
import { Err, ErrType } from "../errors";

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
  }),
  bossbar: nsp({
    add: fn({
      posits: p("id", "string"),
      named: {},
      transform: ([id, name]) => toStr`bossbar add ${id} ${name.content}`
    }),
    get: fn({
      posits: p("id", strEnum("max", "players", "value", "visible")),
      named: {},
      transform: ([id, prop]) => toStr`bossbar get ${id} ${prop.content}`
    }),
    list: fn({ posits: p(), named: {}, transform: () => `bossbar list` }),
    remove: fn({
      posits: p("id"),
      named: {},
      transform: ([id]) => toStr`bossbar remove ${id}`
    }),
    set: fn({
      posits: p("id"),
      named: {
        color: strEnum(
          "blue",
          "green",
          "pink",
          "purple",
          "red",
          "white",
          "yellow"
        ),
        max: "num",
        name: "string",
        players: "selector",
        style: strEnum(
          "progress",
          "notched_6",
          "notched_10",
          "notched_12",
          "notched_20"
        ),
        value: "num",
        visible: "bool"
      },
      transform: ([id], props) =>
        Object.entries(props)
          .map(([prop, value]: [string, any]) => {
            let val = "";
            switch (prop) {
              case "color":
              case "max":
              case "style":
              case "value":
              case "visible":
                val = String(value.content);
                break;
              case "name":
              case "players":
                val = toStr(value);
                break;
            }
            return toStr`bossbar set ${id} ${prop} ${val}`;
          })
          .join("\n")
    })
  })
});

export default stdlib;
