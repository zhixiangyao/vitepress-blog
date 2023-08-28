<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useData } from 'vitepress'

import { loadExternalResource } from '../tools'

defineOptions({
  name: 'Rain',
})

type BG = {
  desktopDark: string
  desktopLight: string
  mobileDark: string
  mobileLight: string
}

type Props = {
  bg: BG
}

const props = defineProps<Props>()

const useRain = (bg: BG) => {
  const canvasRef = ref<HTMLCanvasElement>()
  let raindropFx: InstanceType<typeof window.RaindropFX>
  const url = 'https://yaozhixiang.top/assets/js/RaindropFX.js'

  const resizeRain = () => {
    if (!canvasRef.value) return
    if (!raindropFx) return

    const rect = canvasRef.value!.getBoundingClientRect()
    raindropFx.resize(rect.width, rect.height)
  }

  const switchRain = () => {
    if (!raindropFx) return
    const body = document.body.getBoundingClientRect()

    if (isDark.value) {
      if (body.height > body.width) {
        raindropFx.setBackground(bg.mobileDark)
      } else {
        raindropFx.setBackground(bg.desktopDark)
      }
    } else {
      if (body.height > body.width) {
        raindropFx.setBackground(bg.mobileLight)
      } else {
        raindropFx.setBackground(bg.desktopLight)
      }
    }
  }

  const removeRainScript = (url: string) => {
    Object.defineProperty(window, 'RaindropFX', { value: null, writable: true, configurable: true })
    const scriptElement = document.querySelector(`[src="${url}"]`)

    scriptElement?.remove()
  }

  const initRain = async () => {
    try {
      const body = document.body.getBoundingClientRect()
      const rect = canvasRef.value!.getBoundingClientRect()

      canvasRef.value!.width = rect.width
      canvasRef.value!.height = rect.height

      let background: string

      if (isDark.value) {
        if (body.height > body.width) {
          background = bg.mobileDark
        } else {
          background = bg.desktopDark
        }
      } else {
        if (body.height > body.width) {
          background = bg.mobileLight
        } else {
          background = bg.desktopLight
        }
      }

      const option = {
        canvas: canvasRef.value!,
        background,
      }

      raindropFx = new window.RaindropFX(option)

      raindropFx.start()
    } catch (error) {
      console.error(error)
    }
  }

  onMounted(() => {
    removeRainScript(url)

    loadExternalResource(url, 'js').then(() => {
      initRain()
    })
  })

  watch(isDark, () => {
    switchRain()
  })

  onMounted(() => {
    window.addEventListener('resize', resizeRain)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeRain)
  })

  return { canvasRef }
}

const { isDark } = useData()
const { canvasRef } = useRain(props.bg)
</script>

<template>
  <canvas ref="canvasRef" id="rain"></canvas>
</template>

<style>
#rain {
  position: fixed;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
}
</style>
