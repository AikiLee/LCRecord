# 二进制与位运算学习 Roadmap

位运算（Bit Manipulation）是计算机科学的基石，也是算法面试（华为OD、LeetCode）中的高频考点。掌握它不仅能解决特定问题，还能写出高性能的代码。

以下是循序渐进的学习路线：

## Phase 1: 基础概念 (Basics)

**目标**：理解计算机如何存储数字，熟悉基本操作符。

- [x] 原码、反码、补码 (Two's Complement)
  - [x] 理解为什么计算机使用补码存储负数。
  - [x] *练习*：手动计算 `-5` 的二进制表示（假设 8 位）。

- [x] 基本位运算符
  - [x] `&` (AND): 全 1 则 1，常用于提取/掩码。
  - [x] `|` (OR): 有 1 则 1，常用于置位。
  - [x] `^` (XOR): 不同则 1（无进位加法），常用于找不同/翻转。
  - [x] `~` (NOT): 按位取反。
  - [x] `<<` (Left Shift): 左移，相当于乘 2。
  - [x] `>>` (Right Shift): 右移，相当于除 2（注意算术右移保留符号位）。

## Phase 2: 常用技巧 (Common Tricks)

**目标**：学会“骚操作”，能一行代码解决特定问题。

- [x] 判断奇偶
  - `x & 1 == 1` (奇数), `x & 1 == 0` (偶数)
- [x] 交换两个数 (不使用临时变量)
  - `a ^= b; b ^= a; a ^= b;`
- [ ] 判断是否是 2 的幂
  - `x > 0 and (x & (x - 1)) == 0`
- [ ] 消除最低位的 1
  - `x = x & (x - 1)` (Kernighan's Algorithm，用于计算汉明权重)
- [ ] 获取最低位的 1 (Lowbit)
  - `x & -x` (在树状数组 Fenwick Tree 中非常重要)
- [x] 构造掩码 (Mask)
  - 获取第 k 位：`(x >> k) & 1`
  - 将第 k 位置 1：`x | (1 << k)`
  - 将第 k 位置 0：`x & ~(1 << k)`

## Phase 3: Python 中的二进制处理

**目标**：掌握 Python 特有的处理方式（因为 Python 整数是无限精度的，负数处理有坑）。

- [x] 常用函数
  - `bin(n)`: 转二进制字符串 (`0b...`)
  - `hex(n)`: 转十六进制字符串 (`0x...`)
  - `int(str, 2)`: 二进制串转整数
  - `n.bit_length()`: 获取有效位数
- [ ] 负数陷阱
  - Python 的 `x & 0xFFFFFFFF` 用法（模拟 32 位无符号整数）。
  - *例子*：LC 371. 两整数之和。

## Phase 4: 进阶应用与编码 (Advanced & Encodings)

**目标**：理解你在题目 `ode0149.py` 中遇到的变长编码和字节序。

- [ ] 字节序 (Endianness)
  - [ ] **Big Endian (大端)**: 高位字节存在低地址 (人类阅读顺序)。
  - [ ] **Little Endian (小端)**: 低位字节存在低地址 (x86 架构，LC题目常考)。
- [ ] 变长编码 (VLQ / LEB128)
  - 即 `ode0149` 题目的原理：用每个字节的最高位 (MSB) 标记“是否还有后续”。
  - 广泛用于 Protobuf, MIDI, WebAssembly。
- [ ] 位图 (BitMap)
  - 用一个 bit 代表一种状态，极其节省空间（如 Bloom Filter）。

## Phase 5: 实战练习题 (Practice)

建议按以下顺序刷题：

### 入门

- [ ] LeetCode 136. 只出现一次的数字 (XOR 经典)
- [ ] LeetCode 191. 位1的个数 (n & n-1)
- [ ] LeetCode 231. 2 的幂
- [ ] LeetCode 338. 比特位计数 (DP + 位运算)

### 中等

- [ ] LeetCode 371. 两整数之和 (不用 + 号实现加法)
- [ ] LeetCode 137. 只出现一次的数字 II (状态机逻辑)
- [ ] LeetCode 201. 数字范围按位与

### 高阶/应用

- [ ] LeetCode 393. UTF-8 编码验证 (模拟位处理)
- [ ] LeetCode 89. 格雷编码
- [ ] 以及华为 OD 题库中的：进制转换、IP 地址转换、TLV 解析等题目。

## 推荐学习资源

- **书籍**: 《Hacker's Delight》 (位运算圣经，比较深，选读)
- **Python Module**: 玩转 `struct` 模块 (用于处理 C 结构体/二进制流)

```python
import struct
# 将整数打包为 4字节 小端
bytes_data = struct.pack('<I', 1024) 
```
