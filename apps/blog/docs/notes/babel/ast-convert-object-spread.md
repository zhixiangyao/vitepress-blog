# AST: 转换对象 Spread

这里，我们自己来实现一个 `Bebel` 插件，来转换 **Spread 语法** 用 **"对象.key"** 实现。

<embed src="https://cdn.jsdelivr.net/gh/zhixiangyao/CDN/images/icon/babel.svg" type="image/svg+xml" />

主要是利用 [@babel/core](https://www.npmjs.com/package/@babel/core) 库的 `transform` 方法，还有 [@babel/types](https://www.npmjs.com/package/@babel/types) 库的 `isObjectPattern`, `identifier`, `memberExpression`, `variableDeclarator`, `variableDeclaration`

### 工具介绍

- **@babel/core**

  - `transform` 方法会帮我们自动遍历，在第二个参数中的 **[plugins](https://babeljs.io/docs/en/plugins/)** 参数，可以使用相应的预设或者插件来转换相应的代码

- **@babel/types**

* `isObjectPattern` 判断是不是 **对象模式**
* `identifier` 声明一个 `xxx` 的 **AST**
* `memberExpression` 声明一个 `xxx.xxx` 的 **AST**
* `variableDeclarator` 声明一个 `xxx = xxx` 的 **AST**
* `variableDeclaration` 声明一个 `var xxx, xxx` 的 **AST**

- 在线 **[AST Explorer](https://astexplorer.net/)** 工具

### 转化对比

::: code-group

```ts [tab 转化前]
const { sex, age, empty, cute } = { sex: 'male', age: 12, cute: 'yes' }
```

```ts [tab 转化后]
var _sex$age$cute = {
    sex: 'male',
    age: 12,
    cute: 'yes',
  },
  sex = _sex$age$cute.sex,
  age = _sex$age$cute.age,
  empty = _sex$age$cute.empty,
  cute = _sex$age$cute.cute
```

:::

- 本文转换前的 [AST 代码](https://astexplorer.net/#/gist/be77a34f3ffb465797959d1a0c2bf863/131460b40a1c063ae7702a6810a6a8804bd59dd8)
- 本文转换后的 [AST 代码](https://astexplorer.net/#/gist/be77a34f3ffb465797959d1a0c2bf863/829ff43e37ae32b9918f3e0347713713dfc5efba)

### 代码

- [Github 源码](https://github.com/zhixiangyao/typescript-playground/blob/27800ff78097af7aafea4f513508b403b0de8fb3/src/transform/transformObjectSpread.ts)

::: code-group

```ts [tab 插件部分]
const transformObjectSpreadPlugin = (): PluginItem => {
  return {
    visitor: {
      VariableDeclaration(path: NodePath<VariableDeclaration>) {
        // 节点: const { sex, age, empty, cute } = { sex: 'male', age: 12, cute: 'yes' };
        const { node } = path
        // declarations:{ sex, age, empty, cute } = { sex: 'male', age: 12, cute: 'yes' };
        const { declarations } = node

        for (const declaration of declarations) {
          // 边界判定 判断是不是 "对象模式"
          if (isObjectPattern(declaration.id)) {
            // 左边的对象 { sex, age, empty, cute }
            const leftObjects: ObjectPattern = declaration.id
            // key 值数组集合 [ 'sex', 'age', 'empty', 'cute' ]
            const leftKeys = leftObjects.properties.map((property: any) => {
              const key: Identifier = property.key
              return key.name
            })
            const init: ObjectExpression | any = declaration.init
            // 右边的对象 { sex: 'male', age: 12, cute: 'yes' };
            const rightObjects: ObjectProperty[] = init.properties
            // key 值数组集合 [ 'sex', 'age', 'cute' ]
            const rightKeys = rightObjects.map((property: any) => {
              const key: Identifier = property.key
              return key.name
            })

            // 抽出来的对象名 _sex$age$cute
            const cornerstone: Identifier = identifier(
              leftKeys.reduce((acc, key, i) => {
                if (rightKeys.includes(key)) acc += key + (i <= rightKeys.length - 1 ? '$' : '')
                return acc
              }, '_'),
            )

            const arr: VariableDeclarator[] = []

            /**
             * _sex$age$cute = {
             *   sex: 'male',
             *   age: 12,
             *   cute: 'yes'
             * }
             */
            arr.push(variableDeclarator(cornerstone, init))

            /**
             * sex = _sex$age$cute.sex,
             * age = _sex$age$cute.age,
             * empty = _sex$age$cute.empty,
             * cute = _sex$age$cute.cute;
             */
            leftKeys.forEach((key) => {
              // sex
              const iden = identifier(key)
              // sex = _sex$age$cute.sex,
              arr.push(variableDeclarator(iden, memberExpression(cornerstone, iden)))
            })

            path.replaceWith(variableDeclaration('var', arr))
          }
        }
      },
    },
  }
}
```

```ts [tab 执行主体]
import { transform } from '@babel/core'
import {
  isObjectPattern,
  identifier,
  memberExpression,
  variableDeclarator,
  variableDeclaration,
} from '@babel/types'
import { default as chalk } from 'chalk'
import { log } from '@common/index'

import {
  VariableDeclaration,
  ObjectExpression,
  ObjectPattern,
  ObjectProperty,
  Identifier,
  VariableDeclarator,
} from '@babel/types'
import { PluginItem, BabelFileResult, NodePath } from '@babel/core'

/**
 * Spread the Object
 * @param code const { sex, age, empty, cute } = { sex: 'male', age: 12, cute: 'yes' };
 * @returns
 * var _sex$age$cute = {
 *     sex: "male",
 *     age: 12,
 *     cute: "yes"
 *   },
 *   sex = _sex$age$cute.sex,
 *   age = _sex$age$cute.age,
 *   empty = _sex$age$cute.empty,
 *   cute = _sex$age$cute.cute;
 */
const transformObjectSpread = (
  code = `const { sex, age, empty, cute } = { sex: 'male', age: 12, cute: 'yes' };`,
): string | null | undefined => {
  console.time()
  log(chalk.green.bold('old =>'))
  log(code)

  const data: BabelFileResult | null = transform(code, {
    plugins: [transformObjectSpreadPlugin()],
  })

  /**
   * 转换后
   * var _sex$age$cute = {
   *     sex: "male",
   *     age: 12,
   *     cute: "yes"
   *   },
   *   sex = _sex$age$cute.sex,
   *   age = _sex$age$cute.age,
   *   empty = _sex$age$cute.empty,
   *   cute = _sex$age$cute.cute;
   */
  log(chalk.red.bold('New =>'))
  log(data?.code)
  console.timeEnd()

  return data?.code
}

export default transformObjectSpread
export { transformObjectSpreadPlugin }
```

:::
