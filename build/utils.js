
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootPath = process.cwd();


// 新建导航页面
const creatIndexPage = () => {

  const pages = glob.sync(`src/pug/*.pug`);
  const indexPath = path.resolve(rootPath, 'src', 'pug', 'index.pug')
  let data = '';
  if (process.env.NODE_ENV == 'production') {

    if (fs.existsSync(indexPath)) {
      fs.unlinkSync(indexPath);
    }
    return;
  }

  data += 'html\n body\n';
  pages.forEach(item => {
    const fileName = item.replace(/(.*\/)|(\.pug)|(index.pug)/g, '');
    if (!!fileName) {
      data += `  br\n`
      data += `  a(href="./${fileName}.html") ${fileName}\n`;
    }
  });
  fs.writeFileSync(indexPath, data, 'utf8');
}

const multipleEntry = () => {

  const files = glob.sync(`./src/js/pages/*.js`)
  const entrys = {};
  files.forEach(dir => {
    const filename = dir.replace(/(.*\/)|(\.js)/g, '');
    entrys[filename] = [
      path.resolve(__dirname, '../', dir), 
      // path.resolve(__dirname, '../src/assets/modal.js')
    ];
  })
  return entrys;
}

const htmlPlugins = () => {

  const files = glob.sync(`./src/pug/*.pug`);
  return files.map(path => {
    const filename = path.replace(/(.*pug\/)|(\.pug)/g, '');
    const config = {
      filename: filename + '.html',
      template: path,
      inject: 'body',
      chunks: [filename],    //只允许加载当前的chunk
      chunksSortMode: 'auto',  //加载chunk的顺序
      excludeChunks: [],
      minify: false
    }
    return new HtmlWebpackPlugin(config)
  })
}

module.exports = {
  creatIndexPage,
  multipleEntry,
  htmlPlugins
}