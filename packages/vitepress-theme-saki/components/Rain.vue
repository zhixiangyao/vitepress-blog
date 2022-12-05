<script lang="ts">
export default {
  name: 'Rain',
}
</script>

<script setup lang="ts">
import { onMounted } from 'vue'
import { loadExternalResource } from '../tools'

const initRain = () => {
  const canvas = document.querySelector('#rain')! as HTMLCanvasElement
  const body = document.body.getBoundingClientRect()
  const rect = canvas.getBoundingClientRect()

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

  canvas.width = rect.width
  canvas.height = rect.height

  const option = {
    canvas,
    background,
  }

  const raindropFx = new window.RaindropFX(option)

  self.onresize = () => {
    const rect = canvas.getBoundingClientRect()
    raindropFx.resize(rect.width, rect.height)
  }

  raindropFx.start()

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
  <canvas id="rain"></canvas>
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
