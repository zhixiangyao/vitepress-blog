<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import VPSwitch from './ui/VPSwitch.vue'

defineOptions({ name: 'Base64' })

const decode = ref(true)

const state = reactive({
  input: '',
  output: '',
})

watch([() => state.input, () => decode.value], ([newInputValue, newSwValue]) => {
  const fn = newSwValue ? atob : btoa
  state.output = fn(newInputValue)
})
</script>

<template>
  <div class="flex flex-col flex-nowrap self-start">
    <div class="flex gap-5 my-3">
      <span class="w-24">{{ decode ? 'Base64 解码' : 'Base64 编码' }}</span>
      <VPSwitch :checked="decode" :onChange="() => (decode = !decode)" />
    </div>

    <textarea v-model="state.input" cols="30" rows="10"></textarea>

    <div>{{ decode ? '解码' : '编码' }}后结果:</div>
    <code>{{ state.output }}</code>
  </div>
</template>

<style scoped>
textarea,
code {
  @apply my-3 w-[70%] min-h-[100px] p-3 break-all !rounded-md;

  background-color: var(--vp-code-bg);
}
</style>
