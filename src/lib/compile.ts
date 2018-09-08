import * as nearley from "nearley";
import * as path from "path";
import * as rules from "./grammar/index.ne";
import { FuncTransformContext, Plugin } from "./plugin";
import stdlib from "./stdlib";
import * as btfn from "./token-defs";
import { getEntryOut, simpleCall } from "./utils";
import {
  transformNamespace,
  transformCall,
  parseCall,
  BtfnOutputNamespace,
  BtfnOutputFolder
} from "./transform";

export const btfnLib: Plugin = { ...stdlib };

/**
 * The nearley grammar for the betterfunction language
 */
export const grammar = nearley.Grammar.fromCompiled(rules);

interface GenerateOptions {
  /** The output directory, defaults to `dirname(entry)/data` */
  out?: string;
  /**
   * The entry file, used to resolve the output directory if the compilation is
   * generated from a string and `out` isn't specified
   */
  entry?: string;
  /** An fs API compatible with `fs-extra` */
  fs?: typeof import("fs-extra");
}

export class BtfnCompilation {
  namespaces: {
    [k: string]: BtfnOutputNamespace;
  } = {};
  tags: {
    tick: string[][];
    load: string[][];
  } = { tick: [], load: [] };
  stack: string[] = [];
  entry?: string;
  /**
   * Write the compilations to a datapack directory.
   * @param opts - Options for writing the compilation.
   */
  write({
    entry: file = this.entry,
    out,
    fs = require("fs-extra")
  }: GenerateOptions = {}) {
    if (typeof file === "undefined" && typeof out === "undefined")
      throw new Error(
        "Compilation generated from string and neither entry file nor output dir specified"
      );
    const outDir =
      typeof out !== "undefined" ? out : getEntryOut(file!, out).outDir;

    fs.mkdirpSync(outDir);

    for (const [tag, val] of Object.entries(this.tags)) {
      if (!val.length) continue;
      const tagsPath = path.join(outDir, "minecraft/tags/functions");
      fs.mkdirpSync(tagsPath);
      fs.writeJSONSync(path.join(tagsPath, `${tag}.json`), {
        values: val.map(([nsp, ...funcPath]) => `${nsp}:${funcPath.join("/")}`)
      });
    }

    for (const [name, nsp] of Object.entries(this.namespaces)) {
      const funcsDir = path.join(outDir, name, "functions");

      this.writeChildren(nsp.children, funcsDir, fs);

      const genDir = path.join(funcsDir, "btfngen");
      nsp.generated.forEach((func, i) => {
        fs.writeFileSync(path.join(genDir, `${func}${i + 1}.mcfunction`), func);
      });
    }
  }
  private writeChildren(
    children: BtfnOutputFolder["children"],
    dir: string,
    fs: typeof import("fs-extra")
  ) {
    fs.mkdirpSync(dir);
    for (const [name, child] of Object.entries(children)) {
      switch (child.type) {
        case "folder":
          this.writeChildren(child.children, path.join(dir, name), fs);
          break;
        case "function":
          fs.writeFileSync(
            path.join(dir, `${name}.mcfunction`),
            child.outputText
          );
          break;
      }
    }
  }
}

export class TransformContext {
  constructor(private comp: BtfnCompilation) {}
  stack: string[] = [];
  lib: Plugin = btfnLib;
  addNamespace(name: string) {
    this.comp.namespaces[name] = {
      type: "namespace",
      children: {},
      generated: []
    };
  }
  addFolder(name: string) {
    this.curFolder[name] = {
      type: "folder",
      children: {}
    };
  }
  addTagged(tag: "tick" | "load", funcName: string) {
    this.comp.tags[tag].push([...this.stack, funcName]);
  }
  get curNsp() {
    return this.comp.namespaces[this.stack[0]];
  }
  get curFolder() {
    return this.stack
      .slice(1)
      .reduce(
        (curFolder, cur) => (curFolder[cur] as BtfnOutputFolder).children,
        this.curNsp.children
      );
  }
  genFunc(content: string) {
    const id = this.curNsp.generated.push(content);
    return `${this.stack[0]}:btfngen/func${id}`;
  }
  get funcCtx(): FuncTransformContext {
    return {
      genFunc: content =>
        this.genFunc(
          typeof content === "object"
            ? content.statements
                .map(call => {
                  this.stack.push("inline_function");
                  const out = transformCall(call, this);
                  this.stack.pop();
                  return out;
                })
                .join("\n")
            : content
        ),
      transformCall: callInput => {
        let call: btfn.Call;
        if (typeof callInput === "string") call = parseCall(callInput);
        else if ("type" in callInput) call = callInput;
        else {
          call = simpleCall(callInput);
        }
        return transformCall(call, this);
      }
    };
  }
}

interface TransformOptions {
  entryFilename?: string;
}

/**
 * Transform betterfunction source into an output format
 * @param content - Btfn code to transform
 * @param opts - Options for transforming
 */
export const transform = (
  content: string,
  { entryFilename }: TransformOptions = {}
): BtfnCompilation => {
  const parser = new nearley.Parser(grammar);
  parser.feed(content);
  // IO boundary, the line below is assuming that everything coming from the
  // parser and postprocessors is correct and aligns the definitions in token-defs
  const parsed: btfn.File = parser.results[0];
  const out = new BtfnCompilation();
  out.entry = entryFilename;
  const ctx = new TransformContext(out);
  for (const stmnt of parsed.statements) {
    switch (stmnt.type) {
      case "namespaceStatement":
        transformNamespace(stmnt, ctx);
        break;
    }
  }
  return out;
};

interface TransformFileOptions extends TransformOptions {
  entryFilename?: undefined;
  fs?: typeof import("fs-extra");
}

export const transformFile = (
  filename: string,
  { fs = require("fs-extra"), ...transOpts }: TransformFileOptions = {}
) =>
  transform(fs.readFileSync(filename, "utf8"), {
    ...transOpts,
    entryFilename: filename
  });
