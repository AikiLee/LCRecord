class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        # 先使用最笨的方法，时间复杂度约为O(n2)，依次比较
        # 超时，这时考虑新的方法，能不能在循环过程中，找到当前的min值，说实话这个思路类似于选择排序了
        max_profit = 0
        min_price = prices[0]
        for p in prices:
            max_profit = max(max_profit, p - min_price)
            # 如果先算最小价格的话，
            min_price = min(min_price, p)

        return max_profit


if __name__ == "__main__":
    solution = Solution()
    print(solution.maxProfit([7, 1, 5, 3, 6, 4]))
