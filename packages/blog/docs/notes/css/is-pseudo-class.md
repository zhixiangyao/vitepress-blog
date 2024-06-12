# `:is` 伪类

`:is` 伪类在 CSS 中用于简化复杂的选择器组合。它允许你将多个选择器组合成一个选择器列表，从而减少重复代码，并提高可读性和维护性。`:is` 伪类的作用是接受一个选择器列表，并将这些选择器的样式应用到匹配的元素上。

### 示例

假设你有以下 HTML 结构：

```html
<div class="card">
  <h1>Title</h1>
  <p>Content</p>
</div>
<div class="panel">
  <h1>Panel Title</h1>
  <p>Panel Content</p>
</div>
```

如果你想为所有的 `h1` 和 `p` 元素应用相同的样式，可以使用 `:is` 伪类来简化选择器：

```css
/* Without :is */
.card h1,
.card p,
.panel h1,
.panel p {
  color: blue;
}

/* With :is */
:is(.card, .panel) h1,
:is(.card, .panel) p {
  color: blue;
}
```

### 使用 `:is` 简化选择器

在上面的例子中，我们使用 `:is` 伪类将 `.card` 和 `.panel` 这两个选择器组合在一起，从而避免了重复的选择器书写。这样做不仅使代码更简洁，还更容易维护。

### 浏览器兼容性

`:is` 伪类在现代浏览器中得到了广泛支持，但在一些较旧的浏览器中可能不受支持。因此，在使用之前，请确保目标浏览器版本支持它，或者提供替代方案。

### 具体应用

可以用于任何需要简化选择器组合的场景，例如：

```css
/* 为不同类型的输入元素添加相同的样式 */
:is(input[type='text'], input[type='email'], input[type='password']) {
  border: 1px solid #ccc;
  padding: 10px;
}
```

### 总结

`:is` 伪类是一种强大的工具，可以简化复杂的选择器组合，提高 CSS 代码的可读性和可维护性。
