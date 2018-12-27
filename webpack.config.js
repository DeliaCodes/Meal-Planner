const path = require("path");

module.exports = {
  entry: {
    client: "./src/client.js",
    api: "./src/api.js"
    // data: './src/data.js',
  },
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
