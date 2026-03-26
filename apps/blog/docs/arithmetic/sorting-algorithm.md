# 排序算法

`TypeScript` 实现常见的 `4` 种排序算法

- 插入排序

```ts
const insertSort = (arr: number[]) => {
  const len = arr.length

  for (let i = 1; i < len; i++) {
    const element = arr[i]
    let j = i

    while (j > 0 && arr[j - 1] > element) {
      arr[j] = arr[j - 1]
      j--
    }

    arr[j] = element
  }
  return arr
}
```

- 希尔排序

```ts
const shellSort = (arr: number[]) => {
  const len = arr.length
  let gap = 1

  while (gap < len / 3) {
    gap = gap * 3 + 1
  }

  while (gap > 0) {
    // 注意下面这段 for 循环和插入排序极为相似
    for (let i = gap; i < len; i++) {
      const temp = arr[i]
      let preIndex = i - gap

      while (preIndex >= 0 && arr[preIndex] > temp) {
        arr[preIndex + gap] = arr[preIndex]
        preIndex -= gap
      }

      arr[preIndex + gap] = temp
    }

    gap = gap >> 1
  }

  return arr
}
```

- 冒泡排序

```ts
const bubbleSort = (arr: number[]) => {
  let len = arr.length

  while (len > 0) {
    for (let i = 0; i < len - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        ;[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
      }
    }

    len--
  }

  return arr
}
```

- 选择排序

```ts
const selectionSort = (arr: number[]) => {
  const len = arr.length
  let min: number

  for (let i = 0; i < len; i++) {
    min = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[min]) {
        // 保存最小的数的小数
        min = j
      }
    }

    ;[arr[i], arr[min]] = [arr[min], arr[i]]
  }

  return arr
}
```
