<script lang="ts">
export default {
  name: 'GoogleTag',
}
</script>

<script setup lang="ts">
import { onMounted } from 'vue'

import { loadExternalResource } from '../tools'

const gtag = (...args: any[]) => {
  window.dataLayer.push(args)
}
const init = () => {
  window.dataLayer = window.dataLayer || []
  gtag('js', new Date())
  gtag('config', 'G-1E9XR885EH')
}

onMounted(() => {
  loadExternalResource('https://www.googletagmanager.com/gtag/js?id=G-1E9XR885EH', 'js')
  init()
})
</script>
