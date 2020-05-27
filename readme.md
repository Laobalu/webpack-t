1. 使用inquirer选择编译版本
2. 清空选中版本目录，使用CleanWebpackPlugin插件，注意引用方式。
3. 编译pug，使用HtmlWebpackPlugin插件，每个htmlWebpackPlugin只能实例化一个页面，编译多页面应用时要配置多个
4. 编译less
5. 编译js

### 编译css
#### 一、基础版
1. npm安装style-loader, css-loader, less-loader, less。
2. js通过import引入less，loader链式调用style-loader, css-loader, less-loader将less打包进js。

#### 二、将less从js中分离
1. npm安装mini-css-extract-plugin
2. 在js中通过import引入需要的less文件，webpack中通过MiniCssExtractPlugin编译less文件，插入到html文件中




## 杂记
#### mode
 在package.json中，webpack --mode=development, 会将process.env.NODE_ENV设置为development，并会自动启动一些plugin。
#### alias
 alias别名在style、less、css中无效，需要添加 ~ 。 webpack会将以~符号作为前缀的路径视作依赖模块而去解析。
``` js
// pug中应用
    img.test(src=require('@/images/title-bg.png'))
// less中应用
    background: url('~@/images/app-download-icon.png');
// js中应用
    import '@/css/homePage.less';
```
#### eslint
 1. 关于eslint-loader@4.0.0报错 issue： https://github.com/webpack-contrib/eslint-loader/issues/322  暂时用3.0.4代替，并npm i -D eslint-plugin-import babel-eslint
 eslint规则文档： https://cloud.tencent.com/developer/section/1135755
2. eslint-plugin-import不支持webpack alias，本项目webpack配置都是异步导出，所以暂时在eslint里也配置不了别名，看第一条bug修复后，再看看这条能不能处理

#### mini-css-extract-plugin
在base处理了less后，再在prod环境处理less，会导致冲突报错。module里/\.less/ 不能重复处理。
``` js
// 报错信息
unknown word 1 // extracted by mini-css-extract-plugin
```