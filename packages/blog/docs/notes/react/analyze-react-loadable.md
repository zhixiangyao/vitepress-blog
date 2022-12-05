# 分析 `react-loadable`

最近在学习 `react` 的路由配置，想到 `vue` 里的按需加载

```ts
// vue router.ts
import { RouteConfig } from 'vue-router'

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "Index" */ '@/views/Index'),
  },
]
```

按需加载使用了 `ES6` 的 [import()](https://es6.ruanyifeng.com/#docs/module-loader) , `import()` 返回的是一个 `Promise`

## 发现问题

看 [react-router-dom](https://reactrouter.com/web/guides/quick-start) 文档，配置项目:

```jsx
// react router.js
import React, { Suspense, lazy } from 'react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

const routes = [
  {
    component: lazy(() => import('../App')),
    routes: [
      // ...
    ],
  },
]

const router = (
  <HashRouter>
    <Suspense fallback={<div>Loading...</div>}>{renderRoutes(routes)}</Suspense>
  </HashRouter>
)

export default router
```

发现首次路由切换异步加载组件时，会有闪烁问题

## 解决问题

然后我找到了 [react-loadable](https://github.com/jamiebuilds/react-loadable) 这个库

### Install：

```bash
npm install react-loadable
# or
pnpm install react-loadable
```

### 第一步：先准备一个 `loading` 组件：

```jsx
import React from 'react'

const MyLoadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>
  } else {
    return null
  }
}
```

### 第二步：引入 react-loadable

```jsx
import Loadable from 'react-loadable'

const routes = [
  {
    component: Loadable({ loader: () => import('../App'), loading: MyLoadingComponent }),
    routes: [
      {
        path: '/',
        exact: true,
        component: Loadable({ loader: () => import('../view/Home/index'), loading: MyLoadingComponent }),
      },
      {
        path: '/about',
        exact: true,
        component: Loadable({ loader: () => import('../view/About/index'), loading: MyLoadingComponent }),
      },
      // ...
    ],
  },
]
```

### 完整代码

```jsx
// router.js
import React from 'react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Loadable from 'react-loadable'

const MyLoadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>
  } else {
    return null
  }
}

const routes = [
  {
    component: Loadable({ loader: () => import('../App'), loading: MyLoadingComponent }),
    routes: [
      {
        path: '/',
        exact: true,
        component: Loadable({ loader: () => import('../view/Home/index'), loading: MyLoadingComponent }),
      },
      {
        path: '/about',
        exact: true,
        component: Loadable({ loader: () => import('../view/About/index'), loading: MyLoadingComponent }),
      },
      // ...
    ],
  },
]

const router = <HashRouter>{renderRoutes(routes)}</HashRouter>

export default router
```

## `react-loadable` 原理

让我们来看看 `react-loadable` 的 [first commit](https://github.com/jamiebuilds/react-loadable/commit/7dc909e8693b313478a1d34ad504de98a587389e)

看到了吗，本质就是一个 React HOC（[高阶组件](https://zh-hans.reactjs.org/docs/higher-order-components.html)）

注: `HOC` 是 `higher Order Component` 缩写

```tsx
import React from 'react'

export default function Loadable(
  loader: () => Promise<React.Component>,
  LoadingComponent: React.Component,
  ErrorComponent?: React.Component | null,
  delay?: number = 200
) {
  let prevLoadedComponent = null

  return class Loadable extends React.Component {
    state = {
      isLoading: false,
      error: null,
      Component: prevLoadedComponent,
    }

    componentWillMount() {
      if (!this.state.Component) {
        this.loadComponent()
      }
    }

    loadComponent() {
      this._timeoutId = setTimeout(() => {
        this._timeoutId = null
        this.setState({ isLoading: true })
      }, this.props.delay)

      // () => import('./xxx') 执行的返回是promise
      loader()
        .then(Component => {
          // 清除 this._timeoutId 定时器
          this.clearTimeout()
          prevLoadedComponent = Component
          // 关闭 loading
          this.setState({
            isLoading: false,
            Component,
          })
        })
        .catch(error => {
          this.clearTimeout()
          this.setState({
            isLoading: false,
            error,
          })
        })
    }

    clearTimeout() {
      if (this._timeoutId) {
        clearTimeout(this._timeoutId)
      }
    }

    render() {
      let { error, isLoading, Component } = this.state

      if (error && ErrorComponent) {
        return <ErrorComponent error={error} />
      } else if (isLoading) {
        return <LoadingComponent />
      } else if (Component) {
        return <Component {...this.props} />
      } else {
        return null
      }
    }
  }
}
```
