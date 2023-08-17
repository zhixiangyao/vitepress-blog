# 实现一个 `mini redux`

使用 `useSyncExternalStore` 赋能，用 `40` 行不到的代码实现一个 `mini redux`，[Github Link](https://github.com/zhixiangyao/vite-react-ts-starter/blob/26670dab5cea573cf8f23485460d036b5cba726d/src/utils/mini-redux.ts#L5C7-L5C7)

<iframe 
  style="border: 1px solid rgba(0, 0, 0, 0.1);border-radius:2px;width:100%;height:500px;"
  src="https://codesandbox.io/p/sandbox/fervent-banach-r8hnv9"
  allowfullscreen
>
</iframe>

## 实现

::: code-group

```js:line-numbers {7,15,19,35} [mini-redux]
import { useSyncExternalStore } from 'react'

const createMiniReduxStore = (reducer, initialState) => {
  let state = initialState
  const listeners = new Set()

  const subscribe = (listener) => {
    listeners.add(listener)

    return () => {
      listeners.delete(listener)
    }
  }

  const getSnapshot = () => {
    return state
  }

  const dispatch = (action) => {
    state = reducer(state, action)

    listeners.forEach((l) => l())

    return action
  }

  return {
    subscribe,
    getSnapshot,
    dispatch,
  }
}

const useMiniReduxStore = (store) => {
  const state = useSyncExternalStore(store.subscribe, () => store.getSnapshot())

  return state
}

export { createMiniReduxStore, useMiniReduxStore }
```

```js:line-numbers [store]
import { createMiniReduxStore, useMiniReduxStore } from '/@/utils/mini-redux'

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return { data: state.data + 1 }

    case 'MULTIPLY':
      return { data: state.data * action.value }

    default:
      return state
  }
}

const initialState = { data: 0 }

const store = createMiniReduxStore(reducer, initialState)

const useDataStore = () => {
  return useMiniReduxStore(store)
}

const useDataDispatch = () => {
  return store.dispatch
}

export { useDataStore, useDataDispatch }
```

:::
