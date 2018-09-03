import { fn, nsp, p, strEnum, tagId, toStr, mkString } from "../plugin";

const stdlib = nsp({
  advancement: nsp({
    grant: fn({
      posits: p(
        "selector",
        strEnum("everything", "from", "only", "through", "until")
      ),
      named: { target: tagId },
      transform: ([sel, { content: criteria }], { target }) =>
        toStr`advancement grant ${sel} ${criteria} ${criteria !==
          "everything" && target}`
    }),
    revoke: fn({
      posits: p(
        "selector",
        strEnum("everything", "from", "only", "through", "until")
      ),
      named: { target: tagId },
      transform: ([sel, { content: criteria }], { target }) =>
        toStr`advancement revoke ${sel} ${criteria} ${criteria !==
          "everything" && target}`
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
  }),
  clear: fn({
    posits: p("selector"),
    named: { of: tagId, count: "num" },
    transform: ([target], { of, count }) =>
      toStr`clear ${target} ${of} ${count}`
  }),
  clone: fn({
    posits: p("pos", "pos", "pos"),
    named: {
      maskMode: strEnum("filtered", "masked", "replace"),
      filter: tagId,
      cloneMode: strEnum("force", "move", "normal")
    },
    transform: (
      [pos0, pos1, pos2],
      { maskMode = mkString("replace"), filter, cloneMode = mkString("normal") }
    ) =>
      toStr`clone ${pos0} ${pos1} ${pos2} ${
        maskMode.content
      } ${maskMode.content === "filtered" && filter} ${cloneMode.content}`
  }),
  data: nsp({
    get: nsp({
      block: fn({
        posits: p("pos"),
        named: {},
        transform: ([pos]) => toStr`data get block ${pos}`
      }),
      entity: fn({
        posits: p("selector"),
        named: {},
        transform: ([sel]) => toStr`data get entity ${sel}`
      })
    }),
    merge: nsp({
      block: fn({
        posits: p("pos", "obj"),
        named: {},
        transform: ([pos, nbt]) => toStr`data merge block ${pos} ${nbt}`
      }),
      entity: fn({
        posits: p("selector", "obj"),
        named: {},
        transform: ([sel, nbt]) => toStr`data merge entity ${sel} ${nbt}`
      })
    })
    // TODO: Add data::remove once paths are implemented
  })
});

export default stdlib;
