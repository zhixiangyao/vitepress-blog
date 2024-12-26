# 第1题-两数之和

## [题目描述](https://leetcode.cn/problems/two-sum/)

给定一个整数数组 `nums` 和一个目标值 `target`，请你在该数组中找出和为目标值的那 `两个` 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

**示例:**

```
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

## 暴力法

- 第一层 `for` 循环获取 `[0]` 到 `[length - 1]` 的 `i` 索引值
- 第二层 `for` 循环获取 `[1]` 到 `[length]` 的 `j` 索引值
- 如果 `num[i] + num[j]` 等于 目标值，且 `i` 和 `j` 的值不相等 就返回 `[i, j]`

```js
/**
 * @param {Array} nums
 * @param {Array} target
 * @return {Array}
 */
const twoSum = (nums, target) => {
  const length = nums.length

  // 1. 第一层for循环
  for (let i = 0; i < length - 1; i++) {
    // 2. 第二层for循环
    for (let j = 1; j < length; j++) {
      // 3. 判断 nums[i] + nums[j] 的值是否 === target
      if (nums[i] + nums[j] === target) {
        // 4. 数组中同一个元素不能使用两遍。
        if (i !== j) {
          return [i, j]
        }
      }
    }
  }
  return 0
}
```

## 哈希法

- `new Map` 创建一个哈希表
- `for` 循环遍历数组
- `if` 判断： 如果在哈希表里找到 `target - nums[i]` 的值
- 返回 `[map.get(nums[i]), i]`
- 否则 `map.set(target - nums[i], i)`

### 给定 nums = [2, 5, 7, 11, 15]， target = 9

| need(需要值)         | index(索引) |
| -------------------- | ----------- |
| target - nums[0] = 7 | 0           |
| target - nums[1] = 4 | 1           |

- 第二次循环时 `map.has(nums[2])` 是 `true`
- 返回 `[0, 2]`

```js
/**
 * @param {Array} nums
 * @param {Array} target
 * @return {Array}
 */
const twoSum = (nums, target) => {
  // 1. 构造哈希表
  const map = new Map() // 存储方式 {need, index}

  // 2. 遍历数组
  for (let i = 0; i < nums.length; i++) {
    // 2.1 如果找到 target - nums[i] 的值
    if (map.has(nums[i])) {
      return [map.get(nums[i]), i]
    } else {
      // 2.2 如果没找到则进行设置
      map.set(target - nums[i], i)
    }
  }
}
```
