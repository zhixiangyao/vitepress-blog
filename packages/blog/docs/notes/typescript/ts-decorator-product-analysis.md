# TS装饰器产物分析

::: warning

`TypeScript` 目前有 `2` 个装饰器版本，一个是旧版，一个是新版。

- 旧版 `5.0` 之前
- 新版 `5.0` 之后，也就是 ECMASCript 官方的装饰器，[文章](https://mp.weixin.qq.com/s/6PTcjJQTED3WpJH8ToXInw)。

本文章分析的是旧版的 `TS` 装饰器。

:::

今天在阅读 [一文速览 TypeScript 装饰器 与 IoC 机制](https://mp.weixin.qq.com/s/I34ZmlQ-NdOOOY3F5bA3ig) 的时候，阅读到了：

- `属性装饰器`

类似于 `方法装饰器` ，但它的入参少了 `descriptor` (属性描述符) 。 原因则是目前没有方法在定义原型对象成员的同时，去描述一个实例的属性(创建描述符)。

::: tip

`descriptor` (属性描述符) 不会做为参数传入属性装饰器，这与 TypeScript 是如何初始化属性装饰器的有关。 因为目前没有办法在定义一个原型对象的成员时描述一个实例属性，并且没办法监视或修改一个属性的初始化方法。 返回值也会被忽略。 因此， `descriptor` (属性描述符) 只能用来监视类中是否声明了某个名字的属性。

:::

## TS Origin

```ts
function EditMethod(): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    descriptor.writable = false
  }
}

function EditProperty(): PropertyDecorator {
  return (target, propertyKey) => {
    console.log(target)
    console.log(propertyKey)
  }
}

class A {
  @EditProperty()
  originAttribute: number = 123

  @EditMethod()
  originMethod() {
    console.log("I'm Original!")
  }
}

const a = new A()
```

## TS Output

整理并去除 `Reflect.decorate`。

[源码点击这里](https://www.typescriptlang.org/play?declaration=false&experimentalDecorators=true&target=2&jsx=0&ts=5.2.2#code/GYVwdgxgLglg9mABAUwCYygWWVAFnVACgEoAuRbPAgEWQjgCcBDKRxAbwFgAoRRBnCAZJCUJgwDmOADSIADgzhzkDKAE8A0sjWzUyAM4QGMOawbFEAXgB8HHnz57Dx04wB0Ad2NiARgBtkK0RgJj99ZABue0QAXyjuGJ4eUEhYBBR0KAAFRWVVNRJyHKUVdVp6ZjM7Xn5BYURRcSkoWQUS-K01Cxtqh0R6MH04ALc-OAlGyRxieL6BoZGxiba89U6Z6LieRO4eCD8mfX1EAEFexAABNAxi1YLiaMYYCRgwE6goYx8QKGRyMBAAFsfCoggBGABMAGYkjUrplKPgiA8ak8XmBEQQSOc+PNhshRuNCAAiACSAHJAYgAPLGdGhACExI2NR2Oz2CH0UEQTCCYGQHlOJHiTDcaNemNQQWxPXYsVheMWRNF4oxOCRJBRsJ4QA)

```js:line-numbers {20,61,62}
'use strict'
const __decorate = function (decorators, target, key, desc) {
  let len = arguments.length
  let result = void 0

  if (len < 3) {
    result = target
  } else if (desc === null) {
    // method 的 desc 是 null
    desc = Object.getOwnPropertyDescriptor(target, key)
    result = desc
  } else {
    // Property 的 desc 是 void 0
    result = desc
  }

  let decorator = void 0

  for (let i = decorators.length - 1; i >= 0; i--) {
    decorator = decorators[i]

    if (decorator) {
      if (len < 3) {
        // class
        result = decorator(result)
      } else if (len > 3) {
        // method
        result = decorator(target, key, result)
      } else {
        // property
        result = decorator(target, key)
      }
    }
  }

  return len > 3 && result && Object.defineProperty(target, key, result), result
}

function EditMethod() {
  return (target, propertyKey, descriptor) => {
    descriptor.writable = false
  }
}

function EditProperty() {
  return (target, propertyKey) => {
    console.log(target)
    console.log(propertyKey)
  }
}

class A {
  constructor() {
    this.originAttribute = 123
  }
  originMethod() {
    console.log("I'm Original!")
  }
}

__decorate([EditProperty()], A.prototype, 'originAttribute', void 0)
__decorate([EditMethod()], A.prototype, 'originMethod', null)

const a = new A()
```

## 总结

在 `TS` 编译产物中, 我们可以看到, **方法装饰器** 是通过 `Object.getOwnPropertyDescriptor` 拿到 `Descriptor` 的.

::: tip 注意

```js
const desc = Object.getOwnPropertyDescriptor(Print.prototype, 'originMethod')
```

:::

因为方法是定义在原型上的 (可以获取 `target.prototype`), 而属性却在实例里 (`TS` 目前无法获取他的运行时生成实例的 `Descriptor`).
