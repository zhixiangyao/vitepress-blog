# Vue2 生命周期基础知识

## 基础知识

<!-- prettier-ignore-start -->
::: tip Vue2 生命周期的八个阶段:

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed

:::
<!-- prettier-ignore-end -->

## 生命周期图

下图展示了实例的生命周期。

<ZoomImg src="/vue2_lifecycle.png" class="w-full" />

## 1. beforeCreate

这个 hook 是是 new Vue()之后触发的第一个钩子，在当前阶段中 data、methods、computed 以及 watch 上的数据和方法均不能被访问。

## 2. created

这个 hook 是在实例创建完成后发生，当前阶段已经完成了数据观测，也就是可以使用数据，更改数据，在这里更改数据不会触发 updated 函数。可以做一些初始数据的获取，在当前阶段无法与 Dom 进行交互，如果你非要想，可以通过 vm.$nextTick 来访问 Dom。

## 3. beforeMount

这个 hook 是发生在挂载之前，在这之前 template 模板已导入渲染函数编译。而当前阶段虚拟 Dom 已经创建完成，即将开始渲染。在此时也可以对数据进行更改，不会触发 updated。

## 4. mounted

这个 hook 是在挂载完成后发生，在当前阶段，真实的 Dom 挂载完毕，数据完成双向绑定，可以访问到 Dom 节点，使用$refs 属性对 Dom 进行操作。也可以向后台发送请求，拿到返回数据。

## 5. beforeUpdate

这个 hook 是发生在更新之前，也就是响应式数据发生更新，虚拟 dom 重新渲染之前被触发，你可以在当前阶段进行更改数据，不会造成重渲染。

## 6. updated

这个 hook 是发生在更新完成之后，当前阶段组件 Dom 已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新。

## 7. beforeDestroy

这个 hook 是发生在实例销毁之前，在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如清除计时器。

## 8. destroyed

这个 hook 是发生在实例销毁之后，这个时候只剩下了 dom 空壳。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁。
