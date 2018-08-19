import moo from "moo";

const keywords: string[] = [
  "namespace",
  "function",
  "include",
  "folder",
  "tick",
  "load"
];

export const mainLexer = moo.compile({
  ident: {
    match: /[\w_]+/,
    keywords: keywords
      .map(kw => [`kw_${kw}`, kw])
      .reduce((obj, [key, val]) => ((obj[key] = val), obj), {} as {
        [kw: string]: string;
      })
  },
  childOp: "::",
  __: { match: /\s+/, lineBreaks: true },
  lp: "(",
  rp: ")",
  lb: "{",
  rb: "}",
  comma: ",",
  cmt: { match: /(?:#|\/\/).*/, lineBreaks: false },
  semi: ";",
  colon: ":",
  string: /"[^"\\]*(?:\\.[^"\\]*)*"/,
  nl: { match: /\r?\n/, lineBreaks: true }
});
