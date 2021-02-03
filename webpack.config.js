const path =  require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base')
const {spawn}  = require('child_process')
const webpack =  require('webpack')
const {merge} = require('webpack-merge')
const port = process.env.PORT || 8080
const publicPath = `http://localhost:${port}/dist`

const hot = [
  'react-hot-loader/patch',
  `webpack-dev-server/client?http://localhost:${port}`,
  'webpack/hot/only-dev-server',
];
const entry = {
    index: hot.concat(require.resolve('./src/index.js')),
  };
module.exports = merge(baseConfig, {
    devtool: 'inline-source-map',
    mode: 'development',
    entry,
    target: 'electron-renderer',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'main.js'
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom' // 开发模式下
        }
    },
    plugins: [
        // webpack 模块热重载
        new webpack.HotModuleReplacementPlugin({
            multiStep: false
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development'
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new HtmlWebpackPlugin({
        title: 'My App', 
        template: 'index.html'
    })],
    devServer: {
        host: '0.0.0.0',
        port,
        // publicPath,
        watchOptions: {
            aggregateTimeout: 300,
            ignored: /node_modules/,
            poll: 100
        },
        before() {
            // 启动渲染进程后执行主进程打包
            console.log('start main process...');
            spawn('npm', ['run', 'dev'], { // 相当于命令行执行npm run dev-main
              shell: true,
              env: process.env,
              stdio: 'inherit'
            }).on('close', code => process.exit(code))
              .on('error', spawnError => console.error(spawnError));
          }
    }
})