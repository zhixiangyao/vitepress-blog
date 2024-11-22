# Vue3 中 v-model 的背后逻辑

在 `vue3` 中 `v-model` 会被编译成什么呢？是否可以不使用 v-model 呢？

我最近在写一些 `TSX` 组件的时候遇到了这个问题，看了一下 [naive-ui](https://www.naiveui.com/) 的代码，发现他们都是用 tsx 编写 `vue3` 组件的，详情看 [这里](https://github.com/tusen-ai/naive-ui/blob/acced75df601e1dd9c90a944526155cfdae6c0ae/src/drawer/src/Drawer.tsx#L208)

<ZoomImg src="/vue3-tsx-vmodel.png" class="w-full" />

在 `208` 行的时候，有 `2` 个 `call` 的方法，分别考虑了

- 使用 `v-model:height="ref"` 和使用 `:height="ref"` & `:on-update-height="e => ref = e"` 的情况

- 对应到 `TSX` 里就是 `v-model={ref.value}` 以及 `height={ref.value}` & `on-update-height={e => ref.value = e}`

## 列子

::: code-group

```vue:line-numbers {11,16} [App.vue]
<script setup>
import { ref } from 'vue'
import Comp from './Input.tsx'

const value1 = ref('')
const value2 = ref('')
</script>

<template>
  <h3>使用 v-model:value: {{ value2 }}</h3>
  <Comp v-model:value="value2" />

  <br />

  <h3>不使用: {{ value1 }}</h3>
  <Comp :value="value1" :on-update-value="(e) => (value1 = e)" />
</template>
```

```tsx:line-numbers {14,18,32,33} [Input.tsx]
import { defineComponent, type PropType } from 'vue'

type Props = {
  value?: string
  onUpdateValue?: (e: string) => void
  ['onUpdate:value']?: (e: string) => void
}

const props = {
  value: {
    type: String as PropType<Props['value']>,
    default: '',
  },
  onUpdateValue: {
    type: Function as PropType<Props['onUpdateValue']>,
    default: () => () => {},
  },
  ['onUpdate:value']: {
    type: Function as PropType<Props['onUpdate:value']>,
    default: () => () => {},
  },
}

export default defineComponent<Props>({
  name: 'Input',
  props,
  setup: (props) => {
    const handleInput: HTMLInputElement['oninput'] = (e) => {
      const { onUpdateValue, 'onUpdate:value': _onUpdateValue } = props

      if (e.target instanceof HTMLInputElement) {
        onUpdateValue && onUpdateValue(e.target.value)
        _onUpdateValue && _onUpdateValue(e.target.value)
      }
    }

    return () => <input value={props.value} onInput={handleInput} />
  },
})
```

:::

- [线上 demo](https://play.vuejs.org/#__PROD__eNqdVF1u00AQvsrID3UipY5KeXKdIEBFFPFT0cJLXSHjbBoXe9faXYcgy0fgjUNwBF4Ql0HiGszOep04SSvBQ5TdmW/m++ZnXXuPyzJYVswLvUilMis1KKarchrzrCiF1FCDZHNoYC5FAT5C/c71VBRlaw/GZ7ysdKDVyj+JecxTwZWGZZJX7AgmJsfA94c9+4NNezS29EiMF82KMk80wxtAtDie/v7568+377A8LMSM5SHFh1DXLlPTRGOEEZxk9ZCT2LO42IMxMSDso1yfDcOPr5ZknfZoN20/3xHmCwU/rMoZij10PgaT6bp01pJG442qvJGnFfZint0Et0pw7H9tWGIvRZosZ/JNqTPsVeyhHuMxviTPxecXZNOyYiNnTxcs/bTHfqtWxhZ755IpJpcopfPpRN4wbd2nF6/ZCs+dE3tX5Yi+x/mWKZFXRqOFPan4DGVv4EjtGa1Kxm8u1elKM65cUUaoQTaEx4ZWzHT4rtLXco+DhxQX8wa72K0ddrDb2BmbZ5zSCc64HoH+UjI4l6K8NId2mYkz9mKJS4C/DqNwaLWxgB3ioxCUlliCtQn+jsb9vvUNcBGtf0hzF9nMAq98B7Vb41/fjW6cCvs+yj0yTDPoBlROCBeUBhLVVRaR/Cu/pZuOXAA2JKlyHYLvWxN2fbeYHYZnFU/NKPZx9CL3cg2owoH9q6EZ9ql32/Nf/C74XwV0HWcr2po2ant3LN100CrjSYG6fNo6v2WkYbVn+ngiM9ksr5NlJ7tIzDOh+BCeX756ScfTnBVIZqrKKPU1Dn/A+glciro/tRFs9yKEDz0ELvzEqnQ123TZHDkC+7Igw9QJT5mY78gabmrY2hk4OOgbuowBiRmebIZu6cLYvuWeYJpXd3AXif2W3E16jY6ojfbhTGqq3aZsUC3VNqk3RtGYL3Qb7LaElmToNX8BBBVoHA==)
