declare namespace betterfunction {
  interface File {
    type: "file";
    statements: StatementFile[];
  }
  type StatementFile = IncludeStatement | NamespaceStatement;

  interface IncludeStatement {
    type: "includeStatement";
    path: string;
  }
  interface NamespaceStatement {
    type: "namespaceStatement";
    name: string;
    statements: StatementNamespace[];
  }
  type StatementNamespace = FunctionStatement | FolderStatement;

  interface FolderStatement {
    type: "folderStatement";
    name: string;
    statements: StatementNamespace[];
  }
  interface FunctionStatement {
    type: "functionStatement";
    name: string;
    statements: StatementFunction[];
    mctag: "tick" | "load" | null;
  }
  type StatementFunction = CallStatement;

  interface CallStatement {
    type: "callStatement";
    func: FuncIdent;
    params: CallParams;
    parens: boolean;
  }
  interface FuncIdent {
    type: "funcIdent";
    path: string[];
  }
  interface CallParams {
    type: "callParams";
    posits: Expression[];
    named: { [k: string]: Expression };
  }

  type Expression = String | Function | Selector | NbtVal | Cond | Pos;

  interface String {
    type: "string";
    content: string;
  }
  interface Function {
    type: "function";
    statements: StatementFunction[];
  }
  interface Selector {
    type: "selector";
    target: "a" | "e" | "p" | "r" | "s";
    args: { [k: string]: ValSelector };
  }
  type ValSelector = NbtVal | Optional<String>; // | IdOrTag once implemented properly
  const _s: unique symbol;
  interface Optional<T = typeof _s> {
    type: "optional";
    not: boolean;
    value: T extends typeof _s ? Expression : T;
  }
  interface Map {
    type: "map";
    data: { [k: string]: ValSelector };
  }
  type NbtVal = Obj | Num | Bool | List;
  interface Obj {
    type: "obj";
    data: { [k: string]: NbtVal };
  }
  interface Num {
    type: "num";
    content: number;
  }
  interface Bool {
    type: "bool";
    content: boolean;
  }
  interface List {
    type: "list";
    data: NbtVal[];
  }
  interface Cond {
    type: "cond";
    case: "block" | "blocks" | "entity" | "score";
  }
  // Maybe split this into RayPos/NormPos and RayCoord/NormCoord types
  interface Pos {
    type: "pos";
    rays: boolean;
    coords: [Coord, Coord, Coord];
  }
  interface Coord {
    type: "coord";
    relative: boolean;
    ray: boolean;
    coord: number;
  }
}
