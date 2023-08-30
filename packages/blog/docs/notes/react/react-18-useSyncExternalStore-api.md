# [译] 了解 `React 18` 中为外部存储引入的新 Hook `useSyncExternalStore`

<!-- prettier-ignore-start -->
::: warning 
本问内容为翻译 `Chetan Gawai` 的 [`Meet the new hook useSyncExternalStore, introduced in React 18 for external stores`](https://blog.saeloun.com/2021/12/30/react-18-useSyncExternalStore-api/#external-store)
:::
<!-- prettier-ignore-end -->

在深入了解 `useSyncExternalStore` API 之前，让我们先熟悉一下术语，这对理解新 `Hook` 很有帮助。

## 并发渲染和 `startTransition` API

并发是一种通过确定任务的优先级来同时执行多个任务的机制。`Dan Abramov` 通过[电话类比](https://github.com/reactwg/react-18/discussions/46#discussioncomment-846786)轻松地解释了这一概念。

在 `startTransition` API 的帮助下，我们可以选择在呈现时保持应用的响应性。换句话说，`React` 现在可以暂停呈现。这样，浏览器就可以处理中间的事件。

有关 `startTransition` API 的更多详细信息，我们已在[上一篇文章](https://blog.saeloun.com/2021/09/09/react-18-introduces-startTransition-api/)中进行了介绍。

## 外部存储

外部存储是我们可以订阅的东西。外部存储的例子包括 `Redux` 存储、`Zustand` 存储、全局变量、模块作用域变量、`DOM` 状态等。

## 内部存储

内部存储包括 `props`、`context`、`useState` 和 `useReducer`。

## 撕裂（`Tearing`）

撕裂指的是视觉上的不一致。这意味着用户界面会为同一状态显示多个值。

在 `React 18` 之前，这个问题不会出现。但在 `React 18` 中，并发呈现使这一问题成为可能，因为 `React` 会在呈现过程中暂停。在这些暂停之间，更新会拉入与用于呈现的数据相关的更改。这会导致用户界面为相同的数据显示两个不同的值。

让我们考虑一下 [`React working groups`](https://github.com/reactwg/react-18/discussions/69) 讨论撕裂时提到的例子。

在这里，一个组件需要访问一些外部存储来获取颜色。

通过同步呈现，用户界面上呈现的颜色是一致的。

<ZoomImg src="/rendering_before_react_18.png" class="w-fill"  />

在并发渲染中，最初获取的颜色是蓝色。`React` 生成，存储更新为红色。`React` 会使用更新后的红色值继续呈现。这会导致 `UI` 不一致，也就是所谓的 "撕裂"。

<ZoomImg src="/concurrent_rendering_react_18.png" class="w-fill"  />

为了解决这个问题，[`React` 团队添加了 `useMutableSource` `Hook`](https://github.com/reactjs/rfcs/blob/main/text/0147-use-mutable-source.md)，以便安全高效地从可变外部源读取数据。但是，工作组成员报告了现有 [`API` 设计的缺陷](https://github.com/reactwg/react-18/discussions/84)，这使得库维护者很难在其实现中采用 `useMutableSource`。经过反复讨论，`useMutableSource` `Hook` 被重新设计并更名为 `useSyncExternalStore`。

## 理解 `useSyncExternalStore` `Hook`

`React 18` 中 [新提供的 `useSyncExternalStore` `Hook`](https://github.com/reactwg/react-18/discussions/86) 允许正确订阅 `store` 中的值。

[为了帮助简化迁移，`React` 提供了一个新包 `use-sync-external-store`](https://www.npmjs.com/package/use-sync-external-store)。该软件包中的 `shim`（垫片） 可与任何支持 `Hook` 的 `React` 版本配合使用。

```js:line-numbers
import {useSyncExternalStore} from 'react';
//  or
// 向后兼容的垫片
import {useSyncExternalStore} from 'use-sync-external-store/shim';

// 基本用法。getSnapshot 必须返回 缓存/模拟结果
useSyncExternalStore(
  subscribe: (callback) => Unsubscribe
  getSnapshot: () => State
) => State

// 使用内联 getSnapshot 选择特定字段
const selectedField = useSyncExternalStore(store.subscribe, () => store.getSnapshot().selectedField);
```

`useSyncExternalStore` `Hook` 有两个函数

- `subscribe` 函数用于注册回调函数。

- `getSnapshot` 用于检查所订阅的值自上次渲染以来是否发生了变化，它要么是一个不可变的值，如字符串或数字，要么是一个 缓存/记忆 对象。`Hook` 将返回不可变值。

自动支持记忆化 `getSnapshot` 结果的 `API` 版本：

```js:line-numbers
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector'

const selection = useSyncExternalStoreWithSelector(
  store.subscribe,
  store.getSnapshot,
  getServerSnapshot,
  selector,
  isEqual,
)
```

让我们看看 [`Daishi Kato`](https://twitter.com/dai_shi) 在 [`React 18 for External Store Libraries`](https://www.youtube.com/watch?t=694&v=oPfSC5bQPR8&feature=youtu.be) 讲座中讨论的示例。

::: code-group

```js:line-numbers {19,21,22,23,24} [library code]
import React, { useState, useEffect, useCallback, startTransition } from 'react'

const createStore = (initialState) => {
  let state = initialState
  const getState = () => state
  const listeners = new Set()
  const setState = (fn) => {
    state = fn(state)
    listeners.forEach((l) => l())
  }
  const subscribe = (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }
  return { getState, setState, subscribe }
}

const useStore = (store, selector) => {
  const [state, setState] = useState(() => selector(store.getState()))
  useEffect(() => {
    const callback = () => setState(selector(store.getState()))
    const unsubscribe = store.subscribe(callback)
    callback()
    return unsubscribe
  }, [store, selector])
  return state
}
```

```jsx:line-numbers [Application code]
const store = createStore({ count: 0, text: 'hello' })

const Counter = () => {
  const count = useStore(
    store,
    useCallback((state) => state.count, []),
  )
  const inc = () => {
    store.setState((prev) => ({ ...prev, count: prev.count + 1 }))
  }
  return (
    <div>
      {count} <button onClick={inc}>+1</button>
    </div>
  )
}

const TextBox = () => {
  const text = useStore(
    store,
    useCallback((state) => state.text, []),
  )
  const setText = (event) => {
    store.setState((prev) => ({ ...prev, text: event.target.value }))
  }
  return (
    <div>
      <input value={text} onChange={setText} className="full-width" />
    </div>
  )
}

const App = () => {
  return (
    <div className="container">
      <Counter />
      <Counter />
      <TextBox />
      <TextBox />
    </div>
  )
}
```

:::

<ZoomImg src="/use_sync_external_store.gif" width="326"  />

如果我们在代码的某个地方使用 `startTransition`，可能会导致撕裂。为了解决撕裂问题，我们现在可以使用 `useSyncExternalStore` `API`。

让我们修改库的 `useStore` `Hook`，使用 `useSyncExternalStore` 代替 `useEffect` 和 `useState` `Hook`。

```js:line-numbers {5,6}
import { useSyncExternalStore } from 'react';

const useStore = (store, selector) => {
  return useSyncExternalStore(
    store.subscribe,
    useCallback(() => selector(store.getState(), [store, selector]))
  )
}
```

使用新 `Hook` 后，代码看起来更简洁、可维护且安全。在外部存储中迁移到 `useSyncExternalStore` `Hook` 很容易，建议使用该 `Hook` 以避免任何潜在问题。

## 并发渲染会影响哪些库？

- 拥有 `components` 和自定义 `Hook` 的库在呈现时不会访问外部可变数据，而只会使用 `React` `props`、`state` 或 `context` 递信息，这些库不会受到影响。

- 而处理数据获取、状态管理或样式的库（`Redux`、`MobX`、`Relay`）则会受到影响。这是因为这些库在 `React` 之外存储它们的状态。有了并发呈现，这些数据存储可以在呈现过程中更新，而 `React` 对此一无所知。
