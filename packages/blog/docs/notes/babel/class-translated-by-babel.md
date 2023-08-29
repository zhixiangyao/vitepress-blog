# class 是如何被 babel 转译

- [Babel PlayGround](https://babeljs.io/repl#?browsers=&build=&builtIns=false&corejs=3.6&spec=false&loose=false&code_lz=MYGwhgzhAECCB2BLAtgU2gbwFDWgYgCMxoBeaARgCYBmHfAg06ay8uiAFzA8WGmAAMTKrVyduvfuWE0sdYAHt4nAE4BXYBwUqAFGAEAaaGHIBKTHVwcAFoggA6fU32XoNu4-lkTr9w8LEZAKuisoKIKj2IAoA5jp-9gGmIUoQ4ZHRcQmEBMm4AL5Y-UA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=true&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Ctypescript&prettier=true&targets=&version=7.15.8&externalPlugins=&assumptions=%7B%7D)

## ES6+ code

```js
class Anime {
  #ba = 123
  #bb = 321
  static c0 = 123
  static c1 = 123

  constructor(a0, a1) {
    this.a0 = a0
    this.a1 = a1
    this.#ba = 0
    console.log(this.#ba)
    console.log(this.#bb)
  }
}
```

<!-- more -->

## ES5 code

::: code-group

```js [Class]
var _ba = /*#__PURE__*/ new WeakMap()

var _bb = /*#__PURE__*/ new WeakMap()

var Anime = function Anime(a0, a1) {
  _classCallCheck(this, Anime)

  // #ba = 123
  _classPrivateFieldInitSpec(this, _ba, {
    writable: true,
    value: 123,
  })

  // #bb = 321
  _classPrivateFieldInitSpec(this, _bb, {
    writable: true,
    value: 321,
  })

  this.a0 = a0
  this.a1 = a1

  // this.#ba = 0
  _classPrivateFieldSet(this, _ba, 0)

  // this.#ba
  console.log(_classPrivateFieldGet(this, _ba))
  // this.#bb
  console.log(_classPrivateFieldGet(this, _bb))
}

// static c0 = 123
_defineProperty(Anime, 'c0', 123)

// static c1 = 123
_defineProperty(Anime, 'c1', 123)
```

```js [_classCallCheck & _defineProperty]
'use strict'

// class clall 检查 (new)
// class clall check
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

// define property
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }
  return obj
}
```

```js [_classApplyDescriptorGet & _classApplyDescriptorSet]
'use strict'

// class apply descriptor get
function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver)
  }
  return descriptor.value
}

// class apply descriptor set
function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value)
  } else {
    if (!descriptor.writable) {
      throw new TypeError('attempted to set read only private field')
    }
    descriptor.value = value
  }
}
```

:::

::: code-group

```js [_classPrivateFieldGet & _classPrivateFieldSet]
'use strict'

// get class private 字段
// class private field get
function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, 'get')
  return _classApplyDescriptorGet(receiver, descriptor)
}

// set class private 字段
// class private field set
function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, 'set')
  _classApplyDescriptorSet(receiver, descriptor, value)
  return value
}
```

```js [_classPrivateFieldInitSpec & _checkPrivateRedeclaration & _classExtractFieldDescriptor]
'use strict'

// class 的 private 字段初始化规范
// class private field init spec
function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap)
  privateMap.set(obj, value)
}

// 检查 class private 重新声明
// check private redeclaration
function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError('Cannot initialize the same private elements twice on an object')
  }
}

// 提取 class 的字段描述符
// class extract field descriptor
function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError('attempted to ' + action + ' private field on non-instance')
  }
  return privateMap.get(receiver)
}
```

:::
