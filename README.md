# Vitepress Blog

English · [中文](./README-zh.md)

A personal VitePress blog built from the `docs/` directory.

- Preview: https://blog.yaozhixiang.top
- GitHub Pages: https://zhixiangyao.github.io/

## Preparatory Work

- **Editor:**
  - [VS Code](https://code.visualstudio.com/)

- **VSCode Extension:**
  - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## Clone

```bash
git clone https://github.com/zhixiangyao/vitepress-blog.git
cd vitepress-blog
```

## Install

```bash
# install pnpm if needed
npm install --global pnpm

# install dependencies
pnpm install
```

## Usage

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Preview

```bash
pnpm preview
```

### Type Check

```bash
pnpm typecheck
```

## Project Structure

- `docs/` contains all blog content and pages.
- `docs/.vitepress/` contains VitePress configuration, navigation, sidebar, and the custom theme.
- `docs/.vitepress/theme/` contains local theme components such as `BlogList`, `FriendLinks`, `Rain`, and `ZoomImg`.
- `public/` contains static assets such as favicons and background images.

## Workflow Notes

- This repository is a single VitePress blog app rooted at the repository root.
- Run `pnpm dev`, `pnpm build`, `pnpm preview`, and `pnpm typecheck` directly at the root.
- The build script runs type checking before generating the static site.

