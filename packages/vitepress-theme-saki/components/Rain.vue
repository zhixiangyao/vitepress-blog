<script lang="ts">
export default {
  name: 'Rain',
}
</script>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { utf8ToB64, b64ToUtf8 } from '../tools'

const canvasRef = ref<HTMLCanvasElement>()

const useRain = async () => {
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
      const img = 'https://raw.githubusercontent.com/zhixiangyao/CDN/master/images'

      canvasRef.value!.width = rect.width
      canvasRef.value!.height = rect.height

      let background: string

      if (body.height > body.width) {
        background = img + '/anime/twitter/2.jpeg'
      } else {
        background = img + '/anime/fate/999332.png'
      }

      const option = {
        canvas: canvasRef.value!,
        background,
      }

      const raindropFx = new window.RaindropFX(option)

      raindropFx.start()

      const watchFX = () => {
        const rect = canvasRef.value!.getBoundingClientRect()
        raindropFx.resize(rect.width, rect.height)
      }
      window.addEventListener('resize', watchFX)

      onBeforeUnmount(() => {
        window.removeEventListener('resize', watchFX)
      })
    } catch (error) {
      console.error(error)
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  useRain()
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
