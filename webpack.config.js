const path =  require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    target: 'node',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'main.js'
    },
    module: {
    	// 配置相应的规则
        rules: [
            {
                test: /\.js[x]?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
                include: /src/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/,
                use: ['style-loader',
                    
                { loader: 'css-loader', options: { importLoaders: 1 } },
                    
                'less-loader'
            ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
        title: 'My App', 
        template: 'index.html'
    })],
    devServer: {
        port: 8080
    }
}