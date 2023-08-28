import { defineConfig, type DefaultTheme } from 'vitepress'

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
      copyright: '2019-present Zhixiang Yao',
    },
    // algolia: {
    //   appId: 'DM7KLUW505',
    //   apiKey: '74549704763205291f0582f7786cf183',
    //   indexName: 'vitepress_blog',
    // },
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
    ['meta', { name: 'theme-color', content: '#ffffff' }],
  ],
})

type Nav = DefaultTheme.Config['nav']

function nav(): Nav {
  return [
    {
      text: 'Moments',
      link: '/moments/空は高く風は歌う',
    },
    {
      text: 'Notes',
      link: '/notes/javascript/es6-class-extends-mock',
    },
    {
      text: 'Tools',
      link: '/tools/filter-jd-cookie',
    },
    {
      text: 'Arithmetic',
      link: '/arithmetic/sorting-algorithm',
    },
    { text: 'About', link: '/about' },
  ]
}

type Sidebar = DefaultTheme.Config['sidebar']

function sidebar(): Sidebar {
  return {
    '/moments/': [
      {
        collapsed: true,
        base: '/moments/',
        items: [
          { text: '空は高く風は歌う', link: '空は高く風は歌う' },
          { text: '2023 新年快乐！', link: '2023-01-01' },
          { text: '过滤 Chrome Network', link: 'filter-chrome-network' },
        ],
      },
    ],
    '/notes/': [
      {
        text: 'JavaScript',
        collapsed: true,
        base: '/notes/javascript/',
        items: [
          { text: 'ES6 Class 继承模拟', link: 'es6-class-extends-mock' },
          { text: 'call apply bind 模拟', link: 'call-apply-bind-mock' },
          { text: '取消重复请求', link: 'cancel-duplicate-requests' },
          { text: 'local 和 session storage', link: 'local-and-session-storage' },
          { text: 'instanceof 模拟', link: 'instanceof-mock' },
          { text: '位运算符', link: 'bit-operator' },
        ],
      },
      {
        text: 'TypeScript',
        collapsed: true,
        base: '/notes/typescript/',
        items: [{ text: 'Type Challenge', link: 'type-challenge' }],
      },
      {
        text: 'Vue',
        collapsed: true,
        base: '/notes/vue/',
        items: [
          { text: 'Vue2-生命周期基础知识', link: 'vue2-lifecycle-basics' },
          { text: 'Vue2-生命周期源码解析', link: 'vue2-lifecycle-source-code-parsing' },
          { text: 'Vue2-数据观察更新原理', link: 'vue2-data-observer-principle' },
          {
            text: 'Vue3-常用内置指令转 jsx 写法',
            link: 'Vue3-built-in-instructions-transform-jsx',
          },
          { text: 'Vue3-toRefs 源码分析', link: 'vue3-to-refs-source-code-parsing' },
        ],
      },
      {
        text: 'React',
        collapsed: true,
        base: '/notes/react/',
        items: [
          { text: '分析 react-loadable', link: 'analyze-react-loadable' },
          { text: '实现一个 mini redux', link: 'implement-a-mini-redux' },
          {
            text: 'React 18 新 Hook useSyncExternalStore',
            link: 'react-18-useSyncExternalStore-api',
          },
          {
            text: 'React 18 startTransition API',
            link: 'react-18-introduces-startTransition-api',
          },
          {
            text: 'useLayoutEffect 对比 useEffect',
            link: 'useLayoutEffect-vs-useEffect',
          },
        ],
      },
      {
        text: 'Css',
        collapsed: true,
        base: '/notes/css/',
        items: [
          { text: 'CSS 选择器优先级图', link: 'css-selector-priority-diagram' },
          { text: 'Grid 布局教程', link: 'grid-layout-tutorial' },
          { text: 'Flex 布局教程', link: 'flex-layout-tutorial' },
          { text: 'CSS 滚动驱动动画', link: 'css-scroll-driven-animations' },
        ],
      },
      {
        text: 'Linux / Unix',
        collapsed: true,
        base: '/notes/linux/',
        items: [
          { text: '上传文件到 Linux', link: 'upload-files-to-linux' },
          { text: 'htop', link: 'htop' },
          { text: 'vi/vim', link: 'vi-vim' },
        ],
      },
      {
        text: 'Git',
        collapsed: true,
        base: '/notes/git/',
        items: [{ text: 'Git 常用命令', link: 'git-common-commands' }],
      },
      {
        text: 'English',
        collapsed: true,
        base: '/notes/english/',
        items: [{ text: '缩写', link: 'abbreviation' }],
      },
      {
        text: 'Algolia',
        collapsed: true,
        base: '/notes/algolia/',
        items: [
          {
            text: '配置 Vitepress 的 Algolia 搜索',
            link: 'config-vitepress-algolia-search',
          },
        ],
      },
    ],
    '/tools/': [{ text: '过滤 JD Cookie', base: '/tools/', link: 'filter-jd-cookie' }],
    '/arithmetic/': [
      { text: '排序算法', base: '/arithmetic/', link: 'sorting-algorithm' },
      {
        text: 'Leetcode',
        base: '/arithmetic/leetcode/',
        items: [{ text: '第 679 题，数组的度', link: '679-degree-of-an-array' }],
      },
    ],
  }
}
