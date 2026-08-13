# 从 0️⃣ 开始探索 NestJS 全栈开发

> #### [`NestJS`](https://nestjs.com/) 是一个渐进式的 `Nodejs` 框架，用于构建高效/可靠和可扩展的服务器端应用程序. 它受到 Angular 的启发, 采用了模块化/面向对象和函数响应式编程的思想.

本文项目 GitHub 地址: [fullstack-nest-react-starter](https://github.com/zhixiangyao/fullstack-nest-react-starter)

## NestJS 核心概念

### 1. Controllers

`Controllers` 是一个被 `@Controller()` 装饰器注解的类. `Controllers` 负责处理传入的请求并将响应发送回客户端.

```typescript
import type { ResponseGetUser } from './type'
import { Body, Controller, Header, Post, Request } from '@nestjs/common'
import { deleteProperty } from 'utils'

import { User } from '~/common/decorators/user.decorator'
import { UserFindDto } from './user.dto'
import { UserService } from './user.service'

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('find')
  @Header('content-type', 'application/json')
  async find(@Body() body: UserFindDto, @User() user: Request['user']): Promise<ResponseGetUser> {
    const username = body.username ?? user.username

    const item = await this.userService.find(username)
    const userWithoutPassword = deleteProperty(item, 'passwordHash')

    return { data: { user: userWithoutPassword } }
  }
}
```

### 2. Providers

`Providers` 是 [`NestJS`](https://nestjs.com/) 中的一个核心概念. 许多基础的 [`NestJS`](https://nestjs.com/) 的类, 如 services/repositories/factories/helpers, 都可以被视为 `Providers`. `Providers` 的关键思想是它可以作为依赖项注入, 允许对象之间形成各种关系. 将这些对象 "连接" 起来的责任主要由 [`NestJS`](https://nestjs.com/) 运行时系统处理.

```typescript
import { Module } from '@nestjs/common'

import { UserController } from './user.controller'
import { UserService } from './user.service'
import { PasswordService } from './password.service'

@Module({
  controllers: [UserController],
  providers: [UserService, PasswordService],
})
export class UserModule {}
```

* 在上面👆这个代码示例中, `UserModule` 的 **providers** 分别是 `UserService` 和 `PasswordService`.

* 那么在 **controllers** 和 **providers** 中都可以不用初始化 `UserService` 和 `PasswordService` 直接使用, 示例如下👇.

```typescript
import { Body, Controller, Header, Post } from '@nestjs/common'
import { $Enums } from '@prisma/client'

import { UserService } from './user.service'
import { UserPageDto } from './dto/user.dto'
import type { ResponseFindAll } from './type'

import { Role } from '~/common/decorators/role.decorator'

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Role([$Enums.Role.ADMIN])
  @Post('page')
  @Header('Content-Type', 'application/json')
  async findAll(@Body() userPageDto: UserPageDto): Promise<ResponseFindAll> {
    const data = await this.userService.findAll(userPageDto)

    return { data }
  }
}
```

### 3. Modules

`Module` 是一个被 `@Module()` 装饰器注解的类. 这个装饰器提供了 [`NestJS`](https://nestjs.com/) 用来高效组织和管理的应用程序结构的元数据.

```typescript
import { Module } from '@nestjs/common'

import { UserController } from './user.controller'
import { UserService } from './user.service'
import { PasswordService } from './password.service'

import { PrismaModule } from '~/modules/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, PasswordService],
  exports: [UserService],
})
export class UserModule {}
```

```typescript
import { Module } from '@nestjs/common'

import { PrismaService } from './prisma.service'

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

```typescript
import { Injectable } from '@nestjs/common'
import type { User } from '@prisma/client'

import { PasswordService } from './password.service'

import { PrismaService } from '~/modules/prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService, private readonly passwordService: PasswordService) {}

  async find(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    })

    return user
  }
}
```

* 在上面👆这个代码示例中, `UserModule` 模块导入了 `PrismaModule` 模块, 所以 `UserModule` 里每个 **controllers** 和 **providers** 基础类都可以使用 `PrismaModule` 的 **exports** 的所有基础类.

### 4. Middleware (中间件)

`Middleware` 是一个在路由处理器之前被调用的函数. 中间件函数可以访问 [request](https://expressjs.com/en/4x/api.html#req) 和 [response](https://expressjs.com/en/4x/api.html#res) 对象, 以及应用程序请求-响应周期中的下一个中间件函数. 下一个中间件函数通常用一个名为 `next` 的变量表示.

```typescript
import type { NextFunction, Request, Response } from 'express'

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log('Request:', `[${req.url}]`)
  next()
}
```

### 5. Exception filters (异常过滤器)

[`NestJS`](https://nestjs.com/) 自带一个内置异常层, 负责处理应用程序中所有未处理的异常. 当异常没有被您的应用程序代码处理时, 它会被这个层捕获, 然后自动发送一个合适的**用户友好的响应**.

默认情况下, 这一操作是由一个**内置**的全局异常过滤器来执行的, 它会处理类型为 `HttpException` (以及其子类) 的异常. 当异常未被识别 (既不是 `HttpException`, 也不是继承自 `HttpException` 的类) 时, 内置的异常过滤器会生成以下默认的 `JSON` 响应:

```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

#### 自定义异常

```typescript
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN)
  }
}
```

```typescript
@Get()
async findAll() {
  throw new ForbiddenException()
}
```

#### 异常过滤器

虽然基本 (内置) 异常过滤器可以自动处理许多情况, 但是我们可能希望完全控制异常层的处理. 比如希望添加**日志记录**或根据某些动态因素使用不同的 `JSON` 格式.

```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import type { Request, Response } from 'express'

// 只有继承自 HttpException 的异常才会被这个过滤器处理
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // 切换到 HTTP 上下文
    const ctx = host.switchToHttp()
    // 获取当前 HTTP 响应对象, 并将其类型指定为 Response
    const response = ctx.getResponse<Response>()
    // 获取当前 HTTP 请求对象, 并将其类型指定为 Request
    const request = ctx.getRequest<Request>()
    // 获取异常的状态码
    const status = exception.getStatus()

    response
      .status(status) // 设置 HTTP 响应的状态码为异常的状态码
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      })
  }
}
```

### 6. Pipes (管道)

`Pipes` 是一个使用 `@Injectable()` 装饰器注解的类, 它实现了 `PipeTransform` 接口.

管道通常有两种典型用法:

* 转换: 将输入数据转换为期望的形式 (例如, 从字符串转换为整数).

* 验证: 评估输入数据, 如果数据有效, 则将其原封不动地传递. 否则, 抛出异常.

```typescript
import { BadRequestException, Injectable } from '@nestjs/common'
import type { PipeTransform } from '@nestjs/common'
import { isDateString } from 'class-validator'

@Injectable()
export class ParseDateStringPipe implements PipeTransform<unknown, string> {
  transform(value: unknown) {
    if (typeof value !== 'string') {
      throw new BadRequestException('Validation failed (parsable string expected)')
    }

    if (!isDateString(value)) {
      throw new BadRequestException('Validation failed (time must be a valid ISO 8601 date string)')
    }

    return value
  }
}
```

### 7. Guards (守卫)

守卫是一个使用 `@Injectable()` 装饰器注解的类, 它实现了 `CanActivate` 接口.

这是一个简单的守卫:

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    return true
  }
}
```

我们可以绑定到某个控制器上:

```typescript
import { Body, Controller, UseGuards } from '@nestjs/common'
import { RolesGuard } from '~/common/guards/roles.guard'

@Controller('/user')
@UseGuards(RolesGuard)
export class UserController {}
```

也可以从模块外部注册的全局守卫:

```typescript
const app = await NestFactory.create(AppModule)
app.useGlobalGuards(new RolesGuard())
```

但是上面👆这样绑定到全局, 无法注入依赖, 因为这是在模块上下文之外完成的. 为了解决这个问题, 可以使用以下结构直接从任何模块设置守卫:

```typescript
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
```

```typescript
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { IS_ROLE_KEY, Role } from '~/common/decorators/role.decorator'
import { UserService } from '~/modules/user/user.service'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isRole = this.reflector.getAllAndOverride<Parameters<typeof Role>[0]>(IS_ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    const request = context.switchToHttp().getRequest<Request>()
    const user = await this.userService.find(request.user.username)

    if (!isRole.includes(user.role)) {
      throw new ForbiddenException('您没有权限！')
    }
    return true
  }
}
```

### 8. Interceptors (拦截器)

拦截器是一个使用 `@Injectable()` 装饰器注解的类, 并实现了 `NestInterceptor` 接口.

拦截器具有一组有用的功能, 这些功能受到 [Aspect Oriented Programming](https://en.wikipedia.org/wiki/Aspect-oriented_programming) (AOP) 技术的启发. 它们使得能够:

* 在方法执行前后绑定额外逻辑.

* 将函数返回的结果转换.

* 将函数抛出的异常转换.

* 扩展基本功能行为.

* 根据特定条件完全覆盖一个函数. (例如, 为了缓存目的)

这是一个简单的拦截器:

```typescript
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import type { Observable } from 'rxjs'
import type { Request } from 'express'
import { Injectable } from '@nestjs/common'
import { tap } from 'rxjs/operators'
import { FormatOptions, formatTime } from 'utils'

@Injectable()
export class LoggerDurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>()

    const now = Date.now()
    return next.handle().pipe(
      tap({
        complete: () => {
          const requestTime = formatTime(now, FormatOptions.YYYY_MM_DD_HH_mm_ss)
          const message = `[${requestTime}] [${request.url}] [duration: ${Date.now() - now}ms]`
          return console.log(message)
        },
      }),
    )
  }
}
```

我们可以绑定到某个控制器上:

```typescript
import { Body, Controller, UseGuards } from '@nestjs/common'
import { LoggerDurationInterceptor } from '~/common/interceptors/logger-duration.interceptor'

@Controller('/user')
@UseInterceptors(LoggerDurationInterceptor)
export class UserController {}
```

也可以从模块外部注册的全局拦截器:

```typescript
const app = await NestFactory.create(AppModule)
app.useGlobalInterceptors(new LoggerDurationInterceptor())
```

但是上面👆这样绑定到全局, 无法注入依赖, 因为这是在模块上下文之外完成的. 为了解决这个问题, 可以使用以下结构直接从任何模块设置拦截器:

```typescript
import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { LoggerDurationInterceptor } from '~/common/interceptors/logger-duration.interceptor'

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerDurationInterceptor,
    },
  ],
})
export class AppModule {}
```

### 9. Custom decorators (自定义装饰器)

[`NestJS`](https://nestjs.com/) 是围绕一个名为装饰器的语言特性构建的. 装饰器在许多常用编程语言中是一个众所周知的概念, 但在 `JavaScript` 世界中, 它们仍然相对较新. 为了更好地理解装饰器的工作原理, 我们建议阅读[这篇文章](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841). 这里有一个简单的定义:

> `Stage 2` 版本的 `Decorator` 是一个表达式, 它返回一个函数, 并可以接受 `target` 和 `name` 和 `property descriptor` 作为参数. 你通过在装饰器前面加上 `@` 字符并将其放在你要装饰的内容的最顶部来应用它. 装饰器可以为类和方法和属性定义.
>
> 为什么不用最新 `TypeScript` 5.0 支持的 `Stage 3` 版本的 `Decorator` 呢? 主要是 `Stage 3` 的 `Decorator` 版本不支持 `@Param` 装饰器, 次要是没有支持对 `Metadata` 访问的功能.

#### Param decorators (参数装饰器)

| `@Request(), @Req()`       | `req`                                |
| -------------------------- | ------------------------------------ |
| `@Response(), @Res()`      | `res`                                |
| `@Next()`                  | `next`                               |
| `@Session()`               | `req.session`                        |
| `@Param(param?: string)`   | `req.params` / `req.params[param]`   |
| `@Body(param?: string)`    | `req.body` / `req.body[param]`       |
| `@Query(param?: string)`   | `req.query` / `req.query[param]`     |
| `@Headers(param?: string)` | `req.headers` / `req.headers[param]` |
| `@Ip()`                    | `req.ip`                             |
| `@HostParam()`             | `req.hosts`                          |

这是一个简单的 `@User` 参数装饰器, 可以拿到 `request.user` 信息:

```typescript
import type { Request } from 'express'
import type { ExecutionContext } from '@nestjs/common'
import { createParamDecorator } from '@nestjs/common'

export const User = createParamDecorator((data: keyof Request['user'], ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>()
  const user = request.user

  return data ? user[data] : user
})
```

我们可以绑定到某个控制器方法的参数上:

```typescript
import type { ResponseGetUser, ResponseRemove } from './type'
import { Body, Controller, Header, HttpException, HttpStatus, Post, Request } from '@nestjs/common'
import { $Enums } from '@prisma/client'
import { deleteProperty } from 'utils'

import { UserService } from './user.service'
import { UserFindDto, UserRemoveDto } from './user.dto'

import { User } from '~/common/decorators/user.decorator'

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('find')
  @Header('content-type', 'application/json')
  async find(@Body() body: UserFindDto, @User() user: Request['user']): Promise<ResponseGetUser> {
    const username = body.username ?? user.username

    const item = await this.userService.find(username)
    const userWithoutPassword = deleteProperty(item, 'password')

    return { data: { user: userWithoutPassword } }
  }

  @Roles([$Enums.Role.ADMIN])
  @Post('remove')
  @Header('content-type', 'application/json')
  async remove(@Body() body: UserRemoveDto, @User('username') username: string): Promise<ResponseRemove> {
    if (username === body.username) {
      throw new HttpException('不可删除自身', HttpStatus.BAD_REQUEST)
    }

    if (!(await this.userService.has(body.username))) {
      throw new HttpException('未知的 username 值', HttpStatus.BAD_REQUEST)
    }

    await this.userService.remove(body.username)

    return { message: '删除成功!' }
  }
}
```

## 快速本地上手

> 全局安装脚手架即可快速创建 [`NestJS`](https://nestjs.com/) 项目

```bash
npm install --global @nestjs/cli
nest new my-nest-project
cd my-nest-project
npm run start:dev
```

### 1. 项目介绍

> 项目地址: https://github.com/zhixiangyao/fullstack-nest-react-starter

* 项目管理使用 `pnpm` 的 `monorepo`

* 前端使用 `vite` ➕ `react` ➕ `zustand` ➕ `antd` ➕ `tailwindcss`

* 后端使用 `nestjs` ➕ `class-validator` ➕ `class-transformer` ➕ `prisma`

* 数据库使用 `postgresql`

* 数据库容器 `docker`

* 服务启动使用 `pm2`

### 2. 目录结构

```plaintext
|   .gitignore
|   ecosystem.config.js           # pm2 项目运行配置文件
|   .stylelintignore
|   .stylelintrc.json             # stylelint 配置文件
|   eslint.config.mjs             # eslint 配置文件
|   pnpm-workspace.yaml           # pnpm monorepo 工作空间管理
|   package.json
|   README.md
+---.vscode                       # 配置文件
+---packages                      # 公共模块
\---apps
    +---backend                   # 后端工程文件
    \---frontend                  # 前端工程文件
```

### 3. 启动项目

#### 前置工作

* 安装 `Git`

* 安装 `Docker`

* 安装 `Node.js`

  * 使用 `npm` 全局安装 `pnpm`

  * 使用 `npm` 全局安装 `pm2`

#### 克隆项目 & 安装依赖

* 克隆 `git clone https://github.com/zhixiangyao/fullstack-nest-react-starter.git`

* 安装 `pnpm install`

#### 创建 `postgresql` 数据库容器

* 使用 `docker-compose.yml` 文件

  ```yaml
  services:
    postgres:
      image: postgres:13.15
      container_name: postgresql-1
      restart: always
      environment:
        - POSTGRES_USER=myuser
        - POSTGRES_PASSWORD=mypassword
      volumes:
        - $HOME/database/postgresql-1:/var/lib/postgresql/data
      ports:
        - 5432:5432
  ```

* 使用 `docker run` 命令

  ```bash
  docker run -d \
    --name postgresql-1 \
    --restart always \
    -e POSTGRES_USER=myuser \
    -e POSTGRES_PASSWORD=mypassword \
    -v $HOME/database/postgresql-1:/var/lib/postgresql/data \
    -p 5432:5432 \
    postgres:13.15
  ```

#### 运行项目

```bash
pnpm db:init # 首次
pnpm db:seed # 首次
pnpm dev
```

## 部署发布

* 执行 `docker-compose.yml` 启动 PostgreSQL

* 执行 `npm install --global pnpm pm2` 安装 pnpm 和 pm2

* 到项目根目录执行 `pnpm install`

* 执行 `pnpm db:init` 初始化 prisma 类型文件等操作

* 首次需要播种 `pnpm db:seed`

* 执行 `pnpm build` 编译前端和后端

* 执行 `pm2 start ecosystem.config.js` 启动服务

## 原理解析

### 控制反转 & 依赖注入

[`NestJS`](https://nestjs.com/) 中的 `IoC` (`Inversion of Control`) 和依赖注入 (`Dependency Injection` - **`DI`**) 是其核心特性, 它们共同实现了依赖关系的 **"自上而下"** 解析. 理解这一点, 需要从以下几个方面来分析:

#### 1. 依赖倒置原则 (`Dependency Inversion Principle` - `DIP`) 和 `IoC`/`DI` 的关系:

* **`DIP`:** 高层模块不应该依赖低层模块, 两者都应该依赖抽象. 抽象不应该依赖细节, 细节应该依赖抽象. 这意味着, 一个模块不直接创建或管理它所依赖的对象, 而是通过抽象来定义依赖关系.

* **`IoC` (控制反转):** `IoC` 是 `DIP` 的一种实现方式. 它将对象的创建和依赖关系的解析权从应用程序代码中移交给了外部框架或容器. 在传统编程中, 对象自己负责创建它所依赖的对象; 而 `IoC` 则颠倒了这种控制流, 由框架来 "反转" 控制, 替你管理依赖.

* **`DI` (依赖注入):** **`DI`** 又是 `IoC` 的一种具体实现技术. 它通过构造函数、setter 方法或接口等方式, 将依赖对象"注入"到需要它们的类中. [`NestJS`](https://nestjs.com/) 主要采用**构造函数注入**.

#### 2. [`NestJS`](https://nestjs.com/) `IoC` 容器的工作方式:

* **提供者 (`Providers`):** 在 [`NestJS`](https://nestjs.com/) 中, 服务 (`Services`)、仓库 (`Repositories`)、工厂 (`Factories`) 等都可以作为提供者. 通过 `@Injectable()` 装饰器, 一个类被标记为可注入的提供者, 这意味着 [`NestJS`](https://nestjs.com/) 的 `IoC` 容器可以管理它的实例化和依赖解析.

* **模块 (`Modules`):** [`NestJS`](https://nestjs.com/) 应用程序由模块组成. 每个模块都定义了一组提供者、控制器、导入的模块和导出的提供者. 模块是组织应用程序和管理依赖关系的关键.

* **依赖图 (`Dependency Graph`):** 当 [`NestJS`](https://nestjs.com/) 应用程序启动时, 它会构建一个内部的依赖图. 这个图描述了应用程序中所有提供者之间的依赖关系. 例如, 如果 `UserService` 依赖于 `UserRepository`, 那么 `UserService` 就会在图中指向 `UserRepository`.

* **运行时解析:** [`NestJS`](https://nestjs.com/) 的 `IoC` 容器在应用程序启动时, 会分析这个依赖图, 并以 **"自下而上"** 的方式实例化依赖. 但这并不意味着依赖关系是"自下而上"的, 而是**实例化过程**是这样的.

#### 3. **"自上而下" 的依赖关系如何体现:**

虽然**实例化过程**是 **"自下而上"** 的 (即先实例化被依赖的项, 再实例化依赖它的项), 但从**设计和代码结构**的角度来看, 依赖关系是 **"自上而下"** 的.

* **高层模块依赖低层抽象:** 你的控制器 (`Controller`) 是应用程序的"高层"部分, 它处理请求并协调业务逻辑. 控制器不会直接创建其依赖的服务. 相反, 它通过构造函数声明它需要一个 `UserService` 的实例. `UserService` 是一个抽象的概念, 控制器不需要知道 `UserService` 内部是如何实现或它依赖了哪些其他服务.

* **声明式依赖:** 你在类 (例如控制器或服务) 的构造函数中声明所需的依赖, 而不是手动 `new` 一个实例. 例如:

```typescript
import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service'; // 依赖抽象

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {} // 声明依赖 UserService

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
```

```typescript
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository'; // 依赖抽象

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {} // 声明依赖 UserRepository

  findAll() {
    return this.userRepository.getUsers();
  }
}
```

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  getUsers() {
    return [{ id: 1, name: 'Alice' }];
  }
}
```

* 在这个例子中:

  * `UserController` (高层) 依赖于 `UserService` (低层). 它只关心 `UserService` 能提供什么方法, 而不关心 `UserService` 内部如何实现.

  * `UserService` (高层, 相对于 `UserRepository`) 依赖于 `UserRepository` (低层). 它同样只关心 `UserRepository` 能提供什么, 不关心具体的数据存储实现.

* [`NestJS`](https://nestjs.com/) **负责实例化和注入:** 在运行时, [`NestJS`](https://nestjs.com/) `IoC` 容器会检查 `UserController` 的构造函数, 发现它需要一个 `UserService`. 然后, 它会检查 `UserService` 的构造函数, 发现它需要一个 `UserRepository`. [`NestJS`](https://nestjs.com/) 会**先实例化 `UserRepository`, 然后用 `UserRepository` 的实例实例化 `UserService`, 最后再用 `UserService` 的实例实例化 `UserController`**.

* **解耦和可测试性:** 这种 **"自上而下"** 的声明方式使得模块之间高度解耦. 高层模块不需要知道低层模块的具体实现细节. 这带来了巨大的好处:

  * **可测试性:** 在单元测试 `UserController` 时, 你可以轻松地 "模拟 (mock)" `UserService`, 而不需要真正地实例化 `UserService` 及其所有依赖.

  * **可维护性:** 当 `UserRepository` 的实现发生变化时 (比如从数据库切换到内存), 你只需要修改 `UserRepository` 本身, 而不需要修改 `UserService` 或 `UserController`.

  * **灵活性:** 你可以轻松地替换不同的实现. 例如, 你可以创建一个 `MockUserService` 并将其注入到 `UserController` 中, 而无需修改 `UserController` 的代码.

#### 4. [`NestJS`](https://nestjs.com/) 中 `IoC` 实现的"自上而下"依赖关系体现在:

* **代码层面的声明式依赖:** 你在 **"上层"** 组件 (如控制器) 中声明它需要 **"下层"** 组件 (如服务), 而不需要手动创建它们.

* **对抽象的依赖:** 高层模块依赖的是低层模块的抽象 (接口或类类型), 而不是具体的实现.

* **运行时由 `IoC` 容器管理实例化:** 容器负责根据声明的依赖关系图, 以正确的顺序 (从底层依赖到顶层依赖) 创建和注入所有实例, 从而满足从 **"上层"** 到 **"下层"** 的依赖需求.

### 请求验证过程

当 [`class-validator`](https://github.com/typestack/class-validator) 和 [`NestJS`](https://nestjs.com/) 的 `ValidationPipe` 管道配合使用时, 在一个完整的 `HTTP` 请求处理过程中, 会发生一系列复杂的步骤. 为了更好地理解, 我们可以将其分解为以下几个阶段:

#### 1. [`NestJS`](https://nestjs.com/) 接收到 HTTP 请求

* 用户通过浏览器或 `API` 客户端发送一个 `HTTP` 请求 (例如 `GET/POST/PUT` 等) 到 [`NestJS`](https://nestjs.com/) 应用.

* 请求包含请求头 (`Headers`)/请求体 (`Body`, 对于 `POST/PUT/PATCH` 请求) 和查询参数 (`Query Parameters`, 对于 `GET` 请求).

#### 2. 路由匹配

* [`NestJS`](https://nestjs.com/) 的路由模块根据请求的 URL 和 HTTP 方法, 将请求匹配到相应的控制器方法 (例如 `@Controller('users')` 中的 `@Post()` `createUser()` 方法).

#### 3. [`NestJS`](https://nestjs.com/) 管道 (Pipes) 处理

* 一旦请求匹配到控制器方法, [`NestJS`](https://nestjs.com/) 就会开始执行与之关联的管道. `ValidationPipe` 就是其中一种内置管道.

* 通常, `ValidationPipe` 会被应用到 `@Body()`/`@Query()`/`@Param()` 等装饰器修饰的参数上.

#### 4. `ValidationPipe` 的核心工作 (`transform: true` 的作用)

这是最关键的阶段, 也是 [`class-validator`](https://github.com/typestack/class-validator) 和 [`class-transformer`](https://github.com/typestack/class-transformer) 协同工作的地方.

* 4.1. 数据提取

  * `ValidationPipe` 首先从 [`NestJS`](https://nestjs.com/) 的执行上下文中获取到要处理的数据. 这取决于你使用的参数装饰器:

    * `@Body()`: 获取请求体数据.

    * `@Query()`: 获取查询参数数据.

    * `@Param()`: 获取路由参数数据.

* 4.2. 数据转换 ([`class-transformer`](https://github.com/typestack/class-transformer) 的介入)

  * 如果 `ValidationPipe` 配置了 `transform: true` (强烈推荐且通常是必须的):

    1. `ValidationPipe` 会调用 [`class-transformer`](https://github.com/typestack/class-transformer) 的 `plainToInstance()` (或 `plainToClass()`) 方法.

    2. `plainToInstance()` 会接收原始的纯 JavaScript 对象 (例如 `{ "name": "Alice", "age": "30" }`) 和你的 DTO 类 (例如 `CreateUserDto`).

    3. [`class-transformer`](https://github.com/typestack/class-transformer) 会根据 DTO 类上的 `@Type()` 装饰器执行类型转换 (例如将 "30" 转换为 30).

    4. 关键点: 如果 DTO 类中的属性使用了属性初始化器 (例如 `age: number = 18;`), 并且原始数据中没有提供该属性, 那么 [`class-transformer`](https://github.com/typestack/class-transformer) 在创建 DTO 实例时, 会使用这个默认值.

    5. 如果 DTO 属性使用了 `@Transform()` 装饰器, [`class-transformer`](https://github.com/typestack/class-transformer) 会执行其中定义的转换逻辑.

    6. 最终, `plainToInstance()` 返回的是一个你的 DTO 类的实例, 而不是一个普通的 JavaScript 对象. 这个实例上的属性已经经过了类型转换和默认值填充.

  * 如果 `ValidationPipe` 没有配置 `transform: true` (或 `transform: false`):

    1. `ValidationPipe` 将直接使用原始的纯 JavaScript 对象进行验证.

    2. 在这种情况下, DTO 类中的属性初始化器不会生效, 因为 DTO 类从未被实例化. 你传入的依然是一个纯粹的对象字面量, 它没有 DTO 实例的特性.

    3. 同时, `@Type()` 和 `@Transform()` 装饰器也不会生效.

* 4.3. 数据验证 ([`class-validator`](https://github.com/typestack/class-validator) 的介入)

  * 无论是否进行了转换, `ValidationPipe` 接下来都会调用 [`class-validator`](https://github.com/typestack/class-validator) 的 `validate()` 方法.

  * `validate()` 方法接收当前待验证的数据 (如果是 `transform: true`, 那就是 DTO 实例; 如果是 `transform: false`, 那就是原始的 JS 对象).

  * [`class-validator`](https://github.com/typestack/class-validator) 会遍历 DTO 类 (或原始对象) 的每个属性, 并检查它们是否满足通过 `@IsString()`, `@IsInt()`, `@MinLength()`, `@IsEmail()` 等装饰器定义的验证规则.

  * 如果某个属性不符合规则, [`class-validator`](https://github.com/typestack/class-validator) 会收集验证错误.

    * `whitelist: true` 和 `forbidNonWhitelisted: true` 选项在这里也起作用:

      * `whitelist: true`: 会从最终的 DTO 实例中移除任何未在 DTO 类中定义的属性.

      * `forbidNonWhitelisted: true`: 如果请求中包含了 DTO 类中未定义的属性, 则会抛出错误.

#### 5. 错误处理

* 如果 [`class-validator`](https://github.com/typestack/class-validator) 发现任何验证错误 (即 `validate()` 返回一个非空错误数组), `ValidationPipe` 会自动抛出一个 `BadRequestException`.

* 这个 `BadRequestException` 会包含详细的验证错误信息 (例如 "name should be a string", "age must be an integer").

* [`NestJS`](https://nestjs.com/) 的全局异常过滤器 (或你自定义的异常过滤器) 会捕获这个异常, 并将其转换为一个标准的 `HTTP` 响应 (通常是 `400 Bad Request` 状态码, 带有错误详情的 `JSON` 体).

#### 6. 控制器方法执行

* 如果所有验证都通过:

  * `ValidationPipe` 会将经过验证和转换的 DTO 实例作为参数传递给控制器方法.

  * 控制器方法可以安全地使用这个 DTO 实例, 因为它保证了数据的类型正确性/默认值填充和有效性.

* 如果验证失败:

  * 控制器方法不会被执行, 因为异常在管道阶段就被抛出并处理了.

#### 7. 响应返回

* 控制器方法执行完毕后, 返回数据.

* [`NestJS`](https://nestjs.com/) 将返回的数据序列化为 `JSON` (或其他格式), 并通过 `HTTP` 响应发送回客户端.

#### 8. 总结流程图:

```plaintext
HTTP Request
     |
     v
NestJS Router (URL & Method Match)
     |
     v
Controller Method Parameter (e.g., @Body() createUserDto: CreateUserDto)
     |
     v
ValidationPipe (applied to the parameter)
     |
     v
[If transform: true]
  plainToInstance() (class-transformer)
  - Type Conversion (@Type)
  - Default Value Application (Property Initializers)
  - Custom Transformations (@Transform)
     |
     v
[Transformed DTO Instance]
     |
     v
validate() (class-validator)
  - Property Validations (@IsString, @IsInt, etc.)
  - Whitelist/ForbidNonWhitelisted
     |
     v
[Validation Success?] --- No ---> BadRequestException (400 Bad Request)
     |                           (Handled by NestJS Exception Filter)
     Yes
     |
     v
Controller Method Execution (with validated & transformed DTO instance)
     |
     v
HTTP Response (JSON, etc.)
```

理解这个流程对于有效地使用 [`class-validator`](https://github.com/typestack/class-validator) 和 [`class-transformer`](https://github.com/typestack/class-transformer) 至关重要, 尤其是当你在处理 DTO 的默认值/类型转换和复杂验证规则时.

## 总结

***

[`NestJS`](https://nestjs.com/) 是一个强大的 [`Node.js`](https://nodejs.org/en) 框架, 专为构建高效/可扩展的服务器端应用而设计. 它借鉴了 `Angular` 的许多理念, 并通过装饰器 (Decorators) 提供了清晰的结构和强大的功能. 以下是对 [`NestJS`](https://nestjs.com/) 核心概念的总结:

### 结构与组织

* **Controllers (控制器)**: 负责处理传入的 HTTP 请求并发送响应. 它们使用 `@Controller()` 装饰器进行标记, 通常会定义路由和处理不同 HTTP 方法的函数.

* **Providers (提供者)**: [`NestJS`](https://nestjs.com/) 的核心概念之一, 包括 `服务` (Services)/`仓库` (Repositories)/`工厂` (Factories)/`帮助器` (Helpers) 等. 它们可以作为依赖项被注入到其他类中, 实现模块化和可测试性.

* **Modules (模块)**: 使用 `@Module()` 装饰器定义的类, 用于组织应用程序的结构. 模块可以导入其他模块 (`imports`), 声明 `控制器` (controllers) 和 `提供者` (providers), 并 `导出提供者` (exports), 从而实现代码的封装和复用.

### 请求处理流程中的增强功能

* **Middleware (中间件)**: 在路由处理器之前执行的函数, 可以访问请求和响应对象, 用于执行日志记录/身份验证等通用任务.

* **Exception Filters (异常过滤器)**: [`NestJS`](https://nestjs.com/) 内置的异常处理机制, 负责捕获未处理的异常并发送友好的响应. 你可以自定义异常过滤器来处理特定类型的异常, 例如添加日志或格式化错误响应.

* **Pipes (管道)**: 实现了 `PipeTransform` 接口的类, 主要用于数据的**转换** (例如, 字符串转数字) 和**验证** (例如, 检查数据是否有效). 它们可以在请求到达控制器方法之前对数据进行处理.

* **Guards (守卫)**: 实现了 `CanActivate` 接口的类, 用于控制对路由的访问权限, 例如进行身份验证或角色检查. 它们在请求被处理之前决定是否允许访问特定资源.

* **Interceptors (拦截器)**: 实现了 `NestInterceptor` 接口的类, 允许你在方法执行前后绑定额外逻辑/转换函数返回结果或抛出的异常/扩展基本功能行为, 甚至根据条件完全覆盖一个函数 (例如用于缓存).

### 高级特性与实践

* **Custom Decorators (自定义装饰器)**: [`NestJS`](https://nestjs.com/) 广泛利用了装饰器. 你可以创建自定义参数装饰器 (例如 `@User()`), 以便更方便地从请求中提取特定信息.

* **`class-validator` 和 `class-transformer`**: 在请求验证过程中发挥关键作用.

  * 当 `ValidationPipe` 配置了 `transform: true` 时, `class-transformer` 会将原始的纯 JavaScript 对象转换为 DTO (数据传输对象) 实例, 并执行类型转换和默认值填充.

  * `class-validator` 随后会对这个 DTO 实例进行验证, 根据 DTO 类上的装饰器规则检查数据的有效性.

  * 如果验证失败, `ValidationPipe` 会抛出 `BadRequestException`, 由异常过滤器处理并返回相应的错误信息.

### 项目实践与快速上手

文档中还提供了一个完整的 [`NestJS`](https://nestjs.com/) 项目示例, 并详细介绍了其结构/启动流程和部署发布步骤. 该项目使用 `pnpm monorepo` 进行管理, 结合 `React` 前端/`PostgreSQL` 数据库以及 `Docker` 和 `pm2` 进行容器化和进程管理, 展示了一个全栈应用开发的典型实践.
