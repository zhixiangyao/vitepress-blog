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
        items: [{ text: '空は高く風は歌う', link: '/moments/空は高く風は歌う' }],
      },
    ],
    '/notes/': [
      {
        text: 'JavaScript',
        collapsible: true,
        collapsed: true,
        items: [
          { text: 'ES6 Class 继承模拟', link: '/notes/javascript/es6-class-extends-mock' },
          { text: 'call apply bind 模拟', link: '/notes/javascript/call-apply-bind-mock' },
          { text: '取消重复请求', link: '/notes/javascript/cancel-duplicate-requests' },
        ],
      },
      {
        text: 'TypeScript',
        collapsible: true,
        collapsed: true,
        items: [{ text: 'Type Challenge', link: '/notes/typescript/type-challenge' }],
      },
      {
        text: 'Vue',
        collapsible: true,
        collapsed: true,
        items: [{ text: 'Vue2-生命周期基础知识', link: '/notes/vue/vue2-lifecycle-basics' }],
      },
      {
        text: 'React',
        collapsible: true,
        collapsed: true,
        items: [{ text: '分析 react-loadable', link: '/notes/react/analyze-react-loadable' }],
      },
      {
        text: 'Css',
        collapsible: true,
        collapsed: true,
        items: [
          { text: 'CSS 选择器优先级图', link: '/notes/css/css-selector-priority-diagram' },
          { text: 'Grid 布局教程', link: '/notes/css/grid-layout-tutorial' },
          { text: 'Flex 布局教程', link: '/notes/css/flex-layout-tutorial' },
        ],
      },
      {
        text: 'Linux',
        collapsible: true,
        collapsed: true,
        items: [{ text: '上传文件到 Linux', link: '/notes/linux/upload-files-to-linux' }],
      },
      {
        text: 'Git',
        collapsible: true,
        collapsed: true,
        items: [{ text: 'Git 常用命令', link: '/notes/git/git-common-commands' }],
      },
      {
        text: 'Algolia',
        collapsible: true,
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
        collapsible: true,
        collapsed: true,
        items: [{ text: '过滤 JD Cookie', link: '/tips/filter-jd-cookie' }],
      },
    ],
  }
}
