import { defineConfig, type DefaultTheme } from 'vitepress'

export default defineConfig({
  title: 'Blog',
  description: 'Personal Blog',

  lastUpdated: true,

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
      link: '/notes/typescript/type-challenge',
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
        text: 'TypeScript',
        collapsible: true,
        items: [{ text: 'Type Challenge', link: '/notes/typescript/type-challenge' }],
      },
      {
        text: 'Linux',
        collapsible: true,
        items: [{ text: '上传文件到 Linux', link: '/notes/linux/upload-files-to-linux' }],
      },
      {
        text: 'Git',
        collapsible: true,
        items: [{ text: 'Git 常用命令', link: '/notes/git/git-common-commands' }],
      },
    ],
    '/tips/': [
      {
        text: 'Tools',
        collapsible: true,
        items: [{ text: '过滤 JD Cookie', link: '/tips/filter-jd-cookie' }],
      },
    ],
  }
}
