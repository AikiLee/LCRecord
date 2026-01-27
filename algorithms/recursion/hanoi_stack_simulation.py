def hanoi_manual_stack(n):
    # 1. 模拟系统栈 (System Stack)
    # 每一个元素是一个“任务帧”，包含：(任务类型, n, src, dst, tmp)
    # 任务类型: 'CALL' 表示函数调用, 'MOVE' 表示实际移动指令
    # 初始任务：调用 hanoi(n, A, C, B)
    call_stack = [("CALL", n, "A", "C", "B")]

    # 2. 模拟三个柱子 (Pegs)，用来验证结果
    # 初始状态：A柱有 n 个盘子 (大底小顶)，B、C为空
    pegs = {"A": list(range(n, 0, -1)), "B": [], "C": []}  # [3, 2, 1]

    print(f"Initial State: {pegs}")
    print("-" * 30)

    # 循环直到栈为空（代表所有递归任务处理完毕）
    while call_stack:
        # 弹出一个任务 (LIFO - 后进先出)
        task = call_stack.pop()
        action, count, src, dst, tmp = task

        if action == "MOVE":
            # --- 实际干活 (Base execution) ---
            # 这是一个具体的移动指令，直接执行
            disk = pegs[src].pop()
            pegs[dst].append(disk)
            print(f"执行指令: Move disk {disk} from {src} to {dst}")
            print(f"当前状态: {pegs}")

        elif action == "CALL":
            # --- 递归分解 (Recursive step) ---
            # 如果是调用任务，根据 n 的大小决定是直接移动还是继续分解

            if count == 1:
                # Base Case: 只有一个盘子，直接根据 src/dst 生成移动指令
                # 注意：这里我们把它转化为 MOVE 指令，放入栈中（或者直接执行也可以，但为了统一步骤放入栈）
                # disk ID 并不需要在 CALL 中传递，因为 pop 的时候自然是该柱子最上面的
                call_stack.append(("MOVE", 1, src, dst, tmp))
            else:
                # Recursive Step: 分解为三步
                # 栈是后进先出，所以我们需要 **反向压栈**

                # 第3步：把 n-1 个盘子从 tmp 移回 dst (需要最后执行，所以最先入栈)
                call_stack.append(("CALL", count - 1, tmp, dst, src))

                # 第2步：把第 n 个盘子(当前的底座) 从 src 移到 dst
                # 注意：这是实际的移动，不是递归调用
                call_stack.append(("MOVE", count, src, dst, tmp))

                # 第1步：把 n-1 个盘子从 src 移到 tmp (需要最先执行，所以最后入栈)
                call_stack.append(("CALL", count - 1, src, tmp, dst))


if __name__ == "__main__":
    hanoi_manual_stack(3)
