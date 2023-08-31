# CSS at-rule 特性检测

## Can I Use

`Chrome 83` 版本之后的浏览器都可以支持啦。

<ZoomImg src="/can_i_use_css_supports.png" class="w-full" />

## CSS `@supports`

- 支持 `or` `and` `not`

```html
<style>
  @supports (height: 100svh) {
    body.fixed {
      height: 100svh;
    }
  }

  @supports not (height: 100svh) {
    body.fixed {
      height: 100%;
    }
  }
</style>
```

## CSS.supports()

返回值 `true` 或者 `false`

```js
const isSupport = CSS.supports('height', '100svh')
```


## 参考

- [MDN Supports](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@supports)