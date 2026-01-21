/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {

    const n = temperatures.length;
    const stk = []; //只存下标
    const res = new Array(n).fill(0);
    /**
    局部最值，很自然的想到使用栈来处理
    
     */
    for (let i = 0; i < n; i++) {
        // 更新，当栈不为空，且入栈元素大于栈顶
        while(stk.length != 0 && temperatures[i] > temperatures[stk.at(-1)]){
            // 获取上一个最值的位置
            const idx = stk.pop();
            res[idx] = i - idx;
        }
        stk.push(i);
    }
    return res;
};

console.log(dailyTemperatures([73,74,75,71,69,72,76,73])) //expected [1,1,4,2,1,1,0,0]