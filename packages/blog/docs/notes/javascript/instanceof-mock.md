# instanceof 模拟

可以使用 `Object.getPrototypeOf` 查找原型，来比对 A 是否 `instanceof` B。

::: code-group

```js [instanceofMock]
function instanceofMock(before, after) {
  // 检查参数
  if (typeof before !== 'object' || before === null) {
    return false
  }
  if (typeof after !== 'function') {
    return false
  }

  let current = before

  while (current) {
    // 一直往原型链上面找
    if (Object.getPrototypeOf(current) === after.prototype) {
      return true
    }

    current = Object.getPrototypeOf(current)
  }

  return false
}
```

```js [test]
function grandpa() {
  this.a = 1
}

function father() {
  this.b = 2
}

function son() {
  grandpa.call(this)
  father.call(this)
  this.c = 3
}

father.prototype = Object.create(grandpa.prototype)
// 重新指定 constructor
father.prototype.constructor = father

son.prototype = Object.create(father.prototype)
// 重新指定 constructor
son.prototype.constructor = son

const sub = new son()
console.log(sub)

console.log(instanceofMock(sub, son))
console.log(instanceofMock(sub, father))
console.log(instanceofMock(sub, grandpa))
```

:::

## 运行结果

```
1 2 3
son { a: 1, b: 2, c: 3 }
true
true
true
```

## 实现原理

- `Object.prototype.__proto__`：[隐式的原型属性，已弃用](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)，要使用 [`Object.getPrototypeOf(XX)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) 或者 [`Reflect.getPrototypeOf(XXX)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getPrototypeOf) 来获取。

- `Object.prototype`：[显式的原型属性](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes)，直接 `XX.prototype`

其实 `instanceof` 主要的实现原理是 `before` 的 `__proto__` 在 `after` 的原型链上即可。

所以 `instanceof` 在查找的过程中会遍历 `before` 的原型链，直到找到和 `after` 的 `prototype` 相等，会返回 `true`，如果查找失败，则会返回 `false`。

下面是几个有趣的例子：

```js
function Foo() {}

Object instanceof Object // true
Function instanceof Function // true
Function instanceof Object // true
Foo instanceof Foo // false
Foo instanceof Object // true
Foo instanceof Function // true
```

要想全部理解 `instanceof` 的原理，除了刚刚提到的实现原理，还需要知道 `JavaScript` 的原型继承原理。

[JavaScript Object Layout - Hursh Jain/mollypages.org](http://mollypages.org/tutorials/js.mp)

<ZoomImg src="/javascript_object_layout.jpg" style="width: 100%;"  />

根据上面的原型图可知：

::: code-group

```js [Object instanceof Object]
before = Object.__proto__ // Function.prototype
after = Object.prototype

// 第一次判断
before != after
before = Function.prototype.__proto__ // Object.prototype

// 第二次判断
before === after
// 返回 true
```

```js [Foo instanceof Foo]
let before = Foo
let after = Foo

before = Foo.__proto // Function.prototype
after = Foo.prototype

// 第一次判断
before != after
before = Function.prototype.__proto__ // Object.prototype

// 第二次判断
before != after
before = Object.prototype // null

// 第三次判断
before === null
// 返回 false
```

```js [Foo instanceof Object]
let before = Foo
let after = Object

before = Foo.__proto__ // Function.prototype
after = Object.prototype

// 第一次判断
before != after
before = Function.prototype.__proto__ // Object.prototype

// 第二次判断
before === after
// 返回 true
```

```js [Foo instanceof Function]
let before = Foo
let after = Function

before = Foo.__proto__ // Function.prototype
after = Function.prototype

// 第一次判断
before === after
// 返回 true
```

:::
