import { defineConfig, type DefaultTheme } from 'vitepress'

export default defineConfig({
  lang: 'zh',
  title: 'Blog',
  description: 'Personal Blog',

  lastUpdated: true,
  outDir: '../dist',

  themeConfig: {
    siteTitle: 'Zhixiang Yao',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhixiangyao' },
      { icon: 'twitter', link: 'https://twitter.com/yaozhixiang' },
    ],
    nav: nav(),
    sidebar: sidebar(),
  },
})

type Nav = DefaultTheme.Config['nav']

function nav(): Nav {
  return [
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
        text: 'React',
        collapsible: true,
        collapsed: true,
        items: [{ text: '分析 react-loadable', link: '/notes/react/analyze-react-loadable' }],
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
