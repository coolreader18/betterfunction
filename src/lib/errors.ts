import { TransformContext } from "./utils";

export enum ErrType {
  LIBRARY
}

export class Err extends Error {
  constructor(type: ErrType, msg: string = ErrType[type]) {
    switch (type) {
      case ErrType.LIBRARY:
        msg = `Error: ${msg}. This is an issue with the library, not the btfn code.`;
    }
    super(msg);
    this.type = type;
  }
  type: ErrType;
}
