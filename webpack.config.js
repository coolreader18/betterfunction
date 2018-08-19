const path = require("path");
const nodeExternals = require("webpack-node-externals");

const config = {
  entry: {
    lib: "./src/lib/index.ts",
    cli: "./src/cli/index.ts"
  },
  target: "node",
  output: {
    filename: "[name].js",
    path: path.resolve("./dist")
  },
  mode: process.env.NODE_ENV,
  externals: [nodeExternals()],
  resolve: {
    extensions: [".js", ".ts"]
  },
  module: {
    rules: [
      {
        test: /\.ne$/,
        loader: "nearley-loader"
      },
      {
        test: /\.ts/,
        loader: "ts-loader"
      }
    ]
  }
};

module.exports = config;
