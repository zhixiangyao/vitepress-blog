# `ES6 Class` 继承模拟

让我们来实现一下构造函数的继承吧～ 😄

## 一、`ES5` 原型继承 + 构造继承

### 代码

```JavaScript
function 爷爷() {
  this.a = 1
}
爷爷.prototype.say = function () {
  console.info(this.a, this.b, this.c)
}

function 爸爸() {
  this.b = 2
}

function 儿子() {
  爷爷.call(this)
  爸爸.call(this)
  this.c = 3
}

爸爸.prototype = Object.create(爷爷.prototype)
// 重新指定constructor
爸爸.prototype.constructor = 爸爸

儿子.prototype = Object.create(爸爸.prototype)
// 重新指定constructor
儿子.prototype.constructor = 儿子

```

### 结果

```JavaScript
let obj = new 儿子()
obj.say()
console.info(obj)
```

- `1` `2` `3`
- 儿子 `{ a: 1, b: 2, c: 3 }`

## 二、`ES6` 的 `class` 继承（本质还是 `ES5` 的原型继承 + 构造继承）

### 代码

```JavaScript
class 爷爷 {
  constructor() {
    this.a = 1
  }

}
class 爸爸 extends 爷爷 {
  constructor() {
    super()
    this.b = 2
  }

  say() {
    console.info(this.a, this.b, this.c)
  }
}
class 儿子 extends 爸爸 {
  constructor() {
    super()
    this.c = arguments[0]
  }
}
```

### 结果

```JavaScript
let obj = new 儿子()
obj.say()
console.info(obj)
```

- `1` `2` `123`
- 儿子 `{ a: 1, b: 2, c: 123 }`
