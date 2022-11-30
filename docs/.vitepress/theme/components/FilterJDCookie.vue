<script lang="ts">
export default {
  name: 'FilterJDCookie',
}
</script>

<script setup lang="ts">
import { reactive, watch } from 'vue'

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
  cookie => {
    if (cookie) filter()
  }
)
</script>

<template>
  <div class="filter-jd-cookie">
    <div>Original Cookie:</div>
    <textarea v-model="state.cookie" placeholder="请把 cookie 黏贴到这里" cols="30" rows="10"></textarea>
    <div>Filtered JD Cookie: {{ state.msg ? ` (${state.msg})` : '' }}:</div>
    <code>{{ state.filteredJDCookie }}</code>
  </div>
</template>

<style scoped>
.filter-jd-cookie {
  display: flex;
  flex-flow: column nowrap;
  align-items: self-start;
}

textarea,
code {
  width: 70%;
  min-height: 100px;
  padding: 10px;
  word-break: break-all;
}

button {
  margin-top: 20px;
  padding: 5px 20px;
  cursor: pointer;
}

button[disabled='disabled'] {
  cursor: not-allowed;
}
</style>
