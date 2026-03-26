# 使用 generator 函数模拟 await

- [`generator`](https://zh.javascript.info/generators) 函数
- [`Promise`](https://zh.javascript.info/promise-basics) 函数

::: code-group

```js [Implement]
// 模拟请求数据
function asyncToGenerator(generatorFunc) {
  return function () {
    const gen = generatorFunc()

    return new Promise((resolve, reject) => {
      // 内部定义一个 step 函数 用来一步一步的跨过 yield 的阻碍
      // key 有 next 和 throw 两种取值，分别对应了 gen 的 next 和 throw 方法
      // arg 参数则是用来把 promise resolve 出来的值交给下一个 yield
      function step(key, arg) {
        let generatorResult

        try {
          generatorResult = gen[key](arg)
        } catch (error) {
          return reject(error)
        }

        const { value, done } = generatorResult
        if (done) {
          return resolve(value)
        } else {
          return Promise.resolve(value).then(
            (val) => step('next', val),
            (err) => step('throw', err),
          )
        }
      }

      step('next')
    })
  }
}
```

```js [Test]
const getData = () => new Promise((resolve) => setTimeout(() => resolve('data'), 500))

// 模拟 async await
const test = asyncToGenerator(function* testG() {
  const data = yield getData()
  console.log('data: ', data)
  const data2 = yield getData()
  console.log('data2: ', data2)
  return 'success'
})

test().then((res) => console.log(res))
```

:::

运行结果

```
data: data
data2: data
success
```
