# Vitepress Blog

- Preview: https://blog.yaozhixiang.top & https://zhixiangyao.github.io/

## Preparatory Work

- **Editor:**

  - [VS Code](https://code.visualstudio.com/)

- **VSCode Extension:**

  - `Tailwind CSS IntelliSense`

## Start

```bash
# install pnpm to manage packages
npm install --global pnpm

# install dependencies
cd vitepress-blog
pnpm install

# start blog docs
pnpm dev

# build blog docs
pnpm build

# preview built blog docs
pnpm preview
```

## Workflow Notes

- The repository is a single VitePress blog app rooted at this directory.
- Custom theme components are colocated in `docs/.vitepress/theme`.
- Run `pnpm dev`, `pnpm build`, and `pnpm preview` directly at root.

