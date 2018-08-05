const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        app: "./src/index.js"
    },

    output: {
        path: __dirname + "/build",
        filename: "[name].js",
        publicPath: "/"
    },

    watch: true,

    plugins: [
        new HtmlWebpackPlugin({template: "index.html"})
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "babel-preset-react",
                            "babel-preset-env",
                            "babel-preset-stage-2",
                            "babel-preset-stage-0"
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    "file-loader"
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    "svg-url-loader"
                ]
            },
        ]
    },

    devServer: {
        historyApiFallback: true,
        contentBase: __dirname + "/build",
        port: 8080,
        open: true
    }
};
