# 限制并发请求数

一般来说，我们不会刻意去控制请求的并发。只有在一些场景下可能会用到，比如，收集用户的批量操作（每个操作对应一次请求），待用户操作完成后一次性发出。另外，为了减小服务器的压力，我们还会 **限制并发数** 。

> [参考](https://juejin.cn/post/6993296099331014669#heading-8)

::: code-group

```ts [Implement]
type RequestFn = () => Promise<string | void>
type CreateRequest = (delay: number) => RequestFn

const concurrentRequest = (requestFns: RequestFn[], limit: number): void => {
  // 递归函数
  function recursion(requestFn: RequestFn | undefined): void {
    requestFn?.().finally(() => {
      // 每个气球执行完，继续执行下一个请求
      if (_requestFns.length > 0) recursion(_requestFns.pop())
    })
  }

  const _requestFns = [...requestFns]

  // 限制最大并发量
  for (let i = 0; i < limit && _requestFns.length > 0; i++) {
    recursion(_requestFns.pop())
  }
}
```

```ts [Test]
// 模拟一个异步请求函数
const createRequest: CreateRequest = (delay) => {
  return async () => {
    const res = await new Promise((resolve) => {
      setTimeout(() => resolve('done'), delay)
    })
    console.log(res)
  }
}

const requestFns: RequestFn[] = []

for (let i = 0; i < 10; i++) {
  requestFns.push(createRequest(1000))
}

concurrentRequest(requestFns, 3)
```

:::

运行结果

```
done
done
done

done
done
done

done
done
done

done
```
