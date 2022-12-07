<script setup lang="ts">
import { watch } from 'vue'
import { useData } from 'vitepress'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const { page } = useData()

watch(
  () => page.value.relativePath,
  () => {
    NProgress.start()

    setTimeout(() => {
      NProgress.done()
    }, 50)
  },
)
</script>
