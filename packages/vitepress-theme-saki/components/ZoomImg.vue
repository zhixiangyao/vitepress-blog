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

onMounted(() => {
  mediumZoom(imgRef.value, { background: 'var(--vp-c-bg)' })
})
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
  z-index: 20;
}

.medium-zoom-image {
  z-index: 21;
}
</style>
