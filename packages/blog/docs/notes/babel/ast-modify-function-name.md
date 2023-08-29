# AST: 修改 function 名

这里，我们自己来实现一个`Bebel` 插件，来修改 `function` 名。

<embed src="https://cdn.jsdelivr.net/gh/zhixiangyao/CDN/images/icon/babel.svg" type="image/svg+xml" />

主要是利用 [Esprima](https://www.npmjs.com/package/esprima)、[Estraverse](https://www.npmjs.com/package/estraverse)、[Escodegen](https://www.npmjs.com/package/escodegen) 把 `function` 转化为 `AST`，再修改其方法名

### 工具介绍

- `esprima.parseScript` 解析代码，转化为 `AST`
- `estraverse.traverse` 遍历 `AST` 在其配置的 `enter` 钩子中修改 `AST`
- `escodegen.generate` 根据 `AST` 生成代码（和 `esprima.parseScript` 相反）

### 代码

- [Github 源码](https://github.com/zhixiangyao/typescript-playground/blob/27800ff78097af7aafea4f513508b403b0de8fb3/src/transform/transformFnName.ts)

```ts
import { parseScript } from 'esprima'
import { traverse } from 'estraverse'
import { generate } from 'escodegen'
import { Program, Node } from 'estree' // 类型提示
import { default as chalk } from 'chalk'
import { log } from '@common/index' // console.log

/**
 * 使用 esprima 库的 parseScript 方法
 * 把 code 转换成 AST（抽象代码树 Abstract Ayntax Tree）
 * 然后在 enter 钩子里修改 funciton 名
 */
const transformFnName = (code = `function getUser() {}`): string | null | undefined => {
  const AST: Program = parseScript(code)

  log(chalk.green.bold('Old =>'))
  log(code)

  traverse(AST, {
    enter(node: Node): void {
      log(chalk.red(`enter => node.type: ${node.type}`))

      // 修改 Identifier，也就是 方法名
      if (node.type === 'Identifier') node.name = 'getBroker'
    },
    leave(node: Node): void {
      log(chalk.blue(`leave => node.type: ${node.type}`))
    },
  })
  const newCode = generate(AST)

  // function getBroker() {}
  log(chalk.green.bold('New =>'))
  log(newCode)

  return newCode
}

export default transformFnName
```

### 参考

- `Esprima` 是用 `ECMAScript` 编写的高性能，符合标准的 `ECMAScript` 解析器。 `Esprima` 由 [Ariya Hidayat](https://www.npmjs.com/~ariya) 在许多贡献者的帮助下创建和维护。

- `Estraverse` 是 [esmangle project](https://github.com/estools/esmangle) 项目中的 `ECMAScript` 遍历函数库（PS: 真的没事要多造工具 haha）。

- `Escodegen` 是 `Mozilla` 的 Parser API 的 `ECMAScript` 代码生成器。请参阅[在线生成器](https://estools.github.io/escodegen/demo/index.html)以获取演示。
