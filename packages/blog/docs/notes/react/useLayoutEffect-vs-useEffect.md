# `useLayoutEffect` 对比 `useEffect`

在 `React` 中，有两个用于处理副作用的 `Hook` ：`useEffect` 和 `useLayoutEffect`。它们的主要区别在于执行的时机。

- `useEffect` 会在组件渲染完成之后`异步执行`，也就是在 `React` 的 `commit` 阶段之后执行。这意味着在 `useEffect` 中 进行**布局测量**时，可能会导致页面重新渲染两次，因为**布局测量**可能会改变 `DOM` 结构。

- `useLayoutEffect` 会在组件渲染完成之后`同步执行`，也就是在 `React` 的 `commit` 阶段之后，但在浏览器重新绘制屏幕之前，也就是执行时机是在浏览器绘制页面。这意味着在 `useLayoutEffect` 中进行**布局测量**时，可以确保测量结果能够在浏览器执行绘制之前被使用，从而避免了页面的额外渲染。

```tsx
import { useState, useEffect, useLayoutEffect } from 'react'

export default () => {
  const [count, setCount] = useState(0)

  useLayoutEffect(() => {
    const current = Date.now()
    const btnEle = document.querySelector<HTMLButtonElement>('.test-01')

    console.log(btnEle?.innerText)
    // 如果点击按钮后，这里的结果会是："add + 1: 1"，
    // Chrome DevTools 里的 element 的 dom 结果也是 "add + 1: 1"。
    //
    // 但是在页面上看还是 "add + 1: 0"，得过了 1 秒后才会更新。
    // 所以 useLayoutEffect 是同步的，会阻塞页面的更新，需要谨慎使用。

    while (Date.now() - current < 1000) {}
  }, [count])

  return (
    <button className="test-01" onClick={() => setCount((c) => c + 1)}>
      add + 1: {count}
    </button>
  )
}
```

## 为什么**布局测量**可能会改变 `DOM` 结构？

**布局测量**可能会改变 `DOM` 结构的原因是，**布局测量**通常需要获取元素的尺寸和位置信息，以便进行后续的布局计算或者样式调整。在获取这些信息的过程中，浏览器可能会触发重排（`reflow`）操作，这会重新计算元素的布局，并且可能会导致 `DOM` 结构的改变。当浏览器执行布局操作时，它需要考虑到元素的大小、位置、边距、边框、内边距等因素，以及其他相关元素的布局信息。

因此，如果**布局测量**的结果会影响到元素的布局属性，例如宽度、高度、位置等，那么浏览器可能会重新计算元素的布局，并且可能会导致 `DOM` 结构的改变。

举个例子，假设在**布局测量**过程中，我们获取了一个元素的宽度，并根据它的宽度计算了另一个元素的位置。

这个计算过程可能会触发浏览器的重排（`reflow`）操作，导致元素的位置发生变化，从而改变了 `DOM` 结构。因此，在进行**布局测量**时，需要注意可能引起 `DOM` 结构改变的情况，并谨慎处理，以避免不必要的重排（`reflow`）操作。

## 为什么在浏览器执行绘制之前执行？

在浏览器渲染页面时，渲染过程通常分为多个阶段，其中包括布局（`layout`）、绘制（`paint`）和合成（`composite`）等步骤。在这个过程中，浏览器会根据 DOM 结构和样式信息计算元素的位置、大小和样式，并最终将页面绘制到屏幕上。

`useLayoutEffect` `Hook` 会在浏览器执行绘制之前同步执行。这意味着在 `useLayoutEffect` 中进行的 `DOM` 操作或者布局测量，会在浏览器进行实际绘制之前生效。

换句话说，当 `useLayoutEffect` 中的代码执行完毕后，浏览器会根据最新的 `DOM` 结构和样式信息进行布局计算，并准备好将页面绘制到屏幕上。因此，在 `useLayoutEffect` 中进行的DOM操作或者布局测量可以确保在浏览器执行绘制之前生效，从而避免了页面的额外渲染。

需要注意的是，由于 `useLayoutEffect` 是同步执行的，如果在其中进行复杂的操作或者阻塞代码的执行，可能会导致页面的卡顿或者性能问题。因此，在使用 `useLayoutEffect` 时，应该确保其中的操作是必要且高效的，以避免影响页面的性能和用户体验。

- 参考 [MDN：渲染页面：浏览器的工作原理](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work)
- 参考 [React Doc：useEffect](https://zh-hans.react.dev/reference/react/useEffect)
- 参考 [React Doc：useLayoutEffect](https://zh-hans.react.dev/reference/react/useLayoutEffect)
