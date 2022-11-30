# `call` `apply` `bind` 模拟

## `call` 的实现

```js
Function.prototype.myCall = function (...args) {
  if (typeof this !== 'function' || Object.prototype.toString.call(this) !== '[object Function]') {
    throw new TypeError('Must call with function!')
  }
  const realThis = args.shift() || globalThis
  const realArgs = args
  const symbolFn = Symbol('fn')
  realThis[symbolFn] = this
  const response = realThis[symbolFn](...realArgs)
  delete realThis[symbolFn]
  return response
}
```

## `apply` 的实现

```js
Function.prototype.myApply = function (...args) {
  if (typeof this !== 'function' || Object.prototype.toString.call(this) !== '[object Function]') {
    throw new TypeError('Must call with function!')
  }
  const realThis = args[0] || globalThis
  const realArgs = args[1]
  const symbolFn = Symbol('fn')
  realThis[symbolFn] = this
  const response = realThis[symbolFn](...realArgs)
  delete realThis[symbolFn]
  return response
}
```

## `bind` 的实现

```js
Function.prototype.myBind = function (...args) {
  if (typeof this !== 'function' || Object.prototype.toString.call(this) !== '[object Function]') {
    throw new TypeError('Must call with function!')
  }
  const _fn = this
  const realThis = args.shift() || globalThis
  const beforeArgs = args
  return function (...afterArgs) {
    return _fn.myApply(realThis, [...beforeArgs, ...afterArgs])
  }
}
```
