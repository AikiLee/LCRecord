# def triangles():
#     L = [1]
#     yield L
#     while True:
#         # 这里自然排除了L为1的情况
#         L = [1] + [ L[i] + L[i+1] for i in range(len(L)-1) ] + [1]
#         yield L
        
from collections.abc import Iterable           
from functools import reduce
# # 期待输出:
# # [1]
# # [1, 1]
# # [1, 2, 1]
# # [1, 3, 3, 1]
# # [1, 4, 6, 4, 1]
# # [1, 5, 10, 10, 5, 1]
# # [1, 6, 15, 20, 15, 6, 1]
# # [1, 7, 21, 35, 35, 21, 7, 1]
# # [1, 8, 28, 56, 70, 56, 28, 8, 1]
# # [1, 9, 36, 84, 126, 126, 84, 36, 9, 1]
# n = 0
# results = []
# for t in triangles():
#     results.append(t)
#     n = n + 1
#     if n == 10:
#         break

# for t in results:
#     print(t)

# if results == [
#     [1],
#     [1, 1],
#     [1, 2, 1],
#     [1, 3, 3, 1],
#     [1, 4, 6, 4, 1],
#     [1, 5, 10, 10, 5, 1],
#     [1, 6, 15, 20, 15, 6, 1],
#     [1, 7, 21, 35, 35, 21, 7, 1],
#     [1, 8, 28, 56, 70, 56, 28, 8, 1],
#     [1, 9, 36, 84, 126, 126, 84, 36, 9, 1]
# ]:
#     print('测试通过!')
# else:
#     print('测试失败!')


# 列表生成器
# L = []
# for i in range(0,11):
#     L.append(i*i)

# 可以用更加简便的方法，本质就是一个语法糖， for之前为返回值，
# print([ x * x for x in range(0,11)])
# 但是
# print(isinstance([],Iterable))
# print(isinstance({},Iterable))
# print(isinstance("abc",Iterable))

# map/reduce

def f(x):
    return x*x
r = map(f,[1,2,3])

for i in r:
    print(i)
    
print(list(r))

arr = [1,2,3,4,5]

def add(x,y):
    return x+y

def from_numberarray_to_number(x,y):
    return x*10 + y
print(reduce(from_numberarray_to_number,arr))

def char2num(s):
    digits = {
        "0":0,
        "1":1,
        "2":2,
        "3":3,
        "4":4,
        "5":5,
        "6":6,
        "7":7,
        "8":8,
        "9":9
    }
    return digits[s]

print(reduce(from_numberarray_to_number,map(char2num,"321")))