# 函数防抖

函数防抖，就是指触发事件后，在 `n` 秒后只能执行一次，如果在 `n` 秒内又触发了事件，则会重新计算函数的执行时间。

> 简单的说，当一个动作连续触发，只执行最后一次，去除前面的抖动操作。

```ts
interface Debounced {
  (...args: any[]): any
  cancel?: () => any
}

function debounce(func: () => any, wait = 0, immediate = false): Debounced {
  let timeout: NodeJS.Timeout = null
  let result = null

  const debounced: Debounced = function (...args) {
    if (timeout) clearTimeout(timeout)

    if (immediate) {
      const callNow = timeout === null // 如果已经执行过，不再执行

      timeout = setTimeout(() => (timeout = null), wait)

      if (callNow) result = func.apply(this, args)
    } else {
      timeout = setTimeout(() => func.apply(this, args), wait)
    }

    return result
  }

  debounced.cancel = () => {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}
```
