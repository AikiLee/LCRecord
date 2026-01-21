"""
最大利润贪心的商人[100分]
题目描述
商人经营一家店铺，有number种商品，由于仓库限制每件商品的最大持有数量是item[index]，每种商品的价格是item-price[item_index][day]

通过对商品的买进和卖出获取利润，请给出商人在days天内能获取的最大的利润
注：同一件商品可以反复买进和卖出

输入描述
第一行输入商品的数量number，比如3

第二行输入商品售货天数 days，比如3

第三行输入仓库限制每件商品的最大持有数量是item[index]，比如4 5 6

后面继续输入number行days列，含义如下：

第一件商品每天的价格，比如1 2 3

第二件商品每天的价格，比如4 3 2

第三件商品每天的价格，比如1 5 3

输出描述
输出商人在这段时间内的最大利润。

示例1
输入
3
3
4 5 6
1 2 3
4 3 2
1 5 2
输出
32
说明

这题出的比较简单，因为可以无限次的购买，所以只要昨天比今天便宜就买。
leetcode相关的题目：
122, 121有点不同，只能买卖一次
55
"""

import sys

number = int(sys.stdin.readline().strip())
days = int(sys.stdin.readline().strip())
stores = list(map(int, sys.stdin.readline().strip().split(" ")))


def cal_max_profit(price_list: list):
    # cal one demention array max profit
    total_profit = 0
    for i in range(1, days):
        if price_list[i] > price_list[i - 1]:
            total_profit += price_list[i] - price_list[i - 1]
    return total_profit


if number < 0 or days < 0:
    exit()

# basic logic: 1. define a function to calculate the max profit, cause commodity could buy and sell many times. 2. limits: store_limit;
max = 0
# read store info
for i in range(number):
    line = list(map(int, sys.stdin.readline().strip().split(" ")))
    cur_max = cal_max_profit(line)
    if cur_max > 0:
        max += cur_max * stores[i]

print(max)
