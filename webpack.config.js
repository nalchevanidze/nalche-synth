var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devServer: {
        contentBase : "./public",
        hot: true,
        port: 8080,
        historyApiFallback : true
    },
    entry: {
        app: ["babel-polyfill","./preview.js"]
    },
    output: {
        filename: "public/[name].js"
    },
    devtool: "source-map",
    resolveLoader: {
        moduleExtensions: ["-loader"]
    },
    module: {
        rules: [
            {
                test: /\.js$/ ,
                exclude: /node_modules/,
                loader: "babel" 
            },
            { 
                test: /\.scss$/, 
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader?sourceMap-loader!autoprefixer-loader!sass?sourceMap-loader"
                })
            }
        ]
    },
    
    resolve: { 
        extensions: [ ".js" , ".svg", ".json"]
    },
    plugins: [
        new ExtractTextPlugin("public/app.css")
    ]
};




