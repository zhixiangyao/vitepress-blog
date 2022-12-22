# Vue2-生命周期源码解析

## 源码解析

### 为什么 Vue 生命周期不能使用箭头 ➡️ 函数？

让我们一起来看看源码吧。

位置：[src/core/instance/lifecycle.js 第 336 行](https://github.com/vuejs/vue/blob/dev/src/core/instance/lifecycle.js#L336)

```js
/* @flow */
// 回调钩子
export function callHook (vm: Component, hook: string) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget()
  const handlers = vm.$options[hook]
  const info = `${hook} hook`
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info)
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook)
  }
  popTarget()
}
```

位置：[src/core/util/error.js 第 36 行](https://github.com/vuejs/vue/blob/dev/src/core/util/error.js#L36)

```js
/* @flow */
// 调用错误处理
export function invokeWithErrorHandling (
  handler: Function,
  context: any,
  args: null | any[],
  vm: any,
  info: string
) {
  let res
  try {
    // 这里 通过apply和call绑定this
    res = args ? handler.apply(context, args) : handler.call(context)
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(e => handleError(e, vm, info + ` (Promise/async)`))
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true
    }
  } catch (e) {
    handleError(e, vm, info)
  }
  return res
}
```

- 第一段中的 **callHook** 调用了第二段的 **invokeWithErrorHandling**方法
- 在**invokeWithErrorHandling**方法中，使用了 apply 和 call 改变了生命周期内 this 指向
- 而在箭头函数中 this 指向是无法改变的
- 所以这我们在写 vue 代码时，生命周期不能使用 ➡️ 箭头函数

### 一、beforeCreate 和 created

位置：[src/core/instance/init.js 第 15 行](https://github.com/vuejs/vue/blob/dev/src/core/instance/init.js#L15)

```js
/* @flow */

// 初始化混入
export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    // ...

    // 一个标志，以避免被观察到
    vm._isVue = true
    // 合并选项
    if (options && options._isComponent) {
      // 优化内部组件实例化
      // 因为动态选项合并非常慢，而且没有
      // 内部组件选项需要特殊处理。
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    //...

    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm) //               事件初始化
    initRender(vm) //               渲染函数初始化
    callHook(vm, 'beforeCreate') // 调用 beforeCreate 钩子
    initInjections(vm) //           Inject 初始化
    initState(vm) //                props、methods、data、watch、computed等数据初始化
    initProvide(vm) //              provided 初始化
    callHook(vm, 'created') //      调用 created 钩子

    // ...

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
```

位置：[src/core/instance/state.js 第 48 行](https://github.com/vuejs/vue/blob/dev/src/core/instance/state.js#L48)

```js
/* @flow */

// 初始化状态
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```

- 第一段 initMixin 中的 `beforeCreate` 钩子调用是在 initState 之前的
- 而第二段代码的 **initState**方法是对 **props、data、computed、watch、methods** 等属性做初始化处理
- 所以 `beforeCreate` 函数内我们无法对 **props、data、computed、watch、methods** 上的数据的访问
- 在 `created` 中才可以，因为 initState 方法已经执行了

### 二、beforeMount 和 mounted

位置：[src/core/instance/lifecycle.js 第 141 行](https://github.com/vuejs/vue/blob/dev/src/core/instance/lifecycle.js#L141)

```js
/* @flow */

// mountComponent 核心就是先实例化一个渲染Watcher
// 在它的回调函数中会调用 updateComponent 方法
// 两个核心方法 vm._render(生成虚拟Dom) 和 vm._update(映射到真实Dom)
export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el
  if (!vm.$options.render) {
    // 如果没有渲染函数，创建一个空的VNode节点
    vm.$options.render = createEmptyVNode
    // 如果是开发环境
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        )
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        )
      }
    }
  }
  // 调用 beforeMount 钩子
  callHook(vm, 'beforeMount')

  let updateComponent
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = () => {
      const name = vm._name
      const id = vm._uid
      const startTag = `vue-perf-start:${id}`
      const endTag = `vue-perf-end:${id}`

      mark(startTag)
      const vnode = vm._render()
      mark(endTag)
      measure(`vue ${name} render`, startTag, endTag)

      mark(startTag)
      vm._update(vnode, hydrating)
      mark(endTag)
      measure(`vue ${name} patch`, startTag, endTag)
    }
  } else {
    // 将虚拟 Dom 映射到真实 Dom 的函数。
    // vm._update 之前会先调用 vm._render() 函数渲染 VNode
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  } /* options */, true /* isRenderWatcher */)
  hydrating = false

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true
    // 调用 mounted 钩子
    callHook(vm, 'mounted')
  }
  return vm
}
```

- 执行 vm.\_render() 函数渲染 VNode 之前，执行了 `beforeMount` 钩子函数
- 在执行完 vm.\_update() 把 VNode patch 到真实 Dom 后，执行 `mouted` 钩子

### 三、beforeUpdate 和 updated

位置：[src/core/instance/lifecycle.js 第 197 行](https://github.com/vuejs/vue/blob/dev/src/core/instance/lifecycle.js#L197)

```js
/* @flow */

export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  // ...

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before () {
      // 断是否 mouted 完成 并且没有被 destroyed
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  } /* options */, true /* isRenderWatcher */)
  hydrating = false

  // ...
}
```

位置：[src/core/observer/watcher.js 第 26 行](https://github.com/vuejs/vue/blob/dev/src/core/observer/watcher.js#L26)

```js
/* @flow */

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
export default class Watcher {
  // ...

  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    // 在它的构造函数里会判断 isRenderWatcher，
    if (isRenderWatcher) {
      // 接着把当前 watcher 的实例赋值给 vm._watcher
      vm._watcher = this
    }
    vm._watchers.push(this)

    // ...
  }

  // ...
}
```

位置：[src/core/observer/scheduler.js 第 130 行](https://github.com/vuejs/vue/blob/dev/src/core/observer/scheduler.js#L130)

```js
/* @flow */

function callUpdatedHooks (queue) {
  let i = queue.length
  while (i--) {
    const watcher = queue[i]
    const vm = watcher.vm
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated')
    }
  }
}
```

- 第一段代码中的 `beforeUpdate` 是在 `beforeMount` 和 `mounted` 钩子中间出现的，是在 **Watcher** 监听构造函数里，并且 **isRenderWatcher** 为 **true**
- 第二段代码中的 **isRenderWatcher** 为 **true** 的情况下，接着把当前 **watcher** 的实例赋值给 **vm.\_watcher**
- 第三段代码中的 **callUpdatedHooks** 函数方法 **vm.\_watcher** 要等于 **watcher** 的实例（第二段那句赋值），且 **mounted** 后，且没有销毁，才执行 **updated**

### 四、beforeDestroy 和 destroyed

位置：[src/core/instance/lifecycle.js 第 97 行](https://github.com/vuejs/vue/blob/dev/src/core/instance/lifecycle.js#L97)

```js
/* @flow */

Vue.prototype.$destroy = function () {
    const vm: Component = this
    if (vm._isBeingDestroyed) {
      return
    }
    // 调用 beforeDestroy 钩子 此时 vm 内数据还在
    callHook(vm, 'beforeDestroy')
    vm._isBeingDestroyed = true
    // 从父组件中移除自己
    const parent = vm.$parent
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm)
    }
    // 拆除观察员
    if (vm._watcher) {
      vm._watcher.teardown()
    }
    let i = vm._watchers.length
    while (i--) {
      vm._watchers[i].teardown()
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--
    }
    // call the last hook...
    vm._isDestroyed = true
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null)
    // 调用 destroyed 钩子 此时 vm 数据消失
    callHook(vm, 'destroyed')
    // 关闭所有实例侦听器
    vm.$off()
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null
    }
  }
```
