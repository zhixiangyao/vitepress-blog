// 图片优化脚本:压缩 docs/public 下超过阈值的 png/jpg, 并对首页背景图额外生成 webp 版本
// 用法: pnpm optimize:images
import { existsSync, readdirSync, statSync, writeFileSync, rmSync } from 'node:fs'
import { dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'docs/public')
const THRESHOLD = 60 * 1024 // 60KB 以下的跳过

// 首页背景图: 额外生成 webp 并删除原文件(引用在 index.md 中同步更新)
const WEBP_TARGETS = [
  'home-bg-images/desktop_dark_girl.png',
  'home-bg-images/desktop_light_girl.png',
  'home-bg-images/mobile_dark_girl.jpeg',
  'home-bg-images/mobile_light_girl.jpeg',
]

const files = []
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory())
      walk(p)
    else if (/\.(png|jpe?g)$/i.test(name))
      files.push(p)
  }
}
walk(publicDir)

let before = 0
let after = 0
let converted = 0

for (const file of files) {
  const rel = file.slice(publicDir.length + 1)
  const size = statSync(file).size
  if (size < THRESHOLD)
    continue

  before += size
  const image = sharp(file)
  const meta = await image.metadata()

  let best
  if (meta.format === 'jpeg') {
    best = await image.jpeg({ quality: 82, mozjpeg: true }).toBuffer()
  }
  else {
    const quantized = await image.png({ palette: true, quality: 80, compressionLevel: 9 }).toBuffer()
    const lossless = await image.png({ compressionLevel: 9 }).toBuffer()
    best = quantized.length < lossless.length ? quantized : lossless
  }

  if (best.length >= size)
    continue // 压缩无效, 保留原图

  writeFileSync(file, best)
  after += best.length
  console.log(`[压缩] ${rel} ${(size / 1024).toFixed(0)}KB -> ${(best.length / 1024).toFixed(0)}KB`)
}

// 背景图转 webp
for (const rel of WEBP_TARGETS) {
  const file = join(publicDir, rel)
  if (!existsSync(file))
    continue
  const size = statSync(file).size
  const out = file.replace(/\.[a-z]+$/i, '.webp')
  await sharp(file)
    .resize({ width: 2560, withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(out)
  rmSync(file)
  console.log(`[webp] ${rel} ${(size / 1024).toFixed(0)}KB -> ${(statSync(out).size / 1024).toFixed(0)}KB (${extname(out).slice(1)})`)
  converted++
}

console.log(`\n完成: 压缩后节省 ${((before - after) / 1024).toFixed(0)}KB,webp 转换 ${converted} 个`)
