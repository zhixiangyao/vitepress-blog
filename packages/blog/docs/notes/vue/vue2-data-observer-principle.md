# Vue2-数据观察更新原理

## 代码

```js
function obServer(target) {
  if (typeof target !== 'object' || target === null) {
    return target
  }

  // 遍历对象
  for (let key in target) {
    // 对象target  键property Key  值attributes
    defineReactive(target, key, target[key])
  }
}

function defineReactive(target, key, value) {
  obServer(value) // 如果是值是对象继续递归
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newValue !== value) {
        obServer(newValue) // 如果是新值是对象继续递归
        updateView()
        value = newValue
      }
    },
  })
}

function updateView() {
  console.log('--数据已更新--')
}
```

## 执行结果

```js
const data = { name: 'yzx' }
obServer(data)
data.name = 'xzy'
console.info(data.name)
```

```sh
--数据已更新--
xzy
```

## 总结

vue2 数据监听本质上就是使用了 ES5 的 Object.defineProperty 方法重写了 set 和 get 方法
