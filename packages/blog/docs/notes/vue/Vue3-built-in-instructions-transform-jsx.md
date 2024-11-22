# Vue3 常用内置指令转 jsx 写法

## `v-text`

::: code-group

```vue [template]
<span v-text="msg"></span>
<!-- 等价于 -->
<span>{{ msg }}</span>
```

```tsx [jsx/tsx]
<span v-text={msg} />
```

```jsx [renderFunction]
h('span', { textContent: msg }, null)
```

:::

## `v-html`

::: code-group

```vue [template]
<div v-html="html"></div>
```

```tsx [jsx/tsx]
<div v-html={html} />
```

```jsx [renderFunction]
h('div', { innerHTML: msg }, null)
```

:::

## `v-show`

::: code-group

```vue [template]
<div v-show="show"></div>
```

```tsx [jsx/tsx]
<div v-show={show} />
```

```jsx [renderFunction]
h('div', { style: !show && 'display: none;' }, null)
```

:::

## `v-if`

::: code-group

```vue [template]
<div v-if="true"></div>
```

```tsx [jsx/tsx]
true && <div />
```

```jsx [renderFunction]
true && h('div', null, null)
```

:::

## `v-else`

::: code-group

```vue [template]
<div v-if="type === 'A'">A</div>
<div v-else>B</div>
```

```tsx [jsx/tsx]
type === 'A' ? <div>A</div> : <div>B</div>
```

```jsx [renderFunction]
type === 'A' ? h('div', null, 'A') : h('div', null, 'B')
```

:::

## `v-else-if`

::: code-group

```vue [template]
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else-if="type === 'C'">C</div>
<div v-else>D</div>
```

```tsx [jsx/tsx]
const component = () =>
  type === 'A' ? (
    <div>A</div>
  ) : type === 'B' ? (
    <div>B</div>
  ) : type === 'C' ? (
    <div>C</div>
  ) : (
    <div>D</div>
  )
```

```jsx [renderFunction]
const component = () =>
  type === 'A'
    ? h('div', null, 'A')
    : type === 'B'
      ? h('div', null, 'B')
      : type === 'C'
        ? h('div', null, 'C')
        : h('div', null, 'D')
```

:::

## `v-for`

::: code-group

```vue [template]
<div v-for="item in items" :key="item.id"> {{ item.text }} </div>
```

```jsx [jsx/tsx]
items.map(({ id, text }) => <div key={id}>{text}</div>)
```

```jsx [renderFunction]
items.map(({ id, text }) => h('div', { id }, text))
```

:::

## `v-model`

::: code-group

```vue [template]
<a v-model="model" />
<b v-model.modifier="model" />
<C v-model:argument.modifier="model" />
```

```tsx [jsx/tsx]
<A v-model={model.value} />
<B v-model={[model.value, ['modifier']]} />
<C v-model={[model.value, 'argument', ['modifier']]} />
```

```jsx [renderFunction]
h('A', { modelValue: model.value, 'onUpdate:modelValue': (v) => (model.value = v) })
h('B', {
  modelValue: model.value,
  modelModifiers: { modifier: true },
  'onUpdate:modelValue': (v) => (model.value = v),
})
h('C', {
  argument: model.value,
  argumentModifiers: { modifier: true },
  'onUpdate:argument': (v) => (model.value = v),
})
```

:::
