# AST: 转换 Await

这里，我们自己来实现一个 `Bebel` 插件，来转换 `Await` 使其捕获异常。

<embed src="https://cdn.jsdelivr.net/gh/zhixiangyao/CDN/images/icon/babel.svg" type="image/svg+xml" />

主要是利用 [@babel/core](https://www.npmjs.com/package/@babel/core) 库的 `transform` 方法，还有 [@babel/types](https://www.npmjs.com/package/@babel/types) 库的 `identifier`, `blockStatement`, `catchClause`, `tryStatement`

### 工具介绍

- **@babel/core**

  - `transform` 方法会帮我们自动遍历，在第二个参数中的 **[plugins](https://babeljs.io/docs/en/plugins/)** 参数，可以使用相应的预设或者插件来转换相应的代码

- **@babel/types**

  - `identifier` 声明一个 `xxx` 的 **AST**
  - `blockStatement` 声明一个 `{ xxxx }` 的 **AST** (不是对象，是代码块)
  - `catchClause` 声明一个 `catch (xxx) { xxx }` 的 **AST**
  - `tryStatement` 声明一个 `try { xxx } catch (xxx) { xxx }` 的 **AST**

* 在线 **[AST Explorer](https://astexplorer.net/)** 工具

### 转化对比

::: code-group

```ts [tab 转化前]
async function func() {
  await asyncFn()
}
```

```ts [tab 转化后]
async function func() {
  try {
    await asyncFn()
  } catch (e) {
    console.log(e)
  }
}
```

:::

- 本文转换前的 [AST 代码](https://astexplorer.net/#/gist/ba041633885e3952123b8cb4e13d909f/f57859241199f04e7e74c24fcd7e95b7e746c6d1)
- 本文转换后的 [AST 代码](https://astexplorer.net/#/gist/ba041633885e3952123b8cb4e13d909f/0d1f95a45b3cd849e40239e382ad8c3e6d837768)

### 代码

- [Github 源码](https://github.com/zhixiangyao/typescript-playground/blob/27800ff78097af7aafea4f513508b403b0de8fb3/src/transform/transformAsyncAwait.ts#L9C9-L9C9)

```ts
import { identifier, blockStatement, catchClause, tryStatement } from '@babel/types'
import { transform } from '@babel/core'
import { parse } from '@babel/parser'
import { default as chalk } from 'chalk'
import { log } from '@common/index'

import { FunctionDeclaration } from '@babel/types'
import { PluginItem, BabelFileResult, NodePath } from '@babel/core'

const transformAsyncAwaitPlugin = (): PluginItem => {
  return {
    visitor: {
      FunctionDeclaration(path: NodePath<FunctionDeclaration>) {
        // Node: async function func() { await asyncFn(); }
        const { node } = path
        // Edentifier: e
        const catchParam = identifier('e')
        // BlockStatement: console.log(e);
        const catchBlock = blockStatement([parse('console.log(e);').program.body[0]])
        // CatchClause: catch (e) { console.log(e); }
        const catchHandler = catchClause(catchParam, catchBlock)
        const tryCatchBlock = tryStatement(node.body, catchHandler)
        path.replaceWith(tryCatchBlock)
      },
    },
  }
}

/**
 * try/catch an exception for async/await
 *
 * @param code async function func() { await asyncFn(); }
 * @returns async function func() { try { await asyncFn(); } catch(e) { console.log(e); } }
 */
const transformAsyncAwait = (
  code = `async function func() { await asyncFn();}`,
): string | null | undefined => {
  log(chalk.green.bold('old =>'))
  log(code)

  const data: BabelFileResult | null = transform(code, {
    plugins: [transformAsyncAwaitPlugin()],
  })

  /**
   * 转换后
   * async function func() {
   *   try {
   *     await asyncFn();
   *   } catch (e) {
   *     console.log(e);
   *   }
   * }
   */
  log(chalk.red.bold('New =>'))
  log(data?.code)

  return data?.code
}

export default transformAsyncAwait
export { transformAsyncAwaitPlugin }
```
