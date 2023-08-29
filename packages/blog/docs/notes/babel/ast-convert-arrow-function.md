# AST:转换箭头函数

这里，我们自己来实现一个`Bebel` 插件，来转换 **箭头函数** 为 **普通函数** 。

<embed src="https://cdn.jsdelivr.net/gh/zhixiangyao/CDN/images/icon/babel.svg" type="image/svg+xml" />

主要是利用 [@babel/core](https://www.npmjs.com/package/@babel/core) 库的 `transform` 方法，还有 [@babel/types](https://www.npmjs.com/package/@babel/types) 库的 `returnStatement`, `blockStatement`, `functionExpression`

### 工具介绍

- **@babel/core**

  - `transform` 方法会帮我们自动遍历，在第二个参数中的 **[plugins](https://babeljs.io/docs/en/plugins/)** 参数，可以使用相应的预设或者插件来转换相应的代码

- **@babel/types**

  - `returnStatement` 声明一个 `"return xxx"` 的 **AST**
  - `blockStatement` 声明一个 `"{ xxx }"` 的 **AST**
  - `functionExpression` 声明一个 `"function xxx"` 的 **AST**

- 在线 **[AST Explorer](https://astexplorer.net/)** 工具

### 转化对比

::: code-group

```TypeScript [tab 转化前]
const fn = (a, b) => a + b;
```

```TypeScript [tab 转化后]
const fn = function(a, b) { return a + b }
```

:::

- 本文转换前 `const fn = (a, b) => a + b;` 的 [AST 代码](https://astexplorer.net/#/gist/efc9d5e11a87d2ed8f9bd93814796101/f7267777b3b5da0bab96582a94347222b25d55b2)
- 本文转换后 `const fn = function(a, b) { return a + b }` [AST 代码](https://astexplorer.net/#/gist/efc9d5e11a87d2ed8f9bd93814796101/7867a017573263e23a27018ea8402025c9ff8d21)

### 代码

- [Github 源码](https://github.com/zhixiangyao/typescript-playground/blob/27800ff78097af7aafea4f513508b403b0de8fb3/src/transform/transformArrowFn.ts#L8C7-L8C20)

```TypeScript
import { returnStatement, blockStatement, functionExpression } from '@babel/types'
import { transform } from '@babel/core'
import { default as chalk } from 'chalk'
import { log } from '@common/index'

import { PluginItem, NodePath, BabelFileResult } from '@babel/core'
import { ArrowFunctionExpression } from '@babel/types'

const arrowFnPlugin = (): PluginItem => {
  return {
    visitor: {
      // 当访问到某个路径的时候进行匹配
      ArrowFunctionExpression(path: NodePath<ArrowFunctionExpression>) {
        const { node } = path //      节点 node: (a, b) => a + b
        const { params } = node //    函数的参数
        const { body }: any = node // 二进制表达式: a + b

        // * returnStatement: return a + b
        const newReturnStatement = returnStatement(body)

        // * blockStatement: { return a + b }
        const newBlockStatement = blockStatement([newReturnStatement])

        // * functionExpression: function(a, b) { return a + b }
        const newFunctionExpression = functionExpression(null, params, newBlockStatement)

        path.replaceWith(newFunctionExpression)
      },
    },
  }
}

const transformArrowFn = (code = `const fn = (a, b) => a + b;`): string | null | undefined => {
  log(chalk.green('old => '))
  log(code)

  const data: BabelFileResult | null = transform(code, {
    plugins: [arrowFnPlugin()],
  })

  // 转换后 const fn = function(a, b) { return a + b }
  log(chalk.red('new => '))
  log(data?.code)

  return data?.code
}

export default transformArrowFn
export { arrowFnPlugin }
```
