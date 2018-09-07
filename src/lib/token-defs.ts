export interface File {
  type: "file";
  statements: StatementFile[];
}
export type StatementFile = IncludeStatement | NamespaceStatement;

export interface IncludeStatement {
  type: "includeStatement";
  path: string;
}
export interface NamespaceStatement {
  type: "namespaceStatement";
  name: string;
  statements: StatementNamespace[];
}
export type StatementNamespace = FunctionStatement | FolderStatement;

export interface FolderStatement {
  type: "folderStatement";
  name: string;
  statements: StatementNamespace[];
}
export interface FunctionStatement {
  type: "functionStatement";
  name: string;
  statements: StatementFunction[];
  mctag: "tick" | "load" | null;
}
export type StatementFunction = CallStatement;

export interface CallStatement {
  type: "callStatement";
  func: FuncIdent;
  params: CallParams;
  parens: boolean;
}
export interface FuncIdent {
  type: "funcIdent";
  path: string[];
}
export interface CallParams {
  type: "callParams";
  posits: Expression[];
  named: { [k: string]: Expression };
}

export type Expression =
  | String
  | Function
  | Selector
  | NbtVal
  | Cond
  | Pos
  | Id
  | Tag;

export interface String<S extends string = string> {
  type: "string";
  content: S;
}
export interface Function {
  type: "function";
  statements: StatementFunction[];
}
export interface Selector {
  type: "selector";
  target: "a" | "e" | "p" | "r" | "s";
  args: { [k: string]: ValSelector };
}
export type ValSelector =
  | NbtVal
  | Map
  | Range
  | Optional<String | Id | Tag>
  | String
  | Id
  | Tag;
export interface Optional<T> {
  type: "optional";
  not: boolean;
  value: T;
}
export interface Map {
  type: "map";
  data: { [k: string]: ValSelector };
}
export interface Range {
  type: "range";
  start: number | null;
  end: number | null;
}
export type NbtVal = Obj | Num | Bool | List;
export interface Obj {
  type: "obj";
  data: { [k: string]: NbtVal };
}
export interface Num {
  type: "num";
  content: number;
}
export interface Bool {
  type: "bool";
  content: boolean;
}
export interface List {
  type: "list";
  data: NbtVal[];
}
export interface Cond {
  type: "cond";
  case: "block" | "blocks" | "entity" | "score";
}
// Maybe split this into RayPos/NormPos and RayCoord/NormCoord types
export interface Pos {
  type: "pos";
  rays: boolean;
  coords: [Coord, Coord, Coord];
}
export interface Coord {
  type: "coord";
  relative: boolean;
  ray: boolean;
  coord: number;
}
export interface Id {
  type: "id";
  nsp: string;
  path: string[];
}
export interface Tag {
  type: "tag";
  nsp: string;
  path: string[];
}
