module.exports = {
    module: {
        rules: [
            {
                exclude: /node_modules/u,
                test: /\.js$/u,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
};
