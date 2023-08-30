# ESM 静态分析

利用 `Webpack` 验证 `ES Module` 整体加载模块时，是否存在静态分析优化～

<img src="https://cdn.jsdelivr.net/gh/zhixiangyao/CDN/images/icon/webpack.jpeg" style="margin: 10px; border-radius: 5px;" />

## [Tree Shaking](https://webpack.docschina.org/guides/tree-shaking/#mark-the-file-as-side-effect-free)

`tree shaking` 是一个术语，通常用于描述移除 `JavaScript` 上下文中的未引用代码(`dead-code`)。它依赖于 `ES2015` 模块语法的 **静态结构** 特性，例如 `import` 和 `export`。这个术语和概念实际上是由 `ES2015` 模块打包工具 `rollup` 普及起来的。

```js
import * as circle from './circle'

console.log('圆面积：' + circle.area(4))
console.log('圆周长：' + circle.circumference(14))
```

最近重温**阮一峰**大神的[ECMAScript 6 入门](https://es6.ruanyifeng.com/)教程的时候，看到了这句话[注意，模块整体加载所在的那个对象（上例是 circle），应该是可以静态分析的，所以不允许运行时改变](https://es6.ruanyifeng.com/#docs/module#%E6%A8%A1%E5%9D%97%E7%9A%84%E6%95%B4%E4%BD%93%E5%8A%A0%E8%BD%BD)

这次我们就来做个实验

## 打包前

### 文件:

::: code-group

```js [./index.js]
import * as test from './test'

console.info(test.app)
```

```js [./test.js]
export function app() {
  return 'app'
}
export function boo() {
  return 'boo'
}
export function car() {
  return 'car'
}
```

:::

### 配置:

这边要开启一下 `usedExports` 毕竟要 `Tree Shaking` 嘛

::: code-group

```diff [./webpack.prod.conf.js]
const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base.conf')

module.exports = merge(base, {
  mode: 'development', // 开发环境不会压缩代码
+  optimization: {
+    usedExports: true,
+  },
})
```

```js [./webpack.base.conf.js]
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: resolve('./'),
  entry: {
    home: resolve('./index.js'),
  },
  output: {
    path: resolve('build'),
    filename: 'index.js',
    chunkFilename: '[name].bundle.js',
  },
  plugins: [new CleanWebpackPlugin()],
}
```

:::

## 打包后

```js
// 省略 IIFE 只写参数
const module = {
  './index.js':
    /*! no exports provided */
    /*! all exports used */
    function (module, __webpack_exports__, __webpack_require__) {
      'use strict'

      __webpack_require__.r(__webpack_exports__)
      /* harmony import */
      var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test */ './test.js')
      console.info(_test__WEBPACK_IMPORTED_MODULE_0__[/* app */ 'a'])
      //# sourceURL=webpack:///./index.js?
    },
  './test.js':
    /*! exports provided: app, boo, car */
    /*! exports used: app */
    function (module, __webpack_exports__, __webpack_require__) {
      'use strict'

      /* harmony export (binding) */
      __webpack_require__.d(__webpack_exports__, 'a', function () {
        return app
      })
      /* unused harmony export boo */
      /* unused harmony export car */
      function app() {
        return 'app'
      }
      function boo() {
        return 'boo'
      }
      function car() {
        return 'car'
      }
      //# sourceURL=webpack:///./test.js?
    },
})
```

注意上面的 `unused harmony export` 注释，观察下代码，发现了没有，虽然 `car`、`boo` 模块没用使用，但它仍然被包含在 `bundle` 中。

- 这里只要使用 `mode` 为 `"production"` 的配置项以启用更多优化项，包括压缩代码与 `tree shaking`。

```diff
const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base.conf')

module.exports = merge(base, {
- mode: 'development', // 开发环境不会压缩代码
+ mode: 'production',
-  optimization: {
-    usedExports: true,
-  },
})
```

## 参考

[Webpack 中文文档](https://webpack.docschina.org/)

[Webpack 英文文档](https://webpack.js.org/)
