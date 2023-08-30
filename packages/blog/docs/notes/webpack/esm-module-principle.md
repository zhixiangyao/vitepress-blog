# ES Module 模块原理

`webpack` 编译产物在浏览器中， `ES Module` 模块化的实现～

<img src="https://cdn.jsdelivr.net/gh/zhixiangyao/CDN/images/icon/webpack.jpeg" style="margin: 10px; border-radius: 5px;" />

- 本文参考[Webpack 中文文档](https://webpack.docschina.org/)

- [Webpack 英文文档](https://webpack.js.org/)请看这里

## ESModule 和 ESModule

### 打包前

#### 文件:

::: code-group

```js [./index.js]
'use strict'
import getData, { postData } from './test'
getData()
postData()
console.log(postData)
console.log(state)
```

```js [./test.js]
'use strict'
export default function getData() {
  return 1
}

export function postData() {
  return 1
}

export const state = {}
```

:::

#### 配置:

配置和上一篇文章 [`Commonjs`](https://yaozhixiang.top/notes/webpack/commonjs-module-principle) 里一样的

### 打包后

- `__webpack_require__` 这一块可以看上一篇文章 [Commonjs 模块原理](https://yaozhixiang.top/notes/webpack/commonjs-module-principle)

- 在第一个模块 **./index** 里执行了 `__webpack_require__.r`

```js
// 在 exports 上定义 __esModule = true，
__webpack_require__.r = function (exports) {
  // 如果支持 symbol 这个 ES2015 特性的话
  // 就设置 exports 的类型标签为 Module，exports.toString() === [Object Module]
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
  }
  Object.defineProperty(exports, '__esModule', { value: true })
}
```

- 所有引入的模块属性都会用 `Object()` 包装成对象，这是为了保证像 `Boolean`、`String`、`Number` 等基本数据类型转换成相应的类型对象

```js
const modules = {
  './index.js':
    /*! no exports provided */
    function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__)
      /* harmony import */
      var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test */ './test.js')
      //index.js
      Object(_test__WEBPACK_IMPORTED_MODULE_0__['default'])()
      Object(_test__WEBPACK_IMPORTED_MODULE_0__['postData'])()
      console.log(_test__WEBPACK_IMPORTED_MODULE_0__['postData'])
      console.log(_test__WEBPACK_IMPORTED_MODULE_0__['state'])
      //# sourceURL=webpack:///./index.js?'
    },
  // ···
}
```

- **./test.js** 里每一个导出的 **模块变量** 都会被 `__webpack_require__.d` 处理一遍

```js
// 改写 exports 上各变量的 getter 方法 以便返回模块变量
__webpack_require__.d = function (exports, name, getter) {
  if (!__webpack_require__.o(exports, name)) {
    // 不可数的
    Object.defineProperty(exports, name, { enumerable: true, get: getter })
  }
}
```

```js
function (module, __webpack_exports__, __webpack_require__) {
  // ·····
  __webpack_require__.d(__webpack_exports__, 'default', function () {
    return getData
  })
  /* harmony export (binding) */
  __webpack_require__.d(__webpack_exports__, 'postData', function () {
    return postData
  })
  // ·····
},
```

**完整代码:**

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

  // 改写 exports 上各变量的 getter 方法 以便返回模块变量
  __webpack_require__.d = function (exports, name, getter) {
    // 不可数的
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter })
    }
  }

  // 在 exports 上定义 __esModule = true，
  __webpack_require__.r = function (exports) {
    // 如果支持 symbol 这个 ES2015 特性的话，就设置 exports 的类型标签为 Module，exports.toString() === [Object Module]
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
    }
    Object.defineProperty(exports, '__esModule', { value: true })
  }

  // ····· 省略无关代码

  // Object.prototype.hasOwnProperty.call 方法，这个自己看 MDN
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property)
  }

  // __webpack_public_path__
  __webpack_require__.p = ''

  // 首次加载模块并返回导出
  return __webpack_require__((__webpack_require__.s = './index.js'))
})({
  './index.js':
    /*! no exports provided */
    function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__)
      /* harmony import */
      var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test */ './test.js')
      //index.js
      Object(_test__WEBPACK_IMPORTED_MODULE_0__['default'])()
      Object(_test__WEBPACK_IMPORTED_MODULE_0__['postData'])()
      console.log(_test__WEBPACK_IMPORTED_MODULE_0__['postData'])
      console.log(_test__WEBPACK_IMPORTED_MODULE_0__['state'])
      //# sourceURL=webpack:///./index.js?'
    },
  './test.js':
    /*! exports provided: default, postData */
    function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__)
      /* harmony export (binding) */
      __webpack_require__.d(__webpack_exports__, 'default', function () {
        return getData
      })
      /* harmony export (binding) */
      __webpack_require__.d(__webpack_exports__, 'postData', function () {
        return postData
      })
      /* harmony export (binding) */
      __webpack_require__.d(__webpack_exports__, 'state', function () {
        return state
      })
      function getData() {
        return 1
      }
      function postData() {
        return 1
      }
      const state = {}
      //# sourceURL=webpack:///./test.js?'
    },
})
```

## Commonjs 和 ESModule 混用

### webpack 打包前

#### 文件:

::: code-group

```js [./index.js]
import test from './test'

console.log(test.data)
```

```js [./test.js]
exports.data = true
```

:::

#### 配置:

配置和上一篇文章 [`Commonjs`](https://yaozhixiang.top/notes/webpack/commonjs-module-principle) 里一样的

### 打包后

- `__webpack_require__.n` 会判断 module 是否为 **ES Module** ，
  - 当 `__esModule` 为 true 的时候，说明请求的模块是 **ES Module** ，那么 `module.a` 默认返回 `module.default` 否则返回 `module`。
  - 具体实现则是通过 `__webpack_require__.d` 将具体操作绑定到属性 **a 的 getter** 方法上的。
  - 那么，当通过 **ES Module** 的方式去 `import` 一个 **Commonjs** 规范的模块时，就会把 `require` 得到的 `module` 进行一层包装，从而兼容两种情况。

```js
// getDefaultExport function for compatibility with non-harmony modules
__webpack_require__.n = function (module) {
  var getter =
    module && module.__esModule
      ? function getDefault() {
          return module['default']
        }
      : function getModuleExports() {
          return module
        }
  __webpack_require__.d(getter, 'a', getter)
  return getter
}

// 改写 exports 上各变量的 getter 方法 以便返回模块变量
__webpack_require__.d = function (exports, name, getter) {
  // 不可数的
  if (!__webpack_require__.o(exports, name)) {
    Object.defineProperty(exports, name, { enumerable: true, get: getter })
  }
}
```

**完整代码:**

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

  // 改写 exports 上各变量的 getter 方法 以便返回模块变量
  __webpack_require__.d = function (exports, name, getter) {
    // 不可数的
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter })
    }
  }

  // 在 exports 上定义 __esModule = true，
  __webpack_require__.r = function (exports) {
    // 如果支持 symbol 这个 ES2015 特性的话，就设置 exports 的类型标签为 Module，exports.toString() === [Object Module]
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
    }
    Object.defineProperty(exports, '__esModule', { value: true })
  }

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter =
      module && module.__esModule
        ? function getDefault() {
            return module['default']
          }
        : function getModuleExports() {
            return module
          }
    __webpack_require__.d(getter, 'a', getter)
    return getter
  }

  // Object.prototype.hasOwnProperty.call 方法，这个自己看 MDN
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property)
  }

  // __webpack_public_path__
  __webpack_require__.p = ''

  // 首次加载模块并返回导出
  return __webpack_require__((__webpack_require__.s = './index.js'))
})({
  './index.js':
    /*! no exports provided */
    function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__)
      /* harmony import */
      var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__('./test.js')
      /* harmony import */
      var _test__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
        _test__WEBPACK_IMPORTED_MODULE_0__,
      )
      console.log(_test__WEBPACK_IMPORTED_MODULE_0___default.a.data)

      //# sourceURL=webpack:///./index.js?'
    },
  './test.js':
    /*! exports provided: default, postData */
    function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      exports.data = true
      //# sourceURL=webpack:///./test.js?'
    },
})
```
