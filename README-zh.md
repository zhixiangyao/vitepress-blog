# Vitepress Blog

[English](./README.md) · 中文

这是一个基于 `docs/` 目录构建的个人 VitePress 博客。

- 预览地址: https://blog.yaozhixiang.top
- GitHub Pages: https://zhixiangyao.github.io/

## 准备工作

- **编辑器:**
  - [VS Code](https://code.visualstudio.com/)

- **VSCode 扩展:**
  - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## 克隆

```bash
git clone https://github.com/zhixiangyao/vitepress-blog.git
cd vitepress-blog
```

## 安装

```bash
# 如果本机还没有 pnpm，可以先安装
npm install --global pnpm

# 安装依赖
pnpm install
```

## 使用

### 开发

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

### 预览

```bash
pnpm preview
```

### 类型检查

```bash
pnpm typecheck
```

## 项目结构

- `docs/` 存放所有博客内容和页面。
- `docs/.vitepress/` 存放 VitePress 配置、导航、侧边栏和自定义主题。
- `docs/.vitepress/theme/` 存放本地主题组件，例如 `BlogList`、`FriendLinks`、`Rain` 和 `ZoomImg`。
- `public/` 存放 favicon、背景图等静态资源。

## 工作说明

- 这个仓库是一个单体 VitePress 博客，项目根目录就是仓库根目录。
- `pnpm dev`、`pnpm build`、`pnpm preview` 和 `pnpm typecheck` 都直接在仓库根目录执行。
- 构建脚本会先执行类型检查，再生成静态站点。