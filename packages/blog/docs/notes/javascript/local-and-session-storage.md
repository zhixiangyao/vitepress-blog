# local 和 session storage

`localStorage` 和 `sessionStorage` 都是 [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML) 提供的 Web 存储机制，用于在浏览器中存储数据。它们之间的主要区别在于数据的 **生命周期** 和 **作用域**。

## 生命周期:

- localStorage: 存储在 `localStorage` 中的数据没有过期时间，除非手动删除或通过代码清除。这意味着即使关闭浏览器，数据仍然会保留。
- sessionStorage: 存储在 `sessionStorage` 中的数据只在当前会话期间有效。当用户关闭浏览器窗口或标签页时，数据将被清除。

## 作用域:

- localStorage: 存储在 `localStorage` 中的数据在同一域名下的所有页面中都是共享的。这意味着在同一域名下的不同页面之间可以共享数据。
- sessionStorage: 存储在 `sessionStorage` 中的数据只在同一浏览器窗口或标签页中共享。这意味着在不同的浏览器窗口或标签页之间无法共享数据。

## 容量限制:

- localStorage: 一般来说，浏览器对 `localStorage` 的容量限制在 5MB 左右。但是不同浏览器可能会有所不同。
- sessionStorage: 与 `localStorage` 相同，浏览器对 `sessionStorage` 的容量限制也在 5MB 左右。

## 使用方式:

- localStorage: 可以通过`localStorage.setItem(key, value)`将数据存储到 `localStorage` 中，通过`localStorage.getItem(key)`获取数据，通过`localStorage.removeItem(key)`删除数据。
- sessionStorage: 可以通过`sessionStorage.setItem(key, value)`将数据存储到 `sessionStorage` 中，通过`sessionStorage.getItem(key)`获取数据，通过`sessionStorage.removeItem(key)`删除数据。

## 总结

`localStorage` 和 `sessionStorage` 都是在浏览器中存储数据的机制，但它们在数据的生命周期和作用域上有所不同。

`localStorage` 的数据在浏览器关闭后仍然保留，可以在同一域名下的不同页面之间共享；而 `sessionStorage` 的数据只在当前会话期间有效，只能在同一浏览器窗口或标签页中共享。另外，它们的容量限制大致相同，都在 5MB 左右。
