const path = require('path');
const merge = require('webpack-merge');
const apiMocker = require('mocker-api');
const baseConfig = require('./webpack.base.js');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  // devtool: 'cheap-module-eval-source-map',
  devServer: {
    overlay: true,
    host: '0.0.0.0', // 0.0.0.0 同一网络环境下，可通过域名访问
    port: 3000,
    open: false, // 自动打开浏览器
    publicPath: '/', // 浏览器中，打包后的文件可以在此目录下呗访问
    contentBase: path.join(__dirname, '../dist'),
    // stats: 'errors-only'
    before: function(app) {
      if (process.env.mock) {
        apiMocker(app, path.resolve(__dirname, `../mock/index.js`))
      }
    },
    // 若匹配到 /api，host则换成target目标
    proxy: {
      '/api': {
        target: 'https://g.swjoy.com',
        changeOrigin: true
      }
    } 
  }
}

module.exports = merge(baseConfig, devConfig)
