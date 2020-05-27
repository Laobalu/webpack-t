

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