# Python `sorted()` 学习 Roadmap

`sorted()` 是 Python 中最核心的排序工具。它不仅是面试高频考点，更是解决"多条件排序"类问题的关键武器。掌握它的底层逻辑（Timsort, 稳定排序）和灵活的 `key` 参数，能让你举一反三。

以下是循序渐进的学习路线：

## Phase 1: 基础——默认排序与元组比较

**目标**：理解 `sorted()` 的默认行为，知道"为什么不写 key 也能排"。

- [x] `sorted()` vs `list.sort()`
  - `sorted()` 返回新列表，原列表不变（纯函数）。
  - `list.sort()` 原地排序，返回 `None`。
  - *经验法则*：需要保留原列表时用 `sorted()`，否则 `.sort()` 更省内存。

- [x] 默认排序规则
  - 数字：按数值大小。
  - 字符串：按字典序（逐字符比较 Unicode 码点）。
  - 元组/列表：**字典序比较**——先比第一个元素，相同则比第二个，以此类推。

  ```python
  # 元组的字典序比较
  sorted([(2, 'b'), (1, 'c'), (2, 'a')])
  # => [(1, 'c'), (2, 'a'), (2, 'b')]
  # 先按第一个元素升序，第一个相同时按第二个元素升序
  ```

- [x] `reverse=True`
  - 所有比较结果取反，实现全局降序。

## Phase 2: `key` 参数——单条件自定义排序

**目标**：掌握 `key` 的本质——"把每个元素映射成一个可比较的值"。

- [x] `key` 的工作原理
  - `sorted()` 对每个元素调用 `key(element)`，得到一个"代理值"。
  - 排序时比较的是代理值，而不是原始元素。
  - 元素本身不需要支持比较运算，只要代理值支持即可。

  ```python
  # 按字符串长度排序
  sorted(["banana", "pie", "Washington"], key=len)
  # => ['pie', 'banana', 'Washington']
  
  # 按绝对值排序
  sorted([-5, 3, -2, 7], key=abs)
  # => [-2, 3, -5, 7]
  ```

- [x] 常用内置函数作为 `key`
  - `len`：按长度排序
  - `abs`：按绝对值排序
  - `str.lower`：忽略大小写排序
  - `int`：字符串按数值排序（如 `sorted(["10", "2", "1"], key=int)`）

## Phase 3: `key` 进阶——多条件排序 (Tuple Key)

**目标**：能灵活处理"先按 A 排，A 相同再按 B 排"的场景。

- [x] 核心技巧：`key` 返回元组
  - 利用元组的字典序比较，天然实现多级排序。

  ```python
  students = [("Alice", 90), ("Bob", 85), ("Charlie", 90)]
  # 先按分数降序，分数相同按姓名升序
  sorted(students, key=lambda x: (-x[1], x[0]))
  # => [('Alice', 90), ('Charlie', 90), ('Bob', 85)]
  ```

- [x] **取反技巧（数值型）**
  - 升序：直接用 `x[i]`
  - 降序：用 `-x[i]`（仅适用于数值！）

- [ ] 字符串降序的处理方法
  - 字符串不能简单取负。常用两种方案：
  - 方案一：多次稳定排序（利用 Timsort 的稳定性）

    ```python
    # 先按次要条件排序，再按主要条件排序
    data = sorted(data, key=lambda x: x[0])        # 次要：名字升序
    data = sorted(data, key=lambda x: -x[1])        # 主要：分数降序
    ```

  - 方案二：字符级取反（不常用，但面试可能问到）

    ```python
    # 将每个字符的 ord 值取反，构造一个可比较的元组
    sorted(words, key=lambda s: tuple(-ord(c) for c in s))
    ```

## Phase 4: `functools.cmp_to_key`——自定义比较函数

**目标**：处理"无法用 key 简单映射"的排序逻辑。

- [x] 什么时候需要自定义比较？
  - 当两个元素的大小关系依赖于**它们之间的组合结果**，而不是各自的独立属性时。
  - 典型场景：LeetCode 179（最大数）——比较 `a+b` 和 `b+a` 的拼接结果。

- [ ] `cmp_to_key` 用法

  ```python
  from functools import cmp_to_key

  def compare(a, b):
      # 返回负数：a 排在 b 前面
      # 返回正数：a 排在 b 后面
      # 返回 0：  a 和 b 相等
      if a + b > b + a:
          return -1
      elif a + b < b + a:
          return 1
      else:
          return 0

  nums = ["3", "30", "34", "5", "9"]
  sorted(nums, key=cmp_to_key(compare))
  # => ['9', '5', '34', '3', '30'] -> "9534330"
  ```

- [ ] `cmp_to_key` vs `key`
  - `key` 是 O(n) 次调用，更高效。
  - `cmp_to_key` 本质上是 O(n log n) 次两两比较，性能稍差。
  - *原则*：能用 `key` 解决的，不要用 `cmp_to_key`。

## Phase 5: 排序的稳定性与高级技巧

**目标**：理解 Timsort 的稳定性如何被利用，以及排序在数据结构中的延伸应用。

- [ ] 稳定排序 (Stable Sort)
  - Python 的 `sorted()` 和 `list.sort()` 都保证稳定性。
  - 含义：如果两个元素"相等"（key 相同），它们在排序后保持原始相对顺序。
  - 这意味着可以用**多次排序**替代**多条件 key**（见 Phase 3）。

- [ ] `operator` 模块加速
  - `operator.itemgetter()` 比 `lambda` 稍快（底层 C 实现）。

  ```python
  from operator import itemgetter
  sorted(students, key=itemgetter(1))  # 等价于 key=lambda x: x[1]
  sorted(students, key=itemgetter(1, 0))  # 多条件
  ```

  - `operator.attrgetter()` 用于对象属性排序。

  ```python
  from operator import attrgetter
  sorted(employees, key=attrgetter('salary'))
  ```

- [ ] 排序相关数据结构
  - `heapq`：堆排序，适用于 Top-K 问题（不需要全排序）。
  - `bisect`：二分插入，维护有序列表。
  - `collections.Counter.most_common()`：内部用堆实现 Top-K 频率统计。

## Phase 6: 实战练习题 (Practice)

建议按以下顺序刷题，每道题目标注了需要用到的 `sorted()` 知识点：

### 入门：单条件排序

- [ ] LeetCode 242. 有效的字母异位词
  - 知识点：`sorted(string)` 字符排序
  - 链接：[LeetCode 242](https://leetcode.cn/problems/valid-anagram/)

- [ ] LeetCode 349. 两个数组的交集
  - 知识点：排序 + 双指针（或集合法）
  - 链接：[LeetCode 349](https://leetcode.cn/problems/intersection-of-two-arrays/)

- [ ] LeetCode 88. 合并两个有序数组
  - 知识点：归并排序思想（虽然可以直接 `sorted()`，但面试要求原地合并）
  - 链接：[LeetCode 88](https://leetcode.cn/problems/merge-sorted-array/)

### 中等：多条件排序 / key 参数

- [ ] LeetCode 56. 合并区间 ⭐
  - 知识点：`sorted(intervals, key=lambda x: x[0])`，按起点排序后贪心合并
  - 链接：[LeetCode 56](https://leetcode.cn/problems/merge-intervals/)

- [ ] LeetCode 452. 用最少数量的箭引爆气球
  - 知识点：按区间终点排序，贪心
  - 链接：[LeetCode 452](https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/)

- [ ] LeetCode 1636. 按照频率将数组升序排序 ⭐
  - 知识点：`key=lambda x: (freq[x], -x)` 多条件元组 key
  - 链接：[LeetCode 1636](https://leetcode.cn/problems/sort-array-by-increasing-frequency/)

- [ ] LeetCode 937. 重新排列日志文件
  - 知识点：多条件 key + 分类排序
  - 链接：[LeetCode 937](https://leetcode.cn/problems/reorder-data-in-log-files/)

- [ ] LeetCode 853. 车队
  - 知识点：按起始位置降序排序，然后模拟
  - 链接：[LeetCode 853](https://leetcode.cn/problems/car-fleet/)

### 进阶：自定义比较 / cmp_to_key

- [ ] LeetCode 179. 最大数 ⭐⭐
  - 知识点：`cmp_to_key`，比较 `a+b` vs `b+a`
  - 链接：[LeetCode 179](https://leetcode.cn/problems/largest-number/)

- [ ] LeetCode 791. 自定义字符串排序
  - 知识点：按自定义字母表顺序排序
  - 链接：[LeetCode 791](https://leetcode.cn/problems/custom-sort-string/)

- [ ] LeetCode 1122. 数组的相对排序
  - 知识点：按另一个数组的顺序排序
  - 链接：[LeetCode 1122](https://leetcode.cn/problems/relative-sort-array/)

### 综合应用：排序 + 其他算法

- [ ] LeetCode 215. 数组中的第K个最大元素
  - 知识点：排序（或堆/快速选择）
  - 链接：[LeetCode 215](https://leetcode.cn/problems/kth-largest-element-in-an-array/)

- [ ] LeetCode 347. 前 K 个高频元素
  - 知识点：`Counter` + 排序（或桶排序/堆）
  - 链接：[LeetCode 347](https://leetcode.cn/problems/top-k-frequent-elements/)

- [ ] LeetCode 692. 前K个高频单词 ⭐
  - 知识点：`key=lambda x: (-freq[x], x)` 频率降序 + 字典序升序
  - 链接：[LeetCode 692](https://leetcode.cn/problems/top-k-frequent-words/)

- [ ] LeetCode 621. 任务调度器
  - 知识点：频率排序 + 贪心
  - 链接：[LeetCode 621](https://leetcode.cn/problems/task-scheduler/)

### 华为 OD 机试题

以下题目在华为 OD 中需要灵活运用 `sorted()`：

- [ ] 运维日志排序 (100分)
  - 知识点：多条件排序
  - 链接：[hydro ode0048](https://hydro.ac/d/coder_gather/p/ode0048)

- [ ] 评委评分 (100分)
  - 知识点：排序后去掉最高最低分
  - 链接：[hydro ode0128](https://hydro.ac/d/coder_gather/p/ode0128)

- [ ] 统计射击比赛成绩 (100分) ⭐
  - 知识点：多条件排序（总分降序 + 某个维度升序）
  - 链接：[hydro odb0067](https://hydro.ac/d/coder_gather/p/odb0067)

- [ ] 商品推荐多属性排序 (100分) ⭐⭐
  - 知识点：多属性排序的典型应用，需要构造元组 key
  - 链接：[hydro oda0123](https://hydro.ac/d/coder_gather/p/oda0123)

- [ ] 高矮个子排队 (100分)
  - 知识点：贪心 + 排序
  - 链接：[hydro ode0017](https://hydro.ac/d/coder_gather/p/ode0017)

- [ ] 打印机队列 (100分) 🔥
  - 知识点：优先队列，本质是排序 + 队列模拟
  - 链接：[hydro oda0004](https://hydro.ac/d/coder_gather/p/oda0004)

- [ ] 热点网站统计 (100分) 🔥
  - 知识点：频率统计 + 多条件排序（频率降序 + 字典序升序）
  - 链接：[hydro ode0034](https://hydro.ac/d/coder_gather/p/ode0034)

- [ ] 执行任务赚积分 (100分) 🔥
  - 知识点：按截止时间排序 + 贪心
  - 链接：[hydro ode0202](https://hydro.ac/d/coder_gather/p/ode0202)

- [ ] 文件存储系统的排序 (100分)
  - 知识点：自定义排序规则（文件名排序，类似自然排序）
  - 链接：[hydro odb0072](https://hydro.ac/d/coder_gather/p/odb0072)

## 推荐学习路径

1. 先刷 Phase 6 中的"入门"和"中等"题目，巩固 `key` 参数的使用。
2. 重点攻克 LeetCode 179（`cmp_to_key` 的经典题），这道题单独拎出来理解透。
3. 华为 OD 题中，"商品推荐多属性排序"和"统计射击比赛成绩"是最贴合 `sorted()` 练习的题目，优先做。
4. 最后做"综合应用"部分，体会排序如何与堆、贪心、哈希表配合使用。
