import { type DefaultTheme } from 'vitepress'

type Sidebar = DefaultTheme.Config['sidebar']

export const sidebar = () => {
  return {
    '/moments/': [
      { text: '空は高く風は歌う', base: '/moments/', link: '空は高く風は歌う' },
      { text: '2023 新年快乐！', base: '/moments/', link: '2023-01-01' },
      { text: '过滤 Chrome Network', base: '/moments/', link: 'filter-chrome-network' },
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
  } satisfies Sidebar
}