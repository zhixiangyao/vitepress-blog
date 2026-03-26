# AST: 转换数组 Spread

这里，我们自己来实现一个 `Bebel` 插件，来转换 **Spread 语法** 用 **ES5** 的 **concat** 实现。

<embed src="https://cdn.jsdelivr.net/gh/zhixiangyao/CDN/images/icon/babel.svg" type="image/svg+xml" />

主要是利用 [@babel/core](https://www.npmjs.com/package/@babel/core) 库的 `transform` 方法，还有 [@babel/types](https://www.npmjs.com/package/@babel/types) 库的 `isArrayExpression`, `arrayExpression`, `memberExpression`, `identifier`, `callExpression`, `variableDeclarator`, `variableDeclaration`

### 工具介绍

- **@babel/core**

  - `transform` 方法会帮我们自动遍历，在第二个参数中的 **[plugins](https://babeljs.io/docs/en/plugins/)** 参数，可以使用相应的预设或者插件来转换相应的代码

- **@babel/types**

  - `isArrayExpression` 判断是不是数组表达式
  - `arrayExpression` 声明一个 `[]` 的 **AST**
  - `identifier` 声明一个 `concat` 的 **AST**
  - `memberExpression` 声明一个 `xxx.xxx` 的 **AST**
  - `callExpression` 声明一个 `xxx(xxx, xxx...)` 的 **AST**
  - `variableDeclarator` 声明一个 `xxx = xxx` 的 **AST**
  - `variableDeclaration` 声明一个 `xxx xxx, xxx, xxx;` 的 **AST**

- 在线 **[AST Explorer](https://astexplorer.net/)** 工具

### 转化对比

::: code-group

```ts [tab 转化前]
const arr = [...arr1, ...arr2]
```

```ts [tab 转化后]
var arr = [].concat(arr1, arr2)
```

:::

- 本文转换前的 [AST 代码](https://astexplorer.net/#/gist/be77a34f3ffb465797959d1a0c2bf863/5d2c433afa1da36e0fe0f0958e7996fa357f1a61)
- 本文转换后的 `var arr = [].concat(arr1, arr2);` [AST 代码](https://astexplorer.net/#/gist/be77a34f3ffb465797959d1a0c2bf863/a26b0420c15f3e6ebd03b9bb1ac37b0b778c503d)

### 代码

- [Github 源码](https://github.com/zhixiangyao/typescript-playground/blob/27800ff78097af7aafea4f513508b403b0de8fb3/src/transform/transformArraySpread.ts#L16)

```ts
import {
  isArrayExpression,
  arrayExpression,
  identifier,
  memberExpression,
  callExpression,
  variableDeclarator,
  variableDeclaration,
} from '@babel/types'
import { transform } from '@babel/core'
import { default as chalk } from 'chalk'
import { log } from '@common/index'

import { VariableDeclaration, SpreadElement } from '@babel/types'
import { PluginItem, BabelFileResult, NodePath } from '@babel/core'

const transformArraySpreadPlugin = (): PluginItem => {
  return {
    visitor: {
      VariableDeclaration(path: NodePath<VariableDeclaration>) {
        const { node } = path //         节点: const arr = [ ...arr1, ...arr2 ];
        const { declarations } = node // declarations: arr = [ ...arr1, ...arr2 ];
        const kind = 'var'

        // 边界判定
        if (
          node.kind !== kind &&
          declarations.length === 1 &&
          isArrayExpression(declarations[0].init)
        ) {
          const args: SpreadElement[] = declarations[0].init.elements.map((item) => {
            const { argument }: any = item
            return argument
          })
          // [].concat()
          const callee = memberExpression(arrayExpression(), identifier('concat'))
          // [].concat(arr1, arr2)
          const init = callExpression(callee, args)
          // arr = [].concat(arr1, arr2)
          const declaration = variableDeclarator(declarations[0].id, init)
          // var arr = [].concat(arr1, arr2)
          const newVariableDeclaration = variableDeclaration(kind, [declaration])
          path.replaceWith(newVariableDeclaration)
        }
      },
    },
  }
}

/**
 * Open the array
 * @param code const arr = [ ...arr1, ...arr2 ];
 * @returns var arr = [].concat(arr1, arr2)
 */
const transformArraySpread = (
  code = `const arr = [ ...arr1, ...arr2 ];`,
): string | null | undefined => {
  log(chalk.green.bold('old =>'))
  log(code)

  const data: BabelFileResult | null = transform(code, {
    plugins: [transformArraySpreadPlugin()],
  })

  // 转换后
  // var arr = [].concat(arr1, arr2)
  log(chalk.red.bold('New =>'))
  log(data?.code)

  return data?.code
}

export default transformArraySpread
export { transformArraySpreadPlugin }
```
