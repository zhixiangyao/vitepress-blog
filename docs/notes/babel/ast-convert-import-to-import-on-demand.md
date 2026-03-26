# AST: 转换 Import 实现按需导入

这里，我们自己来实现一个 `Bebel` 插件，来转换 `import` 实现按需导入。

<embed src="https://cdn.jsdelivr.net/gh/zhixiangyao/CDN/images/icon/babel.svg" type="image/svg+xml" />

主要是利用 [@babel/core](https://www.npmjs.com/package/@babel/core) 库的 `transform` 方法，还有 [@babel/types](https://www.npmjs.com/package/@babel/types) 库的 `isImportSpecifier`, `stringLiteral`, `importDefaultSpecifier`, `importDeclaration`

### 工具介绍

- **@babel/core**

  - `transform` 方法会帮我们自动遍历，在第二个参数中的 **[plugins](https://babeljs.io/docs/en/plugins/)** 参数，可以使用相应的预设或者插件来转换相应的代码

- **@babel/types**

  - `isImportSpecifier` 判断是不是 import 说明符（如果是 default 的不算）
  - `stringLiteral` 声明一个 `'xxx'` 的 **AST**
  - `importDefaultSpecifier` 声明一个 `xxx` 的 **AST**
  - `importDeclaration` 声明一个 `import { xxx } from 'xxx';` 的 **AST**

* 在线 **[AST Explorer](https://astexplorer.net/)** 工具

### 转化对比

::: code-group

```ts [tab 转化前]
import { Button } from 'vant'
import { Icon, View } from 'vant'
import vant, { List } from 'vant'
import Vue from 'vue'
import _Vue from 'vue'
import { post } from 'axios'
```

```ts [tab 转化后]
import Button from 'vant/lib/Button'
import Icon from 'vant/lib/Icon'
import View from 'vant/lib/View'
import vant from 'vant'
import List from 'vant/lib/List'
import Vue from 'vue'
import _Vue from 'vue'
import post from 'axios/lib/post'
```

:::

- 本文转换前 `import { Icon, View } from 'vant';` 的 [AST 代码](https://astexplorer.net/#/gist/36aaec9e411568d451d7c0242c8bb8c2/3a49f58d998eb37921dfa95caa24e0345a6a9dfc)
- 本文转换后 `import { Icon } from 'vant/lib/Button';` `import { View } from 'vant/lib/Icon';` [AST 代码](https://astexplorer.net/#/gist/36aaec9e411568d451d7c0242c8bb8c2/ec470a3d473a379d4e4f1177c226d5aa40e57091)

### 代码

- [Github 源码](https://github.com/zhixiangyao/typescript-playground/blob/27800ff78097af7aafea4f513508b403b0de8fb3/src/transform/transformImport.ts#L13)

```ts
import {
  isImportSpecifier,
  stringLiteral,
  importDefaultSpecifier,
  importDeclaration,
} from '@babel/types'
import { transform } from '@babel/core'
import { default as chalk } from 'chalk'
import { log } from '@common/index'

import { PluginItem, BabelFileResult, NodePath } from '@babel/core'
import { ImportDeclaration } from '@babel/types'

interface TransformImportPathPluginOptions {
  libraryName?: string
  libraryDirectory: string
}

const transformImportPlugin = (opt: TransformImportPathPluginOptions): PluginItem => {
  const { libraryName, libraryDirectory } = opt

  return {
    visitor: {
      ImportDeclaration(path: NodePath<ImportDeclaration>) {
        const { node } = path //      节点: import { Button, Icon } from 'vant'
        const { specifiers, source } = node

        // import 有 2 种，一种是 specifier 一种是 default specifier
        // 这里要排除掉 library 名不匹配，且非唯一 default import 导入（这里利用 default 只能在头部的特性，判断尾部就可以了）
        if (source.value === libraryName && isImportSpecifier(specifiers[specifiers.length - 1])) {
          const result = specifiers.map((specifier) => {
            let newSource = undefined
            if (isImportSpecifier(specifier)) {
              newSource = stringLiteral(
                `${source.value}/${libraryDirectory}/${specifier.local.name}`,
              )
            } else {
              newSource = stringLiteral(source.value)
            }

            return importDeclaration([importDefaultSpecifier(specifier.local)], newSource)
          })

          if (result.length > 1) path.replaceWithMultiple(result)
          else path.replaceWith(result[0])
        }
      },
    },
  }
}

const transformImport = (
  code = `
import { Button } from 'vant';
import { Icon, View } from 'vant';
import vant, { List } from 'vant';
import Vue from 'vue';
import _Vue from 'vue';
import { post } from 'axios';`.trimStart(),
): string | null | undefined => {
  log(chalk.green('old => '))
  log(code)

  const data: BabelFileResult | null = transform(code, {
    plugins: [
      transformImportPlugin({ libraryName: 'vant', libraryDirectory: 'lib' }),
      transformImportPlugin({ libraryName: 'axios', libraryDirectory: 'lib' }),
    ],
  })

  // 转换后
  // import { Button } from 'vant/lib/Button';
  // import { Icon } from 'vant/lib/Icon';
  // import vant from 'vant';
  log(chalk.red('new => '))
  log(data?.code)

  return data?.code
}

export default transformImport
export { transformImportPlugin }

export { TransformImportPathPluginOptions }
```
