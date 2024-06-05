# 在 typescript 中 IoC 和 DI 分别是什么?有什么关系

## 概念

在 `TypeScript` 中，`IoC` 和 `DI` 是两个密切相关的概念，它们通常在现代软件开发中一起使用，尤其是在构建大型应用程序时。下面是这两个术语的解释以及它们之间的关系：

1. **IoC（控制反转，`Inversion of Control`）**：

   - 控制反转是一种设计原则，它旨在减少软件组件之间的耦合度，提高模块化。
   - 在传统的编程模式中，组件会直接创建它所需要的依赖项。而 `IoC` 则反转了这种控制流程，即组件不再自己创建依赖项，而是从外部接收这些依赖项。
   - `IoC` 可以应用于很多方面，例如依赖注入、事件驱动架构等。

2. **DI（依赖注入，`Dependency Injection`）**：
   - 依赖注入是**实现控制反转的一种具体技术**，它允许组件在运行时接收它们需要的依赖项，而不是在代码中显式创建。
   - `DI` 通常通过构造函数注入、属性注入或方法注入来实现。
   - 依赖注入使得组件更加灵活和可测试，因为它们不依赖于具体的实现，而是依赖于接口或抽象类。

## 关系

- `IoC` 是一种设计原则，而 `DI` 是实现这一原则的一种技术手段。
- `DI` 是 `IoC` 的一个具体实现，它通过“注入”依赖项到组件中来实现控制反转。
- 在 TypeScript 或其他支持面向对象编程的编程语言中，`DI` 通常用于管理对象的生命周期和依赖关系，而 `IoC` 容器则是一个框架或库，用于实现 `DI`，它负责创建对象、管理它们的生命周期以及将依赖项注入到需要它们的组件中。

**简而言之，`IoC` 是一种思想，而 `DI` 是实现这一思想的具体方法。**在 `TypeScript` 中，开发者可以利用 `DI` 来构建松耦合、易于测试和维护的应用程序。

## Example

下面是一个使用 `@Injectable` 装饰器提供类依赖元数据的示例：

```ts
import 'reflect-metadata'

function Injectable() {
  return function (target: any) {
    Reflect.defineMetadata('injectable', true, target)
  }
}

@Injectable()
class MyService {
  constructor(private _dependency: MyDependency) {}

  doSomething() {
    this._dependency.doSomething()
  }
}

class MyDependency {
  doSomething() {
    console.log('MyDependency is doing something')
  }
}
```

在本例中，`MyService` 类依赖于 `MyDependency` 的一个实例。我们定义了一个 `@Injectable` 装饰器并将其应用于 `MyService` 类。该装饰器使用 `Reflect.defineMetadata` 方法存储类的元数据，在本例中是一个布尔值 `true`。

然后，依赖注入框架就可以使用这些元数据自动实例化 `MyService`，并为 `MyService` 实例提供必要的依赖 `MyDependency`。

```ts
class DependencyInjection {
  static get<T>(target: any): T {
    const isInjectable = Reflect.getMetadata('injectable', target)
    if (!isInjectable) {
      throw new Error('Target is not injectable')
    }

    const dependencies = Reflect.getMetadata('design:paramtypes', target) || []
    const instances = dependencies.map((dep) => DependencyInjection.get(dep))
    return new target(...instances)
  }
}

const myService = DependencyInjection.get(MyService)
myService.doSomething() // "MyDependency is doing something"
```

在本例中，`DependencyInjection` 类包含一个名为 `get` 的静态方法，该方法将目标类作为输入。该方法会检查该类是否具有 `@Injectable` 元数据。如果是可注入的，该方法就会使用 `Reflect.getMetadata("design:paramtypes", target)` 来检索类的构造函数依赖关系，并递归调用 `DependencyInjection.get(dep)` 来实例化这些依赖关系。
