# Vue3 常用内置指令转 jsx 写法

## `v-text`

- **template:**

```vue
<span v-text="msg"></span>
<!-- 等价于 -->
<span>{{msg}}</span>
```

- **jsx/tsx:**

```jsx
<span v-text={msg} />
```

- **renderFunction:**

```jsx
h('span', { textContent: msg }, null)
```

<!-- more -->

## `v-html`

- **template:**

```vue
<div v-html="html"></div>
```

- **jsx/tsx:**

```jsx
<div v-html={html} />
```

- **renderFunction:**

```jsx
h('div', { innerHTML: msg }, null)
```

## `v-show`

- **template:**

```vue
<div v-show="show"></div>
```

- **jsx/tsx:**

```jsx
<div v-show={show} />
```

- **renderFunction:**

```jsx
h('div', { style: !show && 'display: none;' }, null)
```

## `v-if`

- **template:**

```vue
<div v-if="true"></div>
```

- **jsx/tsx:**

```jsx
true && <div />
```

- **renderFunction:**

```jsx
true && h('div', null, null)
```

## `v-else`

- **template:**

```vue
<div v-if="type === 'A'">A</div>
<div v-else>B</div>
```

- **jsx/tsx:**

```jsx
type === 'A' ? <div>A</div> : <div>B</div>
```

- **renderFunction:**

```jsx
type === 'A' ? h('div', null, 'A') : h('div', null, 'B')
```

## `v-else-if`

- **template:**

```vue
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else-if="type === 'C'">C</div>
<div v-else>D</div>
```

- **jsx/tsx:**

```jsx
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

- **renderFunction:**

```jsx
const component = () =>
  type === 'A'
    ? h('div', null, 'A')
    : type === 'B'
      ? h('div', null, 'B')
      : type === 'C'
        ? h('div', null, 'C')
        : h('div', null, 'D')
```

## `v-for`

- **template:**

```vue
<div v-for="item in items" :key="item.id"> {{ item.text }} </div>
```

- **jsx/tsx:**

```jsx
items.map(({ id, text }) => <div key={id}>{text}</div>)
```

- **renderFunction:**

```jsx
items.map(({ id, text }) => h('div', { id }, text))
```

## `v-model`

> 当 model = ref('') 时

- **template:**

```vue
<a v-model="model" />
<b v-model.modifier="model" />
<C v-model:argument.modifier="model" />
```

- **jsx/tsx:**

```jsx
<A v-model={model.value} />
<B v-model={[model.value, ['modifier']]} />
<C v-model={[model.value, 'argument', ['modifier']]} />
```

- **renderFunction:**

```jsx
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
