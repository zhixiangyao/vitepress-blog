<script lang="ts">
export default {
  name: 'Live2d',
}
</script>

<script setup lang="ts">
import { onMounted } from 'vue'

import { loadExternalResource } from '../tools'

const initLive2 = () => {
  const live2d_path = 'https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/'

  Promise.all([
    loadExternalResource(live2d_path + 'waifu.css', 'css'),
    loadExternalResource(live2d_path + 'live2d.min.js', 'js'),
    loadExternalResource(live2d_path + 'waifu-tips.js', 'js'),
  ]).then(() => {
    window.initWidget({
      waifuPath: live2d_path + 'waifu-tips.json',
      apiPath: 'https://api.zsq.im/live2d', // https://live2d.fghrsh.net/api
      // cdnPath: 'https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/',
    })
  })
}

onMounted(initLive2)
</script>

<style>
@media screen and (max-width: 639px) {
  #waifu {
    display: none;
  }
}

#waifu-toggle {
  display: none;
}

#waifu {
  right: 0;
  left: initial !important;

  /* fix */
  z-index: 100 !important;
}
</style>
