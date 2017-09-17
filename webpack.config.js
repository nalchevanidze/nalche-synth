const ExtractTextPlugin = require("extract-text-webpack-plugin");
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
    },
    plugins: [
        new ExtractTextPlugin("./public/app.css")
    ]
};
