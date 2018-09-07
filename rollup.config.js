import compile from "nearley/lib/compile";
import generate from "nearley/lib/generate";
import nearley from "nearley/lib/nearley";
import lint from "nearley/lib/lint";
import rawGrammar from "nearley/lib/nearley-language-bootstrapped";
import path from "path";
import rollup from "rollup";
import typescript from "rollup-plugin-typescript2";
const builtinModules = new Set(require("module").builtinModules);

const nearleyGrammar = nearley.Grammar.fromCompiled(rawGrammar);
function nearleyPlugin() {
  /** @type rollup.Plugin */
  const plug = {
    name: "nearley",
    transform(source, id) {
      if (!id.endsWith(".ne")) return null;
      const parser = new nearley.Parser(nearleyGrammar);
      parser.feed(source);
      const stderr = Object.getOwnPropertyDescriptor(process, "stderr");
      Object.defineProperty(process, "stderr", { value: { write: () => {} } });
      const compilation = compile(parser.results[0], {
        file: id
      });
      Object.defineProperty(process, "stderr", stderr);
      lint(compilation, {
        out: {
          write: str => {
            str = str.slice(5, -1);
            this.warn(str);
          }
        }
      });
      const code = generate(compilation, path.basename(id));
      const ret = ts.transform.call(this, code, `${id}.ts`);
      return ret;
    }
  };
  return plug;
}
const ts = typescript({ useTsconfigDeclarationDir: true });

/** @type rollup.InputOptions */
const config = {
  experimentalCodeSplitting: true,
  output: {
    dir: "dist",
    format: "cjs"
  },
  input: {
    lib: "./src/lib/index.ts",
    cli: "./src/cli/index.ts",
    plugin: "./src/lib/plugin/index.ts"
  },
  plugins: [ts, nearleyPlugin()],
  external: (id, parent) => {
    try {
      return (
        builtinModules.has(id) ||
        require.resolve
          .call({ filename: parent }, id)
          .startsWith(path.resolve("node_modules"))
      );
    } catch (e) {
      return false;
    }
  }
};

export default config;

rollup;
