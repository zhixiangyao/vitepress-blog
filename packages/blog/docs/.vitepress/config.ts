import { defineConfig } from 'vitepress'

import { nav } from './config-nav'
import { sidebar } from './config-sidebar'

const iconString = {
  leetcode:
    '<svg viewBox="0 0 1024 1024" version="1.1" p-id="4089" width="200" height="200"><title>Leetcode</title><path d="M686.969238 765.086476l-115.039501 111.200586c-19.877051 19.919706-47.389279 28.237356-77.759367 28.237357s-57.882315-8.31765-77.802021-28.237357l-184.779799-186.102093c-19.919706-19.919706-29.943541-49.052809-29.943541-79.465551s10.023835-57.882315 29.943541-77.80202l184.225289-186.827222c19.919706-19.919706 47.986444-27.512228 78.356531-27.512228s57.882315 8.31765 77.759367 28.237357l115.039501 111.157931c21.924473 21.967128 58.223552 21.199345 81.043772-1.620876 22.82022-22.862875 23.588003-59.161953 1.66353-81.086426l-111.285895-112.43757a215.619088 215.619088 0 0 0-104.290538-57.029222l105.228939-106.764506c22.009782-21.924473 21.241999-58.266206-1.578221-81.086426-22.82022-22.82022-59.161953-23.545348-81.129081-1.620876l-430.811629 430.854284c-41.844179 41.886834-63.725997 99.683839-63.725997 163.580455 0 63.896616 21.881818 123.485115 63.725997 165.28664l185.419619 186.016783c41.844179 41.75887 99.683839 61.934504 163.537801 61.934504s121.693622-21.839164 163.580455-63.725997l111.285895-112.480225c21.924473-21.924473 21.15669-58.223552-1.66353-81.043772s-59.119299-23.588003-81.001117-1.66353z m200.86059-209.860714H455.098741c-29.943541 0-54.171363 25.763389-54.171363 57.413114s24.227822 57.413114 54.171363 57.413114h432.731087c29.900886 0 54.171363-25.763389 54.171363-57.413114s-24.270477-57.413114-54.171363-57.413114z" p-id="4090"></path></svg>',
}

export default defineConfig({
  lang: 'zh',
  title: 'Blog',
  description: 'Personal Blog',
  lastUpdated: true,
  outDir: '../dist',
  cacheDir: './.vitepress/.vite',

  themeConfig: {
    siteTitle: 'Zhixiang Yao',
    logo: '/avatar.jpeg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhixiangyao' },
      { icon: 'twitter', link: 'https://twitter.com/yaozhixiang' },
      {
        icon: {
          svg: iconString.leetcode,
        },
        link: 'https://leetcode.cn/u/yaozhixiang/',
      },
    ],
    nav: nav(),
    sidebar: sidebar(),
    footer: {
      copyright:
        'Copyright © 2019-present <a href="https://github.com/zhixiangyao">Zhixiang Yao</a>',
    },
    search: {
      provider: 'local',
      options: {},
    },
  },

  head: [
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' }],
    [
      'link',
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' },
    ],
    [
      'link',
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' },
    ],
    ['link', { rel: 'manifest', href: '/favicons/site.webmanifest' }],
    ['link', { rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#3a0839' }],
    ['link', { rel: 'shortcut icon', href: '/favicons/favicon.ico' }],
    ['meta', { name: 'msapplication-TileColor', content: '#3a0839' }],
    ['meta', { name: 'msapplication-config', content: '/favicons/browserconfig.xml' }],
    ['meta', { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' }],
    ['meta', { name: 'theme-color', content: '#1b1b1f', media: '(prefers-color-scheme: dark)' }],
  ],
})
