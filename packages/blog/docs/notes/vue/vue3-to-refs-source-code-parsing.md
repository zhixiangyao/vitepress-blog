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

## roRefs 源码

```ts
export function toRefs<T extends object>(object: T): ToRefs<T> {
  if (__DEV__ && !isProxy(object)) {
    // 如果在开发环境 且 不是代理对象
    // 直接报错
    console.warn(`toRefs() expects a reactive object but received a plain one.`)
  }
  // 如果 object 是数组，新建同等长度空数组, 否则创建空对象
  const ret: any = isArray(object) ? new Array(object.length) : {}

  for (const key in object) {
    // 对每个 key 用 toRef 包装
    ret[key] = toRef(object, key)
  }
  return ret
}
```

```ts
export function toRef<T extends object, K extends keyof T>(object: T, key: K): ToRef<T[K]> {
  // 如果是 ref 直接返回，否者创建一个新的 ObjectRefImpl 类的实例
  return isRef(object[key]) ? object[key] : (new ObjectRefImpl(object, key) as any)
}
```

`ObjectRefImpl` 类实际是对源对象地址的引用

```ts
class ObjectRefImpl<T extends object, K extends keyof T> {
  // 标记为 ref
  public readonly __v_isRef = true

  constructor(private readonly _object: T, private readonly _key: K) {}

  get value() {
    return this._object[this._key]
  }

  set value(newVal) {
    this._object[this._key] = newVal
  }
}
```
