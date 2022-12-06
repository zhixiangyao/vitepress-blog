<script lang="ts">
export default {
  name: 'Rain',
}
</script>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { utf8ToB64, b64ToUtf8 } from '../tools'

const { isDark } = useData()
const canvasRef = ref<HTMLCanvasElement>()
let raindropFx: InstanceType<typeof window.RaindropFX>
const imgPrefix = 'https://raw.githubusercontent.com/zhixiangyao/CDN/master/images'
const bg = {
  desktopDark: imgPrefix + '/anime/fate/999332.png',
  desktopLight: imgPrefix + '/anime/fate/688669.png',
  mobileDark: imgPrefix + '/anime/twitter/3.jpeg',
  mobileLight: imgPrefix + '/anime/twitter/2.jpeg',
}

const resizeRain = () => {
  if (!canvasRef.value) return
  if (!raindropFx) return

  const rect = canvasRef.value!.getBoundingClientRect()
  raindropFx.resize(rect.width, rect.height)
}
const switchRain = () => {
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

const initRain = async () => {
  const key = 'lib_code_raindrop_fx'
  try {
    const code = localStorage.getItem(key)

    if (code === null) {
      const url = 'https://raw.githubusercontent.com/SardineFish/raindrop-fx/master/bundle/index.js'
      const res = await fetch(url)
      const rawCode = await res.text()
      const ripeCode = rawCode
        .replace('var RaindropFX', 'window.RaindropFX')
        .replaceAll('console.log', '')

      localStorage.setItem(key, utf8ToB64(ripeCode))
      eval(ripeCode)
    } else {
      eval(b64ToUtf8(code))
    }

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
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  initRain()
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
</script>

<template>
  <canvas :ref="(e) => (canvasRef = e as HTMLCanvasElement)" id="rain"></canvas>
</template>

<style>
#rain {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
}
</style>
