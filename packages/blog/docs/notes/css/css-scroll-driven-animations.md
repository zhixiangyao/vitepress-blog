# [CSS 滚动驱动动画](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations)

在最新的 Chrome 115 中，令人无比期待的 CSS 滚动驱动动画 (CSS scroll-driven animations) 终于正式支持了

## Demo

[Online Preview](pathname:///scroll-progress-timeline.html)

<img src="/scroll-progress-timeline.gif" width="250" height="418" />

```html
<body>
  <main>
    <div class="progress"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
  </main>
</body>
```

```css
body {
  margin: 0;
}

main {
  height: 100vh;
  width: 100vw;
  overflow: scroll;

  scroll-timeline: --scroller block;
}

.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background-color: #f44336;
  transform-origin: 0 50%;
  animation: grow-progress 3s linear;
  animation-timeline: --scroller;
}

@keyframes grow-progress {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.block {
  width: 500px;
  height: 1000px;
}
```

## 滚动进度时间线（Scroll progress timeline）

这里的 `scroll()` 是一个简写，可以传递两个参数，分别是 `scroller` 和 `axis`

- `scroller` 表示滚动容器，支持以下几个关键值

  - `nearest`: 使用最近的祖先滚动容器 `default`。
  - `root`: 使用文档视口作为滚动容器。
  - `self`: 使用元素本身作为滚动容器。

- `axis` 表示滚动方向，支持以下几个关键值

  - `block`: 滚动容器的块级轴方向 `default`。
  - `inline`: 滚动容器内联轴方向。
  - `y`: 滚动容器沿 y 轴方向。
  - `x`: 滚动容器沿 x 轴方向。

```css
.test {
  /* 无参数 */
  animation-timeline: scroll();

  /* 设置滚动容器 */
  animation-timeline: scroll(nearest); /* 默认 */
  animation-timeline: scroll(root);
  animation-timeline: scroll(self);

  /* 设置滚动方向 */
  animation-timeline: scroll(block); /* 默认 */
  animation-timeline: scroll(inline);
  animation-timeline: scroll(y);
  animation-timeline: scroll(x);

  /* 同时设置 */
  animation-timeline: scroll(block nearest); /* 默认 */
  animation-timeline: scroll(inline root);
  animation-timeline: scroll(x self);
}
```
