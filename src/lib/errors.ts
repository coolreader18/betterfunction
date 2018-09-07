import { PluginFuncType, PluginType } from "./plugin";

interface PluginErr {
  type: "plugin";
  msg: string;
}
interface BadFuncErr {
  type: "badFunc";
  func: string[];
}
interface ArgsNumberErr {
  type: "argsNumber";
  func: string[];
  expect: number;
  actual: number;
}
interface ArgsTypeErr {
  type: "argsType";
  func: string[];
  ind: number;
  expect: PluginFuncType;
  actual: PluginType;
}
interface NamedArgsErr {
  type: "namedArgs";
  func: string[];
  key: string;
  expect: PluginFuncType;
  actual: PluginType;
}

type ErrType =
  | PluginErr
  | BadFuncErr
  | ArgsNumberErr
  | ArgsTypeErr
  | NamedArgsErr;

export class Err<T extends ErrType> extends Error {
  private static errTypeToMessage(err: ErrType): string {
    switch (err.type) {
      case "plugin":
        return `${
          err.msg
        }. This is an issue with the plugin, not the btfn code.`;

      case "badFunc":
        return `\`${err.func.join("::")}\` is not a valid function.`;

      case "argsNumber":
        return `Wrong number of positional arguments for ${err.func.join(
          "::"
        )}. Expected ${err.expect}, got ${err.actual}`;

      case "argsType":
        return `Incorrect argument ${err.ind + 1} for function ${err.func.join(
          "::"
        )}. Expected argument of type ${formatPluginFuncType(
          err.expect
        )}, got argument of type ${formatPluginFuncType(err.actual)}`;

      case "namedArgs":
        return `Incorrect parameter \`${err.key}\` for function ${err.func.join(
          "::"
        )}. Expected argument of type ${formatPluginFuncType(
          err.expect
        )}, got argument of type ${formatPluginFuncType(err.actual)}`;
    }
  }
  constructor(err: T) {
    super(Err.errTypeToMessage(err));
    this.data = err;
    this.type = err.type;
  }
  public type: T["type"];
  public data: T;
}

const formatPluginFuncType = (type: PluginFuncType): string => {
  if (typeof type === "string") return JSON.stringify(type);
  if (Array.isArray(type)) return commaSepList(type.map(formatPluginFuncType));
  switch (type.type) {
    case "string":
      return `a string with value ${commaSepList(type.options)}`;
  }
};

const commaSepList = (elems: string[], op: string = "or"): string =>
  elems.reduce((prev, cur, i, { length }) => {
    if (length === 2) return `${prev} ${op} ${cur}`;
    return `${prev},${i === length - 1 ? ` ${op}` : ""} ${cur}`;
  });
