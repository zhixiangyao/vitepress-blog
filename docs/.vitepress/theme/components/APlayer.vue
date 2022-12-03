<script lang="ts">
export default {
  name: 'APlayer',
}
</script>

<script setup lang="ts">
import { onMounted } from 'vue'
import { loadExternalResource } from '../tools'

const initAPlayer = () => {
  const div = document.createElement('div')
  div.id = 'APlayer'
  document.body.appendChild(div)

  const ap = new window.APlayer({
    container: document.getElementById('APlayer') as HTMLElement,
    fixed: true,
    volume: 0.2,
    theme: '#1da1f2',
    lrcType: 3,
    audio: [
      {
        name: "Don't say lazy",
        artist: 'TV动画《轻音少女》 - 唯・澪・中律・紬',
        url: "https://cdn.jsdelivr.net/gh/zhixiangyao/CDN/mp3/Don't say lazy.mp3",
        lrc: "https://cdn.jsdelivr.net/gh/zhixiangyao/CDN/lrc/Don't say lazy.lrc",
        cover: "https://cdn.jsdelivr.net/gh/zhixiangyao/CDN/images/music/Don't say lazy.png",
      },
      {
        name: 'Pride',
        artist: 'TV动画《听我的电波吧》片尾曲 - 遥海',
        url: 'https://cdn.jsdelivr.net/gh/zhixiangyao/CDN/mp3/Pride.mp3',
        lrc: 'https://cdn.jsdelivr.net/gh/zhixiangyao/CDN/lrc/Pride.lrc',
        cover: 'https://cdn.jsdelivr.net/gh/zhixiangyao/CDN/images/music/Pride.png',
      },
    ],
  })
  ap.lrc.hide()
}

const loadAPlayer = () => {
  const url = 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js'

  Promise.all([loadExternalResource(url, 'js')]).then(() => {
    initAPlayer()
  })
}

onMounted(loadAPlayer)
</script>

<style>
@import '../public/aplayer.css';
</style>
