const devEnvs = ['development', 'production'];
const devPlugins = [require('react-hot-loader/babel')];

const prodPlugins = []
// const prodPlugins = [ // 生产模式
//   require('@babel/plugin-transform-react-constant-elements'),
//   require('@babel/plugin-transform-react-inline-elements'),
//   require('babel-plugin-transform-react-remove-prop-types')
// ];

module.exports = api => {
  const development = api.env(devEnvs);

  return {
    presets: [
      [require('@babel/preset-env'), {
        targets: {
          electron: 'v11.2.0' // babel编译目标，electron版本
        }
      }],
      [require('@babel/preset-react'), {development, throwIfNamespace: false}] // react支持
    ],
    plugins: [
      [require('@babel/plugin-proposal-optional-chaining'), {loose: false}], // 可选链插件
      [require('@babel/plugin-proposal-decorators'), {legacy: true}], // 装饰器插件
      require('@babel/plugin-syntax-dynamic-import'), // 动态导入插件
      require('@babel/plugin-proposal-class-properties'), // 类属性插件
      ...(development ? devPlugins : prodPlugins) // 区分开发环境
    ]
  };
};
