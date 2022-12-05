# 取消重复请求

## 背景

当用户频繁点击一个搜索 _Button_ 时，会在短时间内发出大量的搜索请求，给服务器造成一定的压力，同时也会因请求响应的先后次序不同而导致渲染的数据与预期不符。这里，我们可以使用防抖来减小服务器压力，但是却没法很好地解决后面的问题。

> [参考](https://juejin.cn/post/6993296099331014669#heading-4)

## 实现

```ts
class CancelablePromise {
  pendingPromise: Promise<unknown> | null = null
  reject: ((reason?: any) => void) | null = null

  // 包装一个请求并取消重复请求
  request(requestFn: () => Promise<string>): Promise<unknown> {
    if (this.pendingPromise) this.cancel('取消重复请求')

    const _promise = new Promise((resolve, reject) => (this.reject = reject))
    this.pendingPromise = Promise.race([requestFn(), _promise])
    return this.pendingPromise
  }

  // 取消当前请求
  cancel(reason: string): void {
    this.reject?.(new Error(reason))
    this.pendingPromise = null
  }
}
```

## 测试用例

```ts
// 模拟一个异步请求函数
const createRequest = (delay: number): (() => Promise<string>) => {
  return () => new Promise((resolve) => setTimeout(() => resolve('done'), delay))
}

const cancelPromise = new CancelablePromise()

// 前四个请求将被自动取消
for (let i = 0; i < 5; i++) {
  ;(async () => {
    try {
      const res = await cancelPromise.request(createRequest(1000))
      console.log(res) // 最后一个 done
    } catch (error) {
      console.error(error) // 前四个 error: 取消重复请求
    }
  })()
}

// 设置一个定时器等3s，让前面的请求都处理完再继续测试
setTimeout(() => {
  ;(async () => {
    try {
      // 手动取消最后一个请求
      const res = await cancelPromise.request(createRequest(1000))
      console.log(res)
    } catch (error) {
      console.error(error) // error:手动取消
    }
  })()

  cancelPromise.cancel('手动取消')
}, 3000)

// 设置一个定时器等4s，让前面的请求都处理完再继续测试
setTimeout(async () => {
  try {
    const res = await cancelPromise.request(createRequest(1000))
    console.log(res) // done
  } catch (error) {
    console.error(error)
  }
}, 4000)
```
