const postcss = require("./postcss");

module.exports = [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
            { loader: "babel" },
           // { loader: "eslint" }
        ]
    },
    postcss
];