const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/script/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // extract style sheets into a dedicated file
          // "style-loader", //creates style nodes from JS strings (for dev purpose)
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles SASS to CSS, using node-sass by default
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "style.css",
      // chunkFilename: "id.css"
    })
  ],
  watchOptions: {
    aggregateTimeout: 500,
    ignored: 'src/script/three.js'
  }
};
