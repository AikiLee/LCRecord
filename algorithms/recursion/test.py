from typing import List


class Solution:
    def hanota(self, A: List[int], B: List[int], C: List[int]) -> None:
        def hanoi_iter(src, dst, tmp):
            n = len(src)
            stk = [(n, src, tmp, dst)]

            while stk:
                k, src, dst, tmp = stk.pop()
                # when k == 1 , really move the elem
                if k <= 0:
                    continue
                if k == 1:
                    if src:
                        dst.append(src.pop())
                else:
                    # mock recursion
                    # step1: (n-1,src,tmp,dst)
                    # step2: move
                    # step3: (n-1,tmp,dst,src)
                    # but in stk, we should append these by order: 3,2,1
                    stk.append((k - 1, tmp, dst, src))
                    # move, enter k == 1 case
                    stk.append((1, src, dst, tmp))
                    stk.append((k - 1, src, tmp, dst))

        hanoi_iter(A, B, C)


if __name__ == "__main__":
    solution = Solution()
    print(solution.hanota([2, 1, 0], [], []))
