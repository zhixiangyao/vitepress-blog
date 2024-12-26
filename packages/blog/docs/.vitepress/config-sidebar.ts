import type { DefaultTheme } from 'vitepress'

type Sidebar = DefaultTheme.Config['sidebar']

export function sidebar() {
  return {
    '/moments/': [
      { text: '2024 🎄 圣诞快乐！', base: '/moments/', link: '2024-12-25' },
      { text: '过滤 Chrome Network', base: '/moments/', link: 'filter-chrome-network' },
      { text: '2023 新年快乐！', base: '/moments/', link: '2023-01-01' },
      { text: '空は高く風は歌う', base: '/moments/', link: '空は高く風は歌う' },
    ],
    '/notes/': [
      {
        text: 'TypeScript',
        collapsed: true,
        base: '/notes/typescript/',
        items: [
          { text: '协变 & 逆变 & 不变', link: 'covariant-contravariant-invariant' },
          { text: 'Type Challenge', link: 'type-challenge' },
          { text: 'TS 装饰器产物分析', link: 'ts-decorator-product-analysis' },
          { text: 'type 对比 interface', link: 'type-vs-interface' },
          { text: 'IoC 和 DI', link: 'ioc-and-di' },
          { text: '解释类型工具 IfEquals', link: 'Interpretation-type-tool-isequals' },
        ],
      },
      {
        text: 'JavaScript',
        collapsed: true,
        base: '/notes/javascript/',
        items: [
          { text: 'ES6 Class 继承模拟', link: 'es6-class-extends-mock' },
          { text: 'call apply bind 模拟', link: 'call-apply-bind-mock' },
          { text: '取消重复请求', link: 'cancel-duplicate-requests' },
          { text: '限制并发请求数', link: 'limit-concurrent-request' },
          {
            text: '使用 generator 函数模拟 await',
            link: 'use-the-generator-func-to-simulate-await',
          },
          { text: 'local 和 session storage', link: 'local-and-session-storage' },
          { text: 'instanceof 模拟', link: 'instanceof-mock' },
          { text: '位运算符', link: 'bit-operator' },
          { text: '函数防抖', link: 'debounce' },
          { text: '函数柯里化', link: 'currying' },
          { text: 'JS 中的闭包是什么', link: 'what-is-the-closure-in-js' },
          { text: '标记语句', link: 'labeled-statement' },
        ],
      },
      {
        text: 'HTTP TCP IP',
        collapsed: true,
        base: '/notes/http-tcp-ip/',
        items: [{ text: 'HTTP 的 Server Send Event', link: 'http-server-send-event' }],
      },
      {
        text: 'Babel',
        collapsed: true,
        base: '/notes/babel/',
        items: [
          { text: 'class 是如何被 babel 转译', link: 'class-translated-by-babel' },
          { text: 'AST: 修改 function 名', link: 'ast-modify-function-name' },
          { text: 'AST: 转换箭头函数', link: 'ast-convert-arrow-function' },
          { text: 'AST: 转换 Import 实现按需导入', link: 'ast-convert-import-to-import-on-demand' },
          { text: 'AST: 转换 Await', link: 'ast-convert-await' },
          { text: 'AST: 转换数组 Spread', link: 'ast-convert-array-spread' },
          { text: 'AST: 转换对象 Spread', link: 'ast-convert-object-spread' },
        ],
      },
      {
        text: 'Webpack',
        collapsed: true,
        base: '/notes/webpack/',
        items: [
          { text: 'Commonjs 模块原理', link: 'commonjs-module-principle' },
          { text: 'ES Module 模块原理', link: 'esm-module-principle' },
          { text: 'ES Module 静态分析', link: 'esm-static-analysis' },
        ],
      },
      {
        text: 'Vue',
        collapsed: true,
        base: '/notes/vue/',
        items: [
          { text: 'Vue2 生命周期基础知识', link: 'vue2-lifecycle-basics' },
          { text: 'Vue3 生命周期基础知识', link: 'vue3-lifecycle-basics' },
          { text: 'Vue2 生命周期源码解析', link: 'vue2-lifecycle-source-code-parsing' },
          { text: 'Vue2 数据观察更新原理', link: 'vue2-data-observer-principle' },
          {
            text: 'Vue3 常用内置指令转 jsx 写法',
            link: 'vue3-built-in-instructions-transform-jsx',
          },
          { text: 'Vue3 toRefs 源码分析', link: 'vue3-to-refs-source-code-parsing' },
          { text: 'Vue3 中 v-model 的背后逻辑', link: 'vue3-tsx-vmodel' },
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
          {
            text: '禁用 @monaco-editor/react 的右键菜单',
            link: 'disable-monaco-context-menu',
          },
          {
            text: 'React Fiber 的概念与工作原理',
            link: 'introduces-fiber-concept',
          },
        ],
      },
      {
        text: 'CSS',
        collapsed: true,
        base: '/notes/css/',
        items: [
          { text: 'CSS 选择器优先级图', link: 'css-selector-priority-diagram' },
          { text: 'Grid 布局教程', link: 'grid-layout-tutorial' },
          { text: 'Flex 布局教程', link: 'flex-layout-tutorial' },
          { text: 'CSS 滚动驱动动画', link: 'css-scroll-driven-animations' },
          { text: 'CSS prefers-color-scheme 媒体特性', link: 'css-prefers-color-scheme' },
          { text: 'CSS at-rule 特性检测', link: 'css-at-rule-feature-detection' },
          { text: ':is 伪类', link: 'is-pseudo-class' },
        ],
      },
      {
        text: 'Linux / Unix',
        collapsed: true,
        base: '/notes/linux/',
        items: [
          { text: '上传文件到 Linux', link: 'upload-files-to-linux' },
          { text: 'wc', link: 'wc' },
          { text: 'grep', link: 'grep' },
          { text: 'htop', link: 'htop' },
          { text: 'vi/vim', link: 'vi-vim' },
          { text: '文件链接方式', link: 'file-link-methods' },
          { text: '检查磁盘扇区状态', link: 'check-disk-sectors-status' },
          { text: '常见 Terminal 快捷键', link: 'common-terminal-shortcuts' },
        ],
      },
      {
        text: 'macOS',
        collapsed: true,
        base: '/notes/macos/',
        items: [
          {
            text: '在 macOS 中从后台列表中删除已删除的应用程序',
            link: 'remove-deleted-apps-from-the-background-list',
          },
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
        items: [
          { text: '缩写', link: 'abbreviation' },
          { text: '人称代词总结', link: 'personal-pronouns-summary' },
        ],
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
      {
        text: 'Other',
        collapsed: true,
        base: '/notes/other/',
        items: [
          {
            text: '符号 ^',
            link: 'symbol-caret',
          },
          {
            text: '什么是 URL、URI 和 URN?',
            link: 'url-urn-uri',
          },
        ],
      },
    ],
    '/tools/': [
      { text: '过滤 JD Cookie', base: '/tools/', link: 'filter-jd-cookie' },
      { text: 'Base64', base: '/tools/', link: 'base64' },
    ],
    '/arithmetic/': [
      { text: '排序算法', base: '/arithmetic/', link: 'sorting-algorithm' },
      { text: '单向链表交换节点', base: '/arithmetic/', link: 'one-way-linked-list-exchange-node' },
      {
        text: 'Leetcode',
        base: '/arithmetic/leetcode/',
        items: [
          { text: '第679题-数组的度', link: '679-degree-of-an-array' },
          { text: '第1题-两数之和', link: '1-two-sum' },
        ],
      },
    ],
  } satisfies Sidebar
}
