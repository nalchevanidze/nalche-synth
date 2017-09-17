const devConfig = require("./webpack.config.js");
devConfig.entry= {index: "./src/index.js"};
devConfig.output= {filename: "dist/index.js"};
module.exports = devConfig;