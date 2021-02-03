const path =  require('path')
module.exports = {
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'main.js'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
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
    devtool: 'source-map',
    plugins: [],
}