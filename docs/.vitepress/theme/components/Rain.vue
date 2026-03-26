<script setup lang="ts">
import { useData } from 'vitepress'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { loadExternalResource } from '../tools'

defineOptions({ name: 'Rain' })

const props = defineProps<Props>()

interface BG {
  desktopDark: string
  desktopLight: string
  mobileDark: string
  mobileLight: string
}

interface Props {
  bg: BG
}

function useRain(bg: BG) {
  const { isDark } = useData()
  const canvasRef = ref<HTMLCanvasElement>()
  let raindropFx: InstanceType<typeof window.RaindropFX>
  const url = 'https://yaozhixiang.top/assets/js/RaindropFX.js'

  const resizeRain = () => {
    if (!canvasRef.value)
      return
    if (!raindropFx)
      return

    const rect = canvasRef.value!.getBoundingClientRect()

    raindropFx.resize(rect.width, rect.height)
  }

  const switchRain = () => {
    if (!raindropFx)
      return
    const body = document.body.getBoundingClientRect()

    if (isDark.value) {
      if (body.height > body.width) {
        raindropFx.setBackground(bg.mobileDark)
      }
      else {
        raindropFx.setBackground(bg.desktopDark)
      }
    }
    else {
      if (body.height > body.width) {
        raindropFx.setBackground(bg.mobileLight)
      }
      else {
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
        }
        else {
          background = bg.desktopDark
        }
      }
      else {
        if (body.height > body.width) {
          background = bg.mobileLight
        }
        else {
          background = bg.desktopLight
        }
      }

      const option = {
        canvas: canvasRef.value!,
        background,
      }

      raindropFx = new window.RaindropFX(option)

      raindropFx.start()
    }
    catch (error) {
      console.error(error)
    }
  }

  const watched = watch(isDark, () => {
    switchRain()
  })

  onMounted(() => {
    removeRainScript(url)

    loadExternalResource(url, 'js').then(() => {
      initRain()
    })

    window.addEventListener('resize', resizeRain)
    document.body.classList.add('fixed')
  })

  onBeforeUnmount(() => {
    watched()

    window.removeEventListener('resize', resizeRain)
    document.body.classList.remove('fixed')
  })

  return { canvasRef }
}

const { canvasRef } = useRain(props.bg)
</script>

<template>
  <Teleport to="body">
    <canvas id="rain" ref="canvasRef" class="fixed inset-0 w-full h-full translate-x-0" />
  </Teleport>
</template>
