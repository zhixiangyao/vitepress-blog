# Commonjs 模块原理

`webpack` 编译产物在浏览器中， `commonjs` 模块化的实现～

<img src="https://cdn.jsdelivr.net/gh/zhixiangyao/CDN/images/icon/webpack.jpeg" style="margin: 10px; border-radius: 5px;" />

- 本文参考[webpack 中文文档](https://webpack.docschina.org/)

- [webpack 英文文档](https://webpack.js.org/)请看这里

## 打包前

### 文件:

::: code-group

```js [./index.js]
'use strict'
const test = require('./test')

function foo() {
  return test.test()
}
```

```js [./test.js]
'use strict'
exports.test = function () {
  return 1
}
```

:::

### 配置:

::: code-group

```js [./webpack.base.conf.js]
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: resolve('./'),
  entry: {
    home: resolve('./index.js'),
  },
  output: {
    filename: 'index.js',
    path: resolve('build'),
  },
  plugins: [new CleanWebpackPlugin()],
}
```

```js [./webpack.prod.conf.js]
const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base.conf')

module.exports = merge(base, {
  mode: 'development', // 开发环境不会压缩代码
})
```

:::

## 打包后

- `webpack` 将模块作为对象（key 为模块名，value 为模块体函数）传入 `IIFE`（`immediately-invoked function expression` 立即调用函数表达式） 里

* 在立即执行函数内，首先定义了 `installedModules` 对象 ，这个对象被用来 **缓存已加载的模块**。
* 定义了 `__webpack_require__` 这个函数，用来 `hack` 模块的请求，参数为模块的 `id`。
* `__webpack_require__` 内：
  - 首先会检查是否缓存了该模块，
    - 如果有，则直接返回缓存模块的 `exports` （所以 `commonjs` 和 `es module` 的一个区别是 **输出拷贝** ，而不是 **输出引用** ）。
    - 如果没有，表示首次加载，则首先初始化模块，并将模块进行缓存。
  - 然后 `bind` 执行模块函数（`bind` 的目的是将 `module.exports` 作为模块函数 `this` 指向），将 `module`、`module.exports` 和 `__webpack_require__` 作为参数传入，
  - 执行完成后，将模块标记为已加载。
  - 返回模块 `exports` 的内容。
  - 最后执行 `__webpack_require__` 函数，请求默认的 `'./index.js'` 模块，也就是入口模块。

```js
;(function (modules) {
  // webpackBootstrap
  // 模块的缓存
  var installedModules = {}

  // 请求模块函数
  function __webpack_require__(moduleId) {
    // 检查该 module 是否缓存，如果有导出
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports
    }
    // 创建新的模块 (并且 put 到缓存里)
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    })

    // 执行模块函数
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)

    // 将模块标记为已加载
    module.l = true

    // 返回 module.exports 的内容
    return module.exports
  }

  // 暴露 modules 对象 (__webpack_modules__)
  __webpack_require__.m = modules

  // 暴露 modules 缓存
  __webpack_require__.c = installedModules

  // ····· 省略无关代码

  // 首次加载模块并返回导出
  return __webpack_require__((__webpack_require__.s = './index.js'))
})({
  './index.js'(module, exports, webpackRequire) {
    'use strict'
    const test = new webpackRequire(/*! ./test */ './test.js')
    test.test()
    //# sourceURL=webpack:///./index.js?
  },
  './test.js'(module, exports) {
    'use strict'
    exports.test = function () {
      return 1
    }
    //# sourceURL=webpack:///./test.js?
  },
})
```
