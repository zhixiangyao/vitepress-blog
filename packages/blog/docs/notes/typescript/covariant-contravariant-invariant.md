# 协变 & 逆变 & 不变

在 `TypeScript` 中, 协变(`Covariance`)、逆变(`Contravariant`)和不变(`Invariant`)是类型系统中的重要概念, 它们涉及到 `类型参数` 在不同上下文中的行为. 理解这些概念有助于更好地管理和维护泛型代码.

## 协变(Covariance)

**协变**指的是在子类型关系中的一个类型如何影响函数返回值. 具体来说, 如果 `A` 是 `B` 的子类型, 那么返回值是 `A` 类型的函数可以赋值给返回值是 `B` 类型的函数, 换句话说, **协变**允许你将 `泛型类型` 的 `子类型` 赋值给 `泛型类型` 的 `父类型`.

举个例子：

```typescript
class Animal {
  sayName() {}
}
class Dog extends Animal {
  sayDog() {}
}

const handleAnimal: () => Animal = () => new Dog()
```

这里 `Dog` 是 `Animal` 的子类, 所以 `() => new Dog()` 可以赋值给 `() => Animal`, 这是协变的表现.

为什么需要**协变**呢?

举个例子:

```typescript
class Animal {
  sayName() {}
}
class Dog extends Animal {
  sayDog() {}
}

const handleDog: () => Dog = () => new Animal() // 这里 ts 会提示报错

handleDog().sayDog() // 这里运行就会报错
```

此时 `handleDog().sayDog()` 这里运行就会报错, 就会不安全.

## 逆变(Contravariant)

**逆变**指的是在子类型关系中的一个类型如何影响函数参数. 具体来说, 如果 `A` 是 `B` 的子类型, 那么接受 `B` 类型的函数可以接受 `A` 类型的参数. 逆变主要涉及到函数的参数类型, 允许函数使用更具体的参数类型.

举个例子：

```typescript
class Animal {}
class Dog extends Animal {}

function handleAnimal(animal: Animal) {}

const handleDog: (dog: Dog) => void = handleAnimal
```

这里 `handleAnimal` 函数接受 `Animal` 类型的参数, 而 `handleDog` 函数接受 `Dog` 类型的参数, 逆变允许这种类型的转换.

为什么函数参数需要**逆变**呢?

举个例子:

```typescript
class Animal {
  sayName() {}
}
class Dog extends Animal {
  sayDog() {}
}

function handleDog(dog: Dog) {
  console.log(dog.sayDog())
}

const handleAnimal: (animal: Animal) => void = handleDog // 这里 ts 会提示报错

handleAnimal(new Animal()) // 这里运行就会报错
```

此时 `handleAnimal(new Animal())` 这里运行就会报错, 就会不安全.

## 不变(Invariant)

**不变**指的是类型参数在 `泛型类型` 中的行为不会发生变化. 如果 `A` 是 `B` 的子类型, 那么 `Array<A>` 和 `Array<B>` 不具有子类型关系. 不变主要用于处理 `泛型类型` 中的具体实现.

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
- **不变**：类型参数在 `泛型类型` 中的行为不允许类型转换.

这些概念帮助我们在 TypeScript 中更精确地控制和理解类型的行为. 因为一切都是为了类型安全!
