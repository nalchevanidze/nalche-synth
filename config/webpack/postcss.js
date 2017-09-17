const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
            {
                loader: "css",
                // options: {
                //     modules: false,
                //     camelCase: false,
                //     localIdentName: "[path][name]__[local]--[hash:base64:5]"
                //}
            },
            "sass"
        ]
    })
};