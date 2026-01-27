from typing import List


def hanoi(n, src, dst, tmp):
    """使用递归模拟汉诺塔
    1. 使用递归就需要明确其终止条件。
    2. 思考1和n-1的case，不要局限于具体展开的细节
    3. 推广到n

    1. end condition: n <= 0
    2. 从n = 2 思考，
        1). 将1从rec移动到tmp
        2). 将2从res移动到dst
        3). 将1从tmp移动到dst
    3. 推广到n
    Args:
        n (_type_): 编号
        src (_type_): 开始柱子
        dst (_type_): 目标柱子
        tmp (_type_): 中间柱子
    """
    if n <= 0:
        return
    # 操作n-1次，将disk从src移动到tmp
    hanoi(n - 1, src, tmp, dst)
    print(f"move disk:{n}, from:{src}, to:{dst}")
    hanoi(n - 1, tmp, dst, src)


def hanota(A: List[int], B: List[int], C: List[int]) -> None:
    """
    Do not return anything, modify C in-place instead.
    (Kept for reference, logic revised to iterative below)
    """
    hanota_iterative(A, B, C)


def hanota_iterative(A: List[int], B: List[int], C: List[int]) -> None:
    """
    迭代法重写 hanota (消除递归黑盒)

    # 思考与实现逻辑：
    1. **理解递归黑盒**:
       递归之所以工作，是因为系统维护了一个"调用栈"。每次函数调用时，系统会保存当
       前的参数和局部变量，然后压入栈中。当函数返回时，系统从栈顶弹出上下文继续执行。

    2. **显式栈模拟**:
       我们可以创建一个列表 (stack) 来显式地模拟这个过程。
       栈中存储每一层"递归"所需的参数状态：(n, source, target, tmpiliary)。

    3. **控制流转换 (LIFO)**:
       汉诺塔的递归步骤是：
         Step 1: hanoi(n-1, src, tmp, dst)  (移动 n-1 到缓冲区)
         Step 2: move(n, src, dst)          (移动大盘子到目标)
         Step 3: hanoi(n-1, tmp, dst, src)  (将 n-1 移回目标)

       因为栈是后进先出 (LIFO - Last In First Out) 的结构，
       我们需要按 **相反的顺序** 将任务压入栈中：
       Push Step 3 -> Push Step 2 -> Push Step 1

    4. **Base Case 处理**:
       当任务是 (n=1) 时，不再分解，直接执行移动操作。


    """
    n = len(A)
    # 栈元素元组: (盘子数, 源柱, 目标柱, 辅助柱)
    # 初始任务: 将 n 个盘子从 A 移到 C (借助 B)
    # 注意: 我们存储的是 list 对象的引用
    stack = [(n, A, C, B)]

    while stack:
        k, src, dst, tmp = stack.pop()
        if k <= 0:
            continue

        if k == 1:
            # Base Case: 只有一个盘子，直接移动
            # 注意：src.pop() 获取的是最上面的盘子（列表末尾）
            if src:
                dst.append(src.pop())
        else:
            # 递归分解: 将任务拆解为三部分，按逆序入栈

            # 3. 后续任务: 将 buffer(tmp) 上的 n-1 个盘子移到 target(dst)
            stack.append((k - 1, tmp, dst, src))

            # 2. 当前任务: 将 src 最底下的第 n 个盘子移到 target(dst)
            # 这实际上等价于移动 1 个盘子的操作
            stack.append((1, src, dst, tmp))

            # 1. 前置任务: 将 src 顶部的 n-1 个盘子移到 buffer(tmp)
            stack.append((k - 1, src, tmp, dst))


# def hanoi_simulate(A: list[int], B: list[int], C: list[int]):
#     n = len(A)
#     # 所有盘子都在A，初始最小盘位置为0 (对应names[0])
#     # 偶数个盘子时，最小盘移动顺序 A->B->C (顺时针)
#     # 奇数个盘子时，最小盘移动顺序 A->C->B (逆时针)
#     names = ["A", "B", "C"] if n % 2 == 0 else ["A", "C", "B"]
#     stacks = {"A": A, "B": B, "C": C}
#
#     small_idx = 0  # 最小盘当前在 names[small_idx]
#
#     print(f"Initial: A:{A}, B:{B}, C:{C}")
#
#     for i in range(1, 2**n):
#         if i % 2 == 1:
#             # 奇数步：移动最小盘 (顺着 order 移一步)
#             src, dst = names[small_idx], names[(small_idx + 1) % 3]
#             stacks[dst].append(stacks[src].pop())
#             small_idx = (small_idx + 1) % 3
#             print(f"Step {i}: {src}->{dst} (Small) | State: A:{A} B:{B} C:{C}")
#         else:
#             # 偶数步：移动另外两个柱子 (非最小盘)
#             # 另外两个柱子就在 small_idx 的后两个位置
#             n1, n2 = names[(small_idx + 1) % 3], names[(small_idx + 2) % 3]
#             s1, s2 = stacks[n1], stacks[n2]
#
#             # 比较栈顶，谁小移谁 (空栈视为无穷大)
#             val1 = s1[-1] if s1 else float("inf")
#             val2 = s2[-1] if s2 else float("inf")
#
#             if val1 < val2:
#                 s2.append(s1.pop())
#                 print(f"Step {i}: {n1}->{n2}        | State: A:{A} B:{B} C:{C}")
#             else:
#                 s1.append(s2.pop())
#                 print(f"Step {i}: {n2}->{n1}        | State: A:{A} B:{B} C:{C}")


if __name__ == "__main__":
    # 模拟递归
    # hanoi(2, "A", "C", "B")
    print("--- Simulation Start ---")

    # 迭代法模拟
    print("Test Case 1")
    # Test Case 1
    A = [3, 2, 1]
    B = []
    C = []
    print(f"Before: A={A}, B={B}, C={C}")
    hanota(A, B, C)
    print(f"After : A={A}, B={B}, C={C}")

    # Test Case 2
    print("Test Case 1")
    A = [1, 0]  # Example elements
    B = []
    C = []
    print(f"Before: A={A}, B={B}, C={C}")
    hanota(A, B, C)
    print(f"After : A={A}, B={B}, C={C}")
