# CSS prefers-color-scheme 媒体特性

- `@media (prefers-color-scheme: light)` 表示用户已告知系统他们选择使用浅色主题的界面。
- `@media (prefers-color-scheme: dark)` 表示用户已告知系统他们选择使用暗色主题的界面。

```css
.alice {
  background-color: #fff;
}

@media (prefers-color-scheme: light) {
  .alice {
    background-color: #fff;
  }
}

@media (prefers-color-scheme: dark) {
  .alice {
    background-color: #000;
  }
}
```

JavaScript 查询

```js
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
```

JavaScript 监听

```js
// MediaQueryList
const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)')

let isDark = darkModePreference.matches

// recommended method for newer browsers: specify event-type as first argument
darkModePreference.addEventListener('change', (e) => {
  isDark = e.matches
})
```

## 参考

- [MDN prefers-color-scheme](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-color-scheme)
- [`prefers-color-scheme` 兼容性](https://caniuse.com/?search=prefers-color-scheme)
- [`window.matchMedia` 兼容性](https://caniuse.com/?search=window.matchMedia)
