# 协变 & 逆变 & 不变

在 `TypeScript` 中, 协变(`Covariance`)、逆变(`Contravariant`)和不变(`Invariant`)是类型系统中的重要概念, 它们涉及到 `类型参数` 在不同上下文中的行为. 理解这些概念有助于更好地管理和维护泛型代码.

## 协变(Covariance)

**协变**指的是在子类型关系中的一个类型如何在一个泛型类型里传播. 具体来说, 如果 `A` 是 `B` 的子类型, 那么 `Array<A>` 就是 `Array<B>` 的子类型. 换句话说, 协变允许你将泛型类型的子类型赋值给泛型类型的父类型.

举个例子：

```typescript
class Animal {}
class Dog extends Animal {}

const animals: Animal[] = [new Dog()]
```

这里 `Dog` 是 `Animal` 的子类, 所以 `Dog[]` 可以赋值给 `Animal[]`, 这是协变的表现.

## 逆变(Contravariant)

**逆变**指的是在子类型关系中的一个类型如何影响函数参数. 具体来说, 如果 `A` 是 `B` 的子类型, 那么接受 `B` 类型的函数可以接受 `A` 类型的参数. 逆变主要涉及到函数的参数类型, 允许函数使用更具体的参数类型.

举个例子：

```typescript
function handleAnimal(animal: Animal) {}

const handleDog: (dog: Dog) => void = handleAnimal
```

这里 `handleAnimal` 函数接受 `Animal` 类型的参数, 而 `handleDog` 函数接受 `Dog` 类型的参数, 逆变允许这种类型的转换.

## 不变(Invariant)

**不变**指的是类型参数在泛型类型中的行为不会发生变化. 如果 `A` 是 `B` 的子类型, 那么 `Array<A>` 和 `Array<B>` 不具有子类型关系. 不变主要用于处理泛型类型中的具体实现.

举个例子：

```typescript
class Box<T> {
  value: T
  constructor(value: T) {
    this.value = value
  }
}

const boxNumber: Box<number> = new Box(123)
const boxString: Box<string> = new Box('abc')

// 不能将 Box<number> 赋值给 Box<string>
const boxString2: Box<string> = boxNumber // 错误
```

在这里, `Box<number>` 和 `Box<string>` 是不变的, 它们不可以直接进行赋值, 因为它们的类型参数不具备继承关系.

## 总结

- **协变**：主要应用于返回值类型, 即一个类型的子类型可以用作另一个类型的返回值.
- **逆变**：主要应用于函数参数, 即一个接受更具体参数类型的函数可以用作接受更一般参数类型的函数.
- **不变**：类型参数在泛型类型中的行为不允许类型转换.

这些概念帮助我们在 TypeScript 中更精确地控制和理解类型的行为.
