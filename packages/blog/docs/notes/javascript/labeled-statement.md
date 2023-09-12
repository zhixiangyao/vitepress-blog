# 标记语句

最近在阅读 `tsconfig.json` 中 [`compilerOptions.allowUnusedLabels`](https://www.typescriptlang.org/tsconfig#allowUnusedLabels) 这个选项时候（如果设置为 `true` 就会有个警告，默认值是 `undefined`）

```ts
function verifyAge(age: number) {
  // Forgot 'return' statement
  if (age > 18) {
    // Unused label.
    verified: true
  }
}
```

才想起 JS 可以写`label 语法`，在 `JS` 中，`label 语法`可以用于标记代码块，以便在需要的时候可以通过标签进行跳转或中断代码的执行~

label 的语法形式为 `labelName: statement`，其中 `labelName` 是标签的名称，`statement` 是被标记的语句或代码块。

`label 语法`的主要用途有两个：

- 跳转语句

  可以使用 `break` 或 `continue` 语句结合标签来跳转到特定的代码块。通过在跳转语句中指定标签名称，可以跳转到对应标签所在的代码块。这种跳转通常用于多层循环或嵌套语句中，可以提供更精确的控制流程。

  ```js:line-numbers {1,4}
  outerLoop: for (let i = 0; i < 5; i++) {
    innerLoop: for (let j = 0; j < 5; j++) {
      if (i === 2 && j === 2) {
        break outerLoop // 跳出外层循环
      }
      console.log(i, j)
    }
  }
  ```

- 错误处理

  可以在代码块中使用 `try...catch` 语句结合标签来捕获特定的异常，并进行相应的处理。通过在 `catch` 语句中指定标签名称，可以捕获特定标签所在的代码块中抛出的异常。

  ```js:line-numbers {1,9}
  checkValue: try {
    if (value < 0) {
      throw new Error('Invalid value')
    }
    console.log('Value is valid')
  } catch (error) {
    if (error.message === 'Invalid value') {
      console.log('Invalid value detected')
      break checkValue // 跳出错误处理代码块
    }
    throw error // 抛出其他异常
  }
  ```
