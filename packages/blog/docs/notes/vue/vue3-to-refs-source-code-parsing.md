# Vue3-toRefs 源码分析

当我们想使用大型响应式对象的一些 `property` 时，可能很想使用 `ES6` 解构来获取我们想要的 `property`:

```js
import { reactive } from 'vue'

const book = reactive({
  author: 'Vue Team',
  year: '2020',
  title: 'Vue 3 Guide',
  description: 'You are reading this book right now ;)',
  price: 'free',
})

let { author, title } = book
```

遗憾的是，使用解构的两个 `property` 的响应性都会丢失。对于这种情况，我们需要将我们的响应式对象转换为一组 `ref`。这些 `ref` 将保留与源对象的响应式关联:

```js
import { reactive, toRefs } from 'vue'

const book = reactive({
  author: 'Vue Team',
  year: '2020',
  title: 'Vue 3 Guide',
  description: 'You are reading this book right now ;)',
  price: 'free',
})

let { author, title } = toRefs(book)

title.value = 'Vue 3 Detailed Guide' // 我们需要使用 .value 作为标题，现在是 ref
console.log(book.title) // 'Vue 3 Detailed Guide'
```

## toRefs

`toRefs` 本质就是 `toRef` 的封装，是基于 `toRef` 的。

> [`toRefs` Source Code](https://github.com/vuejs/core/blob/8998afa42755cbdb3403cd6c0fe158980da8492c/packages/reactivity/src/ref.ts#L326)

::: details

```ts
/**
 * Converts a reactive object to a plain object where each property of the
 * resulting object is a ref pointing to the corresponding property of the
 * original object. Each individual ref is created using {@link toRef()}.
 *
 * @param object - Reactive object to be made into an object of linked refs.
 * @see {@link https://vuejs.org/api/reactivity-utilities.html#torefs}
 */
export function toRefs<T extends object>(object: T): ToRefs<T> {
  if (__DEV__ && !isProxy(object)) {
    // 如果在开发环境 且 不是代理对象
    // 直接报错
    console.warn(`toRefs() expects a reactive object but received a plain one.`)
  }
  // 如果 object 是数组，新建同等长度空数组, 否则创建空对象
  const ret: any = isArray(object) ? new Array(object.length) : {}

  for (const key in object) {
    // 对每个 key 用 propertyToRef 包装
    ret[key] = propertyToRef(object, key)
  }
  return ret
}
```

:::

## toRef

`toRef` 是一个判断函数，会判断 `source` 的类型去做不同的处理。

> [`toRef` Source Code](https://github.com/vuejs/core/blob/8998afa42755cbdb3403cd6c0fe158980da8492c/packages/reactivity/src/ref.ts#L414) > [`GetterRefImpl` Source Code](https://github.com/vuejs/core/blob/8998afa42755cbdb3403cd6c0fe158980da8492c/packages/reactivity/src/ref.ts#L360)

::: details

```ts
export function toRef(
  source: Record<string, any> | MaybeRef,
  key?: string,
  defaultValue?: unknown,
): Ref {
  if (isRef(source)) {
    // 如果是 ref 直接返回
    return source
  } else if (isFunction(source)) {
    // 如果是 function 创建一个新的 GetterRefImpl 类的实例
    return new GetterRefImpl(source) as any
  } else if (isObject(source) && arguments.length > 1) {
    // 如果是对象，并且当有 key 的时候，使用 propertyToRef 去实现
    return propertyToRef(source, key!, defaultValue)
  } else {
    // 此时是基础数据类型，比如 string number boolean 等，把它转换成 ref
    return ref(source)
  }
}

class GetterRefImpl<T> {
  public readonly __v_isRef = true
  public readonly __v_isReadonly = true
  constructor(private readonly _getter: () => T) {}
  get value() {
    return this._getter()
  }
}
```

:::

如果目标是 `ref` 就直接返回，如果不是创建一个新的 `ObjectRefImpl` 类的实例

::: warning Why

```js
const _a = ref(0)
const obj = reactive({
  b: _a,
  c: 2,
})

// 这句代码，就会走到 propertyToRef return 的三元表达式的第一个路径
const a = toRef(obj, 'b')
```

:::

> [`propertyToRef` Source Code](https://github.com/vuejs/core/blob/8998afa42755cbdb3403cd6c0fe158980da8492c/packages/reactivity/src/ref.ts#L446)

::: details

```js
function propertyToRef(source: Record<string, any>, key: string, defaultValue?: unknown) {
  const val = source[key]
  return isRef(val) ? val : (new ObjectRefImpl(source, key, defaultValue) as any)
}
```

:::

## ObjectRefImpl

`ObjectRefImpl` 类实际是对源对象地址的引用

> [`ObjectRefImpl` Source Code](https://github.com/vuejs/core/blob/8998afa42755cbdb3403cd6c0fe158980da8492c/packages/reactivity/src/ref.ts#L337)

::: details

```ts
class ObjectRefImpl<T extends object, K extends keyof T> {
  // 标记为 ref
  public readonly __v_isRef = true

  constructor(
    private readonly _object: T,
    private readonly _key: K,
    private readonly _defaultValue?: T[K],
  ) {}

  get value() {
    const val = this._object[this._key]
    return val === undefined ? this._defaultValue! : val
  }

  set value(newVal) {
    this._object[this._key] = newVal
  }

  // 这里这个没有用到
  get dep(): Dep | undefined {
    return getDepFromReactive(toRaw(this._object), this._key)
  }
}
```

:::
