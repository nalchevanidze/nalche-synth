const Loaders = require("./config/webpack/loaders");

module.exports = {
    devServer: {
        contentBase: "./public",
        hot: true,
        port: 8080,
        historyApiFallback: true
    },
    entry: {
        app: ["babel-polyfill","./preview.js"]
    },
    output: {
        filename: "[name].js"
    },
    devtool: "source-map",
    resolveLoader: {
        moduleExtensions: ["-loader"]
    },
    module: {
        rules: Loaders
    },
    resolve: {
        extensions: [".js", ".svg", ".json", ".jsx"]
    }
};
