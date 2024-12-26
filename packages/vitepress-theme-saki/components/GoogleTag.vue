<script setup lang="ts">
import { onMounted } from 'vue'
import { loadExternalResource } from '../tools'

defineOptions({ name: 'GoogleTag' })

function gtag(...args: any[]) {
  window.dataLayer.push(args)
}
function init() {
  window.dataLayer = window.dataLayer || []
  gtag('js', new Date())
  gtag('config', 'G-1E9XR885EH')
}

if (!import.meta.env.SSR) {
  onMounted(() => {
    loadExternalResource('https://www.googletagmanager.com/gtag/js?id=G-1E9XR885EH', 'js')
    init()
  })
}
</script>
