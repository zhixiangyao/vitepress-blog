# [译] 利用 `React 18` 中引入的 `startTransition` API，即使在大屏幕更新时也能保持 `React` 应用程序的响应速度

::: warning

本问内容为翻译 `Chetan Gawai` 的 [`Keep the React app responsive even during large screen updates with startTransition API introduced in React 18`](https://blog.saeloun.com/2021/09/09/react-18-introduces-startTransition-api/)

:::

`React 18` 最重要的更新是并发渲染。并发是指通过确定任务的优先级来同时执行多个任务的能力。`Dan Abramov` 通过一个简单的[电话类比](https://github.com/reactwg/react-18/discussions/46#discussioncomment-846786)很好地解释了这一概念。

`React 18` 公开了一些 API，允许用户对并发性进行一些控制。其中之一就是 `startTransition` API，它表示包在 `startTransition` 中的操作可能需要时间。

让我们详细了解一下 `startTransition` API。

有时，我们会遇到一些应用程序由于繁重或复杂的操作而变得反应迟钝。

例如，我们要从一个大列表中搜索一张照片。当我们在搜索输入框中键入照片名称时，我们希望键入的字符能毫无延迟地出现在屏幕上。当我们不能快速看到字符时，我们脑海中出现的第一个反应就是 _"啊，这个应用程序太慢了！"_，这让我们感到沮丧。

<ZoomImg src="/search_before_startTransition.gif" class="w-fill"  />

## 为什么搜索会有点延迟？

让我们看一下代码。

::: code-group

```jsx:line-numbers {2,15-18} [SearchPhotos.jsx]
import React, { useState } from 'react'
import PhotoCard from './PhotoCard'
import { Container, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const SearchPhotos = () => {
  const useStyles = makeStyles({
    container: {
      marginTop: '100px',
    },
  })
  const [title, setPhotoTitle] = useState('')
  const classes = useStyles()

  const onChange = (e) => {
    // Urgent update
    setPhotoTitle(e.target.value)
  }

  return (
    <Container className={classes.container}>
      <TextField
        id="standard-basic"
        label="Search by photo title"
        onChange={onChange}
        value={title}
      />
      <PhotoCard searchParam={title} />
    </Container>
  )
}

export default SearchPhotos
```

```jsx:line-numbers {19-24} [PhotoCard.jsx]
import React, { useEffect, useState } from 'react'
import photosJson from './photos.json'
import PhotoListCard from './PhotoListCard'

const PhotoCard = React.memo(({ searchParam }) => {
  const [photos, setPhotos] = useState()

  const fetchPhotos = (title) => {
    return new Promise((res) => {
      setTimeout(() => {
        if (!title) {
          return res(photosJson)
        }
        return res(photosJson.filter((photo) => photo.title.includes(title)))
      }, 500)
    })
  }

  useEffect(() => {
    fetchPhotos(searchParam).then((res) => {
      // Non-urgent update
      setPhotos(res)
    })
  }, [searchParam])

  const photoData = photos?.map((p) => ({
    key: p.id,
    name: p.title,
    thumbnailUrl: p.thumbnailUrl,
  }))

  return <PhotoListCard data={photoData} />
})

export default PhotoCard
```

:::

每当用户在搜索中键入照片名称时，都需要进行两次不同的更新。

首先，我们将输入的值保存在状态中。

```jsx:line-numbers
const onChange = (e) => {
  // Urgent update
  setPhotoTitle(e.target.value)
}
```

然后，我们利用存储的值来搜索照片。

```jsx:line-numbers
useEffect(() => {
  fetchPhotos(searchParam).then((res) => {
    // Non-urgent update
    setPhotos(res)
  })
}, [searchParam])
```

第一次更新是**紧急更新**，目的是更改输入字段的值并显示输入的字符。第二个更新是显示结果。

在 `React 18` 之前，所有更新都被视为**紧急更新**。虽然用户认为显示搜索结果可能需要时间，但两个更新会同时呈现。这将阻止用户看到反馈，使其感觉有点反应迟钝。

## 使用优先更新 `startTransition` API 来改善用户交互体验。

新的 `startTransition` API 有助于将更新分为 `紧急` 和 `非紧急` 两种。点击、选择等需要立即响应的事件应视为紧急事件。显示搜索结果、文本高亮等其他不需要立即响应的更新可标记为过渡或非紧急更新。这可以通过将过渡包入 `startTransition` 来实现。

```jsx:line-numbers
const onChange = (e) => {
  const value = e.target.value
  setPhotoTitle(value)
  startTransition(() => {
    setSearchQuery(value)
  })
}
```

<ZoomImg src="/search_after_startTransition.gif" class="w-fill"  />

## 我们可以使用 `setTimeout` 来代替 `startTransition` API 吗？

我们会考虑使用 `setTimeout` 来延迟搜索结果，如下所示

```jsx:line-numbers
const onChange = (e) => {
  const value = e.target.value
  setPhotoTitle(value)
  setTimeout(() => {
    setSearchQuery(value)
  }, 0)
}
```

`Debouncing`（防抖）和 `Throttling`（节流）当然也可以使用其他技术。

让我们看看使用 `startTransition` 比其他选项的优势。

与 `setTimeout` 不同的是，`startTransition` 不会在稍后进行调度。传递给 `startTransition` 的函数会同步运行，但其中的任何更新都会被标记为 `过渡`。`React` 会根据这些信息决定如何呈现更新。

与使用 `setTimeout` 包装的情况相比，`React` 会更早开始呈现更新。在速度快的设备上，两次更新之间会有一点延迟。而在慢速设备上，延迟会更大，但用户界面仍会保持响应。

## 如何处理待定的过渡？

为了让用户了解正在进行的后台工作，`React` 提供了 `isPending` 标志，允许我们在用户等待时显示一个 Loading。

我们可以如下所示修改 `SearchPhotos` 组件，以显示 `Loading`。

```jsx:line-numbers
const SearchPhotos = () => {
  const useStyles = makeStyles({
    container: {
      marginTop: '100px',
    }
  });
  const [title, setPhotoTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const classes = useStyles();

  const onChange = (e) => {
    const value = e.target.value;
    setPhotoTitle(value);
    startTransition(() => {
      setSearchQuery(value);
    });
  };

  return (
    <Container className={classes.container}>
      <TextField id="standard-basic" label="Search by photo title" onChange={onChange} value={title}/>
      {isPending && <LinearProgress/>}
      <PhotoCard searchParam={searchQuery} />
    </Container>
  );
};
```

我们发现了关于以下主题的一些有趣的讨论

- [加入 `React.startTransition` 和 `useTransition` 的原因](https://github.com/reactwg/react-18/discussions/41#discussioncomment-841327)
- [`startTransition` 中的批处理](https://github.com/reactwg/react-18/discussions/41#discussioncomment-855674)

要了解有关 `startTransition` API 的更多信息，请查看 [`React working groups` 讨论](https://github.com/reactwg/react-18/discussions/41) 和有关 [`startTransition` API 行为的快速概述](https://github.com/facebook/react/issues/21649)。
