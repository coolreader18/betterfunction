import * as moo from "moo";

const keywords: string[] = [
  "namespace",
  "func",
  "include",
  "folder",
  "tick",
  "load",
  "true",
  "false"
];

export default moo.compile({
  ident: {
    match: /[A-Za-z_][\w]*/,
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
  ls: "[",
  rs: "]",
  comma: ",",
  semi: ";",
  colon: ":",
  eq: "=",
  not: "!",
  range: "..",
  cond: "?",
  rel: "~",
  ray: "^",
  slash: "/",
  hash: "#",
  cmd: "&",
  cmt: { match: /\/\/.*/, lineBreaks: false },
  string: /"[^"\\]*(?:\\.[^"\\]*)*"/,
  nl: { match: /\r?\n/, lineBreaks: true },
  sel: /@(?:a|e|p|r|s)/,
  num: /\d*\.\d+|\d+/
});
