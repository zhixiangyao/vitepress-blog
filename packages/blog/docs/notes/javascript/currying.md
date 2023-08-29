# 函数柯里化

`JS` 实现一个 `add` 加法函数柯里化

- 被柯里化的函数不能使用箭头函数

```js
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

// 这里不能使用箭头函数，因为箭头函数没有 this 和 arguments，无法拿到 params 的 length
function sum(a, b, c) {
  return a + b + c
}

let curriedSum = curry(sum)

console.log(curriedSum(1, 2, 3)) // 6，仍然可以被正常调用
console.log(curriedSum(1)(2, 3)) // 6，对第一个参数的柯里化
console.log(curriedSum(1)(2)(3)) // 6，全柯里化
```
