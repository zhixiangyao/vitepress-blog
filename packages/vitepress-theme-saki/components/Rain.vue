<script lang="ts">
export default {
  name: 'Rain',
}
</script>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { loadExternalResource } from '../tools'

const canvasRef = ref<HTMLCanvasElement>()
const state = reactive<{ raindropFx: InstanceType<typeof window.RaindropFX> | null }>({
  raindropFx: null,
})

const initRain = () => {
  const body = document.body.getBoundingClientRect()
  const rect = canvasRef.value!.getBoundingClientRect()

  let background: string

  if (body.height > body.width) {
    // mobile
    background =
      'https://raw.githubusercontent.com/zhixiangyao/CDN/master/images/anime/twitter/2.jpeg'
  } else {
    // desktop
    background =
      'https://raw.githubusercontent.com/zhixiangyao/CDN/master/images/anime/fate/999332.png'
  }

  canvasRef.value!.width = rect.width
  canvasRef.value!.height = rect.height

  const option = {
    canvas: canvasRef.value!,
    background,
  }

  state.raindropFx = new window.RaindropFX(option)

  window.onresize = () => {
    const rect = canvasRef.value!.getBoundingClientRect()
    state.raindropFx?.resize(rect.width, rect.height)
  }

  state.raindropFx.start()

  console.info('raindropFx author: SardineFish')
  console.info('GitHub: https://github.com/SardineFish/raindrop-fx')
}

const loadRain = () => {
  const url = 'https://yaozhixiang.top/assets/js/RaindropFX.js'

  if (window?.RaindropFX) {
    initRain()
  } else {
    Promise.all([loadExternalResource(url, 'js')]).then(() => {
      initRain()
    })
  }
}

onMounted(loadRain)
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
