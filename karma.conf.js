// // Karma configuration

const Carma_Webpack_Config = {
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/ ,
                exclude: /node_modules/,
                loader: "babel-loader" 
            }
        ]
    },
    externals: {
        "cheerio": "window",
        "react/addons": true,
        "react/lib/ExecutionEnvironment": true,
        "react/lib/ReactContext": true
    } ,
    watch: true
};

module.exports = function (config) {
    config.set({
        basePath: "",
        frameworks: ["mocha", "chai"],
        files: ["node_modules/babel-polyfill/dist/polyfill.js" , "src/**/*.spec.js" ],
        preprocessors: {
            "src/**/*.spec.js": ["webpack"]
        },
        webpack: Carma_Webpack_Config ,
        webpackMiddleware: {
            stats: "errors-only"
        },
        webpackServer: {
            noInfo: true
        },
        reporters: ["progress"],
        port: 9876,
        colors: true,
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ["Chrome", "Firefox"],
        singleRun: false,
        concurrency: Infinity ,
        bundlerOptions: {
            ignoredModuleNames: [
                "react/addons",
                "react/lib/ReactContext",
                "react/lib/ExecutionEnvironment",
            ]
        }
    });
};
