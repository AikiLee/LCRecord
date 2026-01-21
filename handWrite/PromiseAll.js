/* 
    首先需要理解promise.all，其就是一个处理iterator promise 的东西，具体来说有如下特点：
    1. 当所有promise都被接受，则返回true
    2. 只要有一个promise被拒绝了，就返回false
    实现逻辑：
    1. 传入的是一个iterator对象（如何判断对象可迭代：`typeof obj[Symbol.iterator）=== function`只要这个对象实现了这个方法那么他就是可迭代的），那么就开始判断

    检测传入参数：
    1. 如果传的不是可迭代对象
*/