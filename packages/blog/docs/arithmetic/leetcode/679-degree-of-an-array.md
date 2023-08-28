# 第 679 题，数组的度

## [题目描述](https://leetcode-cn.com/problems/degree-of-an-array/)

给定一个非空且只包含非负数的整数数组  `nums`，数组的度的定义是指数组里任一元素出现频数的最大值。

你的任务是在 `nums` 中找到与  `nums`  拥有相同大小的度的最短连续子数组，返回其长度。

**示例 1:**

```
输入：[1, 2, 2, 3, 1]
输出：2
解释：
输入数组的度是2，因为元素1和2的出现频数最大，均为2.
连续子数组里面拥有相同度的有如下所示:
[1, 2, 2, 3, 1], [1, 2, 2, 3], [2, 2, 3, 1], [1, 2, 2], [2, 2, 3], [2, 2]
最短连续子数组[2, 2]的长度为2，所以返回2.
```

**示例 2:**

```
输入：[1,2,2,3,1,4,2]
输出：6
```

**提示:**

- `nums.length` 在 `1` 到 `50,000` 区间范围内。
- `nums[i]` 是一个在 `0` 到 `49,999` 范围内的整数。

## 解题思路

**题目大意:** 寻找 **非负数的整数数组 nums** 里 **出现频率最多次的元素** 的 **最短** 长度

**数组的度:** 数组中出现次数最多的元素的次数。

- 例如 **示例 2 [1,2,2,3,1,4,2]** 中
  - value = 1 出现 `2` 次
  - value = 2 出现 `3` 次
  - value = 3 出现 `1` 次
  - value = 4 出现 `1` 次
- 所以数组的度是 **3**

**本题可以按照两部分求解：**

- 先求原数组的度；
- 再求与原数组相同度的最短子数组。

## 哈希表

::: code-group

```ts [TypeScript]
function findShortestSubArray(nums: number[]): number {
  /**
   *          索引    总数       范围
   * Map() { index => [count, left, right] }
   */
  const hashMap: Map<number, [number, number, number]> = new Map()

  for (const [i, num] of nums.entries()) {
    if (hashMap.has(num)) {
      hashMap.get(num)[0]++
      hashMap.get(num)[2] = i
    } else {
      hashMap.set(num, [1, i, i])
    }
  }

  let maxCount = 0
  let minLen = 0
  for (const [count, left, right] of hashMap.values()) {
    const len = right - left + 1
    if (maxCount < count) {
      maxCount = count
      minLen = len
    }
    if (maxCount === count && minLen > len) {
      minLen = len
    }
  }
  return minLen
}
```

```Rust [Rust]
use std::collections::HashMap;

impl Solution {
  pub fn find_shortest_sub_array(nums: Vec<i32>) -> i32 {
    let mut hash_map = HashMap::new();
    let mut max_count = 0;

    for i in 0..nums.len() {
      let c = hash_map.entry(nums[i]).or_insert([0, i, i]);
      let [count, ini, _] = *c;
      let tmp = count + 1;
      *c = [tmp, ini, i];
      if max_count < tmp { max_count = tmp; }
    }

    // 默认让最小长度等于数组的最大长度
    let mut min_len = nums.len();
    for [count, left, right] in hash_map.values() {
      if *count == max_count {
          let leng = *right - *left + 1;
          min_len = min_len.min(leng);
          // println!("{}", leng);
      }
    }
    return min_len as i32;
 }
}
```

:::
