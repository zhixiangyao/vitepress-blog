# 什么是 `URL`、 `URI` 和 `URN` ?

`URL`、`URI` 和 `URN` 都是用于标识资源的术语，但它们有不同的定义和用途。以下是每个术语的详细解释：

### `URL` (Uniform Resource Locator)

`URL` 是统一资源定位符，用于指定资源在互联网上的位置。它包含了资源的位置和访问资源的方法（如 HTTP、HTTPS、FTP 等）。例如：

```
https://www.example.com/index.html
```

在这个例子中：

- `https` 是访问资源的协议
- `www.example.com` 是资源所在的主机名
- `/index.html` 是资源在主机上的路径

### `URI` (Uniform Resource Identifier)

`URI` 是统一资源标识符，是一种用于标识资源的字符串。`URI` 可以分为两种类型：`URL` 和 `URN`。换句话说，`URL` 是 `URI` 的一种特定类型。`URI` 可以表示为：

```
scheme:[//authority]path[?query][#fragment]
```

例如：

```
https://www.example.com/index.html
urn:isbn:0451450523
```

在这个例子中，第一个是 `URL`，第二个是 `URN`。

### `URN` (Uniform Resource Name)

`URN` 是统一资源名称，用于通过名字而不是位置来标识资源。它不指定资源的位置，而是一个永久的标识符。例如：

```
urn:isbn:0451450523
```

这个 `URN` 标识的是某本书的 ISBN 编号，无论这本书在哪里出版或被存储，其 `URN` 都是唯一且不变的。

### 关系和区别

- **`URI`** 是一个更广泛的概念，可以是 `URL` 或 `URN`。
- **`URL`** 是 `URI` 的一个子集，用于通过位置和访问方法来标识资源。
- **`URN`** 是 `URI` 的另一个子集，用于通过名称来唯一标识资源，不关心资源的位置。

### 总结

- **`URI`**: 统一资源标识符，泛指所有用于标识资源的字符串。
- **`URL`**: 统一资源定位符，`URI` 的一种，通过位置和访问方法标识资源。
- **`URN`**: 统一资源名称，`URI` 的另一种，通过名称唯一标识资源。

了解这些术语有助于更好地理解和使用网络资源及其定位和标识方式。
