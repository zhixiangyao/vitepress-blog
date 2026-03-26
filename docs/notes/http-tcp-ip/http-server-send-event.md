# HTTP 的 Server Send Event

在浏览器中，`Sever Sand Event` 是一种用于实时通信的技术。它允许 `服务器` 将数据流式传输到 `客户端` ，而不需要 `客户端` 发起请求。这种实时通信技术特别适用于需要实时更新的应用程序，例如聊天应用、股票市场数据等。实现一个单向推送消息无疑 `Sever Sand Event` 比 `Websocket` 更好。

## 启用

要启用 `Sever Sand Event`，可以通过以下步骤：

- 1. 创建一个服务器端点：首先，您需要在服务器端创建一个端点来处理 `Sever Sand Event` 请求。这个端点应该能够接收客户端的连接，并将实时数据发送给客户端。

- 2. 在客户端创建一个 `EventSource` 对象：在客户端，您需要创建一个 `EventSource` 对象来与服务器建立连接并接收数据。可以使用 `BOM` 中的 `EventSource API` 来实现。

  ```js
  const eventSource = new EventSource('http://xxx.com/xxx-stream')
  ```

  在上面的代码中，`http://xxx.com/xxx-stream` 是服务器端创建的 `Sever Sand Event`。

- 3. 处理事件：一旦连接建立，`EventSource` 对象将自动接收来自服务器的数据。您可以使用 `onmessage` 事件处理程序来处理接收到的数据。

  ```js
  eventSource.onmessage = ({ data }) => {
    console.log('New message', JSON.parse(data))
  }
  ```

  在上面的代码中，`event.data` 表示从服务器接收到的数据。

- 4. 关闭连接：当您不再需要接收实时数据时，可以通过调用 `EventSource` 实例的 `close()` 方法来关闭连接。

  通过上述步骤，您可以在浏览器中启用 `Sever Sand Event` ，并实现实时通信。请注意，`Sever Sand Event` 需要服务器端的支持，因此您需要在服务器端实现相应的逻辑来处理 `Sever Sand Event` 请求并发送实时数据给客户端。

## 参考

- [MDN EventSource](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource)
