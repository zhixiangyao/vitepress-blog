<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import VPSwitch from './ui/VPSwitch.vue'

defineOptions({
  name: 'Base64DecodeEncode',
})

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
  <div class="base64">
    <div class="switch">
      <span>{{ decode ? 'Base64 解码' : 'Base64 编码' }}</span>
      <VPSwitch :checked="decode" :onChange="() => (decode = !decode)" />
    </div>

    <textarea v-model="state.input" cols="30" rows="10"></textarea>

    <div>{{ decode ? '解码' : '编码' }}后结果:</div>
    <code>{{ state.output }}</code>
  </div>
</template>

<style scoped>
.base64 {
  display: flex;
  flex-flow: column nowrap;
  align-items: self-start;
}

.base64 div.switch {
  display: flex;
  gap: 20px;
  margin: 10px 0;
}

.base64 div.switch span {
  width: 100px;
}

textarea,
code {
  margin: 10px 0;
  width: 70%;
  min-height: 100px;
  padding: 10px;
  background-color: var(--vp-code-bg);
  word-break: break-all;
}
</style>
