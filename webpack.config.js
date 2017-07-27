const { resolve } = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",

    context: resolve(__dirname),

    output: {
        path: __dirname,
        filename: "dist/strongline-api.js"
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        root: [resolve("./src"), "node_modules"]
    },

    stats: {
        // Colored output
        colors: true
    },

    // Create Sourcemaps for the bundle
    devtool: "source-map"
};
