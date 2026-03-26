# Vitepress Blog

- Preview: https://blog.yaozhixiang.top & https://zhixiangyao.github.io/

## Preparatory Work

- **Editor:**

  - [VS Code](https://code.visualstudio.com/)

- **VSCode Extension:**

  - `ESLint`
  - `Stylelint`
  - `Tailwind CSS IntelliSense`

- **Development ENV:**

  - node => 24.14.1
  - pnpm => 10.33.0

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

- Root scripts use pnpm workspace filtering (`pnpm --filter blog ...`) to target the blog app.
- Workspace package matching now supports both `packages/**` and `apps/**` for future expansion.
- `apps/blog` uses standard `dev/build/preview` scripts, which aligns better with common monorepo task runners.

