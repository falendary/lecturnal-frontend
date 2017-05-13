module.exports = {
    entry: {
        app: "./src/index/scripts/main.ts",
        polyfill: "./src/index/scripts/polyfill.ts",
        vendor: "./src/index/scripts/vendor.ts"
    },
    output: {
        filename: "./dist/[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ["ts-loader", 'angular2-template-loader?keepUrl=true'],
                exclude: /node_modules/
            },
            /* Embed files. */
            {
                test: /\.(html|css)$/,
                loader: 'raw-loader',
                exclude: /\.async\.(html|css)$/
            },
            /* Async loading. */
            {
                test: /\.async\.(html|css)$/,
                loaders: ['file?name=[name].[hash].[ext]', 'extract']
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    devtool: 'source-map'
};
