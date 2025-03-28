# 位运算符

操作时时转化为二进制数

::: tip

| 十进制 | 二进制  | 补 0    |
| ------ | ------- | ------- |
| 1      | 0b1     | 0b00001 |
| 2      | 0b10    | 0b00010 |
| 4      | 0b100   | 0b00100 |
| 8      | 0b1000  | 0b01000 |
| 16     | 0b10000 | 0b10000 |

:::

## 运算符

### `&` 与运算

两个位都是 `1` 时，结果才为 `1`，否则为 `0`

```
  1 0 0 1 1
& 1 1 0 0 1
------------------------------
  1 0 0 0 1

  1 1 1 1 1
& 0 0 0 0 1
------------------------------
  0 0 0 0 1
```

### `|` 或运算

两个位都是 `0` 时，结果才为 `0`，否则为 `1`

```
  1 0 0 1 1
| 1 1 0 0 1
------------------------------
  1 1 0 1 1
```

### `^` 异或运算

两个位相同则为 `0`，不同则为 `1`

```
  1 0 0 1 1
^ 1 1 0 0 1
-----------------------------
  0 1 0 1 0
```

### `~` 取反运算

`0` 则变为 `1`，`1` 则变为 `0`

```
~ 1 0 0 1 1
-----------------------------
  0 1 1 0 0
```

### `<<` 左移运算

向左进行移位操作

```js
let a = 0b1000
a = a << 3
// 移位前：0b1000
// 移位后：0b1000000
```

### `>>` 右移运算

向右进行移位操作

```js
let a = 0b1000
a = a >> 3
// 移位前：0b1000
// 移位后：0b1

let a = -0b1000
a = a >> 3
// 移位前：-0b1000
// 移位后：-0b1
```

## 常见位运算技巧

### 位操作实现乘除法

- 数 `a` 向右移一位，相当于将 `a` 除以 `2`
- 数 `a` 向左移一位，相当于将 `a` 乘以 `2`
- 有小数会先进行下取整 再运算

```js
let a = 0b10
console.log(a >> 1) // 0b1 = 1
console.log(a << 1) // 0b100 = 4
let b = 2.55
console.log(b << 1) // 4
```

### 位操作交换两数

```js
// 普通操作
function swap({ a, b }) {
  a = a + b
  b = a - b
  a = a - b
  return { a, b }
}

// 位与操作
function swap({ a, b }) {
  a ^= b
  b ^= a
  a ^= b
  return { a, b }
}
```

::: tip 位与操作解释:

第一步：`a ^= b ---> a = (a ^ b)`

第二步：`b ^= a ---> b = b ^ (a ^ b) ---> b = (b ^ b) ^ a = a`

第三步：`a ^= b ---> a = (a ^ b) ^ a = (a ^ a) ^ b = b`

:::

### 位操作判断奇偶数

- 只要根据数的最后一位是 `0` 还是 `1` 来决定即可，为 `0` 就是偶数，为 `1` 就是奇数

```js
if (0 === (a & 1)) {
  // 偶数
}
```

### 位操作交换符号

- 交换符号将正数变成负数，负数变成正数

```js
function reversal(num) {
  return ~num + 1
}
```

::: tip

整数取反加 `1`，正好变成其对应的负数(补码表示)；负数取反加 `1`，则变为其原码，即正数

:::
