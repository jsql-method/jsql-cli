const path = require('path');

module.exports = {
    mode: 'none',
    target: "node",
    entry: './dist/cli.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'cli.js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }

};