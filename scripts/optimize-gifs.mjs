// GIF 转 MP4 脚本: 把 docs/public 下的大 gif 转成 h264 mp4(体积可缩小 90%+), 转换后需要手动删除原 gif 并更新文章引用为 <video>
// 用法: pnpm optimize:gifs
import { execFileSync } from 'node:child_process'
import { readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'docs/public')
const THRESHOLD = 100 * 1024 // 100KB 以下的 gif 不值得转
const ffmpeg = join(
  root,
  'node_modules/.pnpm/ffmpeg-static@5.3.0/node_modules/ffmpeg-static/ffmpeg',
)

const gifs = []
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory())
      walk(p)
    else if (/\.gif$/i.test(name) && statSync(p).size > THRESHOLD)
      gifs.push(p)
  }
}
walk(publicDir)

if (gifs.length === 0) {
  console.log('没有需要转换的大 gif')
  process.exit(0)
}

for (const gif of gifs) {
  const rel = gif.slice(publicDir.length + 1)
  const mp4 = gif.replace(/\.gif$/i, '.mp4')
  const before = statSync(gif).size

  execFileSync(ffmpeg, [
    '-y',
    '-i', gif,
    '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2',
    '-c:v', 'libx264',
    '-crf', '27',
    '-preset', 'veryfast',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    '-an',
    mp4,
  ], { stdio: 'ignore' })

  console.log(
    `[gif->mp4] ${rel} ${(before / 1024).toFixed(0)}KB -> ${(statSync(mp4).size / 1024).toFixed(0)}KB`,
  )
}

console.log('\n转换完成, 请检查视频内容, 确认后删除原 gif 并更新文章引用.')
