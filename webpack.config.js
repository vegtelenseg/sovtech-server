const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/index.ts",
  mode: "production",
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, "src")],
        use: "ts-loader",
      },
    ],
  },
  externals: [nodeExternals()],
  // plugins: [
  //   // ... here are any other existing plugins that we already have
  //   new webpack.NormalModuleReplacementPlugin(/type-graphql$/, (resource) => {
  //     resource.request = resource.request.replace(
  //       /type-graphql/,
  //       "type-graphql/dist/browser-shim.js"
  //     );
  //   }),
  // ],
  resolve: {
    extensions: [".ts"],
    fallback: { path: "path" },
  },
  devtool: "eval-source-map",
  output: {
    publicPath: "public",
    filename: "server.js",
    path: path.resolve(__dirname, "build"),
  },
};
