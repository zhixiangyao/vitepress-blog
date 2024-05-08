<script setup lang="ts">
import { withBase } from 'vitepress'
import { onMounted, ref } from 'vue'
import mediumZoom from 'medium-zoom'

defineOptions({
  name: 'ZooImg',
})

type Props = {
  src: string
  width?: string
  height?: string
  style?: string
}

const props = defineProps<Props>()

const imgRef = ref<HTMLImageElement>()

if (!import.meta.env.SSR) {
  onMounted(() => {
    mediumZoom(imgRef.value, { background: 'var(--vp-c-bg)' })
  })
}
</script>

<template>
  <img
    ref="imgRef"
    :src="withBase(props.src)"
    :width="props.width"
    :height="props.height"
    :style="props.style"
  />
</template>

<style>
.medium-zoom-overlay {
  @apply z-50;
}

.medium-zoom-image {
  @apply z-[60];
}
</style>
