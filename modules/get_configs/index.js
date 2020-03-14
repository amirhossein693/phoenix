let config = null;
const middlewares = [];
const webpack = [];
const promises = [];
try {
  config = require("../../code/phoenix.config.js");
} catch (e) {
  console.log(e);
}
if (config && config.default && config.default.plugins) {
  config.default.plugins.map(plugin => {
    middlewares.push("middleware" in plugin && plugin.middleware);
    webpack.push("webpack" in plugin && plugin.webpack);
    promises.push("promise" in plugin && plugin.promise);
  });
}

export { webpack, middlewares, promises };
