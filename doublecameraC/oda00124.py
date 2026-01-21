"""
https://hydro.ac/d/coder_gather/p/oda0124
题目描述
在一个采购系统中，采购申请(PR)需要经过审批后才能生成采购订单(PO)。每个PR包含商品的单价(假设相同商品的单价一定是一样的)及数量信息。系统要求对商品进行分类处理:单价高于100元的商品需要单独处理，单价低于或等于100元的相同商品可以合并到同一采购订单PO中。针对单价低于100的小额订单，如果量大可以打折购买。

具体规则如下：

如果PR状态为"审批通过"，则将其商品加入到PO中。如果PR的状态为"审批拒绝"或"待审批"，则忽略改PR。

对于单价高于100元的商品，每个商品单独生成一条PO记录。对于单价低于100元的商品，将相同商品的数量合并到一条PO记录中。

如果商品单价<100且商品数量>=100，则单价打9折。

输入描述
第一行包含整数N，表示PR的数量。

接下来N行，每行包含五个用空格分割的整数，按顺序表示：商品ID,数量，单价，PR状态(0表示审批通过，1表示审批拒绝，2表示待审批)

输出描述
输出若干行，每行表示一条PO记录，按以下格式输出：

对于单价高于100元的商品：商品ID 数量 单价

对于单价低于或等于100元的商品： 商品ID 总数量 打折后的单价(向上取整)

输出的PO记录按商品ID升序升序排列，相同商品按照数量降序排列

补充
2 <= n <= 1000
1 <= 商品价格 <= 200
1 <= 商品数量 <= 1000
2 <= 商品编号 <= 1000

输入：
N
2
商品ID 数量 单价 审批状态(0通过/1拒绝/2待审批)
1 200 90 0
2 30 101 0
输出：
商品ID 总数量 价格（包含打折后的）
1 200 81
2 30 101


输入：
3
1 10 90 0
1 5 90 0
2 8 120 0
输出：
1 15 90
2 8 120
"""

import sys
import math

N = int(sys.stdin.readline())
commodity_ids = []
commodity_amounts = []
commodity_prices = []


for _ in range(N):
    # 基本处理思路：首先看审批状态，只有为零才处理。看单价，大于100直接独立生成一个订单，其他的不用处理。然后看小于等于100的，如果有id相同的订单就合并，数量超过100打九折
    line = sys.stdin.readline().strip()
    id, amount, price, state = map(int, line.split())
    if int(state) == 0:
        if int(price) > 100:
            commodity_ids.append(id)
            commodity_amounts.append(amount)
            commodity_prices.append(price)

        elif price < 1 or price > 200:
            continue
        else:
            if commodity_ids.count(int(id)):
                # 价格<=100,且有重复的id，开始合并
                index = commodity_ids.index(id)
                commodity_amounts[index] += amount
            else:
                # 没有相同的id，直接添加
                commodity_ids.append(id)
                commodity_amounts.append(amount)
                commodity_prices.append(price)

res = []
for pid, amt, prc in zip(commodity_ids, commodity_amounts, commodity_prices):
    final_price = prc
    if prc < 100 and amt >= 100:
        final_price = math.ceil(prc * 0.9)
    res.append((pid, amt, final_price))

res.sort(key=lambda x: (x[0], -x[1]))
for pid, amt, prc in res:
    print(f"{pid} {amt} {prc}")

# 这一题逻辑很简单，但是输入输出处理了很长时间
