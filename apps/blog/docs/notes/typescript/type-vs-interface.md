# type 对比 interface

在 `TypeScript` 中，`type` 和 `interface` 都可以用来定义对象的结构和类型。虽然它们在某些方面相似，但也有一些区别。

## 前置知识

- 联合类型（`Union Types`）表示一个值可以是多种类型之一。使用竖线（`|`）将多个类型组合在一起。

```ts
let myVariable: number | string
myVariable = 10 // 合法
myVariable = 'Hello' // 合法
myVariable = true // 不合法，布尔类型不在联合类型中
```

- 交叉类型（`Intersection Types`）表示一个值具有多种类型的属性。使用 `ampersand`（`&`）将多个类型组合在一起。

```ts
interface A {
  propA: number
}

interface B {
  propB: string
}

type C = A & B

let myVariable: C
myVariable = { propA: 10, propB: 'Hello' } // 合法
myVariable = { propA: 10 } // 不合法，缺少 propB 属性
myVariable = { propB: 'Hello' } // 不合法，缺少 propA 属性
```

- 原始类型（`Primitive Types`）表示最基本的数据类型，包括 `number`、`string`、`boolean`、`null`、`undefined`、`symbol` 和 `bigint`。

```ts
let myNumber: number = 10
let myString: string = 'Hello'
let myBoolean: boolean = true
let myNull: null = null
let myUndefined: undefined = undefined
let mySymbol: symbol = Symbol()
let myBigInt: bigint = BigInt(10)
```

## 区别

- 1. `type` 可以使用`联合类型`、`交叉类型`和`原始类型`，而 `interface` 仅能用于定义对象类型。

  ```ts
  type MyType = number | string
  interface MyInterface {
    prop: number
  }
  ```

- 2. `type` 允许使用 `typeof` 操作符来获取已存在变量的类型，并且可以使用类型别名（`type alias`）。

  ```ts
  type MyType = typeof someVariable
  type MyTypeAlias = string
  ```

- 3. `interface` 可以被类实现（`implements`），而 `type` 不能。

  ```ts
  interface MyInterface {
    prop: number
    method(): void
  }

  class MyClass implements MyInterface {
    prop: number
    method(): void {
      // 实现方法
    }
  }
  ```

- 4. 当定义相同的名称时，`interface` 具有合并属性的能力，而 `type` 则会报错。

  ```ts
  interface MyInterface {
    prop: number
  }

  interface MyInterface {
    method(): void
  }

  // 合并后的 MyInterface
  interface MyInterface {
    prop: number
    method(): void
  }
  ```

## 总结

`type` 更加灵活，可以用于更多场景，而 `interface` 更加专注于定义对象类型。在选择使用 `type` 还是 `interface` 时，可以根据具体的需求和代码风格来决定。
