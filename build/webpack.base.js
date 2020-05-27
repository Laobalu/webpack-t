const path = require('path')
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { multipleEntry, htmlPlugins, creatIndexPage } = require('./utils');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const rootPath = process.cwd();
const isDev = process.env.NODE_ENV === 'development';
creatIndexPage()

const config = {
  context: rootPath,
  entry: multipleEntry(),
  output: {
    // filename: 'js/[name]_[hash:8].js',
    filename: `res/js/[name]${isDev ? '_[hash:8]' : ''}.js`,
    path: path.resolve(rootPath, 'dist'), // 打包后输出的目录，绝对路径
    publicPath: isDev ? '/' : 'http://static-game.icafe8.com/', // 指定项目中引用css、js、img等资源时的一个基础路径
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader?exportAsEs6Default',
          options: {
            // minimize: false
          }
        }
      },
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
          options: {
            pretty: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              // 只在开发模式中启用热更新
              hmr: process.env.NODE_ENV === 'development',
              // 如果模块热更新不起作用，重新加载全部样式
              reloadAll: true,
            },
          },
          'css-loader'     //将 CSS 转化成 CommonJS 模块
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              // 只在开发模式中启用热更新
              hmr: process.env.NODE_ENV === 'development',
              // 如果模块热更新不起作用，重新加载全部样式
              reloadAll: true,
            },
          },
          { loader: 'css-loader', options: { importLoaders: 2 } },
          'postcss-loader',
          'less-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'res/images/[name].[hash:8].[ext]',
            // outputPath: '/res/images/'
          }
        }]
      },
      {
        test: /\.(ttf|eot|svg|woff(2))(\?[a-z0-9]+)?$/,
        loader: 'file-loader',
        options: {
          name: 'res/images/[name].[hash:8].[ext]',
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    ...htmlPlugins(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      _: 'lodash'
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      include: /src/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'res/style/[name].css',
      chunkFilename: 'res/style/lib.css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: __dirname + '/../src/assets', to: __dirname + '/../dist/assets' },
    //   ],
    // }),
    new ProgressBarPlugin({ format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)', clear: false }),
    
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, `../src`),
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'lib',
          minChunks: 3
        },
        default: {
          minChunks: 3,
          priority: -20,
          reuseExistingChunk: true,
          name: 'common'
        }
      }
    }
  },
  stats: {
    children: false
  }
}

module.exports = config