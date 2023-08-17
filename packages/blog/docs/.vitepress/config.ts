import { defineConfig, type DefaultTheme } from 'vitepress'

export default defineConfig({
  lang: 'zh',
  title: 'Blog',
  description: 'Personal Blog',
  lastUpdated: true,
  outDir: '../dist',
  cacheDir: './.vitepress/.vite',

  themeConfig: {
    siteTitle: 'Zhixiang Yao',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhixiangyao' },
      { icon: 'twitter', link: 'https://twitter.com/yaozhixiang' },
    ],
    nav: nav(),
    sidebar: sidebar(),
    footer: {
      copyright: '2019-present Zhixiang Yao',
    },
    algolia: {
      appId: 'DM7KLUW505',
      apiKey: '74549704763205291f0582f7786cf183',
      indexName: 'vitepress_blog',
    },
  },
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
      text: 'Tips',
      link: '/tips/filter-jd-cookie',
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
        items: [
          { text: '空は高く風は歌う', link: '/moments/空は高く風は歌う' },
          { text: '2023 新年快乐！', link: '/moments/2023-01-01' },
          { text: '过滤 Chrome Network', link: '/moments/filter-chrome-network' },
        ],
      },
    ],
    '/notes/': [
      {
        text: 'JavaScript',
        collapsed: true,
        items: [
          { text: 'ES6 Class 继承模拟', link: '/notes/javascript/es6-class-extends-mock' },
          { text: 'call apply bind 模拟', link: '/notes/javascript/call-apply-bind-mock' },
          { text: '取消重复请求', link: '/notes/javascript/cancel-duplicate-requests' },
          { text: 'local 和 session storage', link: '/notes/javascript/local-and-session-storage' },
        ],
      },
      {
        text: 'TypeScript',
        collapsed: true,
        items: [{ text: 'Type Challenge', link: '/notes/typescript/type-challenge' }],
      },
      {
        text: 'Vue',
        collapsed: true,
        items: [
          { text: 'Vue2-生命周期基础知识', link: '/notes/vue/vue2-lifecycle-basics' },
          { text: 'Vue2-生命周期源码解析', link: '/notes/vue/vue2-lifecycle-source-code-parsing' },
          { text: 'Vue2-数据观察更新原理', link: '/notes/vue/vue2-data-observer-principle' },
          {
            text: 'Vue3-常用内置指令转 jsx 写法',
            link: '/notes/vue/Vue3-built-in-instructions-transform-jsx',
          },
          { text: 'Vue3-toRefs 源码分析', link: '/notes/vue/vue3-to-refs-source-code-parsing' },
        ],
      },
      {
        text: 'React',
        collapsed: true,
        items: [
          { text: '分析 react-loadable', link: '/notes/react/analyze-react-loadable' },
          { text: '实现一个 mini redux', link: '/notes/react/Implement-a-mini-redux' },
        ],
      },
      {
        text: 'Css',
        collapsed: true,
        items: [
          { text: 'CSS 选择器优先级图', link: '/notes/css/css-selector-priority-diagram' },
          { text: 'Grid 布局教程', link: '/notes/css/grid-layout-tutorial' },
          { text: 'Flex 布局教程', link: '/notes/css/flex-layout-tutorial' },
          { text: 'CSS 滚动驱动动画', link: '/notes/css/css-scroll-driven-animations' },
        ],
      },
      {
        text: 'Linux / Unix',
        collapsed: true,
        items: [
          { text: '上传文件到 Linux', link: '/notes/linux/upload-files-to-linux' },
          { text: 'htop', link: '/notes/linux/htop' },
          { text: 'vi/vim', link: '/notes/linux/vi-vim' },
        ],
      },
      {
        text: 'Git',
        collapsed: true,
        items: [{ text: 'Git 常用命令', link: '/notes/git/git-common-commands' }],
      },
      {
        text: 'English',
        collapsed: true,
        items: [{ text: '缩写', link: '/notes/english/abbreviation' }],
      },
      {
        text: 'Algolia',
        collapsed: true,
        items: [
          {
            text: '配置 Vitepress 的 Algolia 搜索',
            link: '/notes/algolia/config-vitepress-algolia-search',
          },
        ],
      },
    ],
    '/tips/': [
      {
        text: 'Tools',
        collapsed: true,
        items: [{ text: '过滤 JD Cookie', link: '/tips/filter-jd-cookie' }],
      },
    ],
  }
}
