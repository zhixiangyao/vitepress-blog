<script setup lang="ts">
import { reactive, watch } from 'vue'

defineOptions({
  name: 'FilterJDCookie',
})

const state = reactive({
  cookie: '',
  filteredJDCookie: '',
  msg: '',
})

const getToken = (text: string) => {
  const CV = text
  const pin = CV.match(/pt_pin=.+?;/)?.[0] ?? ''
  const key = CV.match(/pt_key=.+?;/)?.[0] ?? ''
  const CookieValue = pin + key ?? ''
  return CookieValue
}

const filter = () => {
  const cookieValue = getToken(state.cookie)

  if (cookieValue) {
    state.filteredJDCookie = encodeURI(cookieValue)
    window.copy && window.copy(state.filteredJDCookie)
    state.msg = '过滤成功'
  } else {
    state.filteredJDCookie = ''
    state.msg = '过滤失败'
  }
}

watch(
  () => state.cookie,
  (cookie) => {
    if (cookie) filter()
  },
)
</script>

<template>
  <div class="flex flex-col flex-nowrap self-start">
    <div>Original Cookie:</div>

    <textarea
      v-model="state.cookie"
      placeholder="请把 cookie 黏贴到这里"
      cols="30"
      rows="10"
    ></textarea>

    <div>Filtered JD Cookie: {{ state.msg ? ` (${state.msg})` : '' }}:</div>
    <code>{{ state.filteredJDCookie }}</code>
  </div>
</template>

<style scoped>
textarea,
code {
  @apply my-3 w-[70%] min-h-[100px] p-3 break-all;

  background-color: var(--vp-code-bg);
}
</style>
