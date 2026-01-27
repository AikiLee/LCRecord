def hanoi_iter(src, dst, tmp, n):
    """
    核心就是维护一个调用栈，将系统栈帮我们做的事情自己处理一遍
    1. 定义一个栈来存放待处理的任务(n,src,dst,tmp)
    2. 模拟栈的控制流：
        - 递归的流程有点像树的前序遍历，在这里时先左移(n-1)，再
    Args:
        src (_type_): _description_
        tmp (_type_): _description_
        dst (_type_): _description_
        n (_type_): _description_
    """
