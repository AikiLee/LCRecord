/*
 * @lc app=leetcode.cn id=347 lang=typescript
 *
 * [347] 前 K 个高频元素
 *
 * https://leetcode.cn/problems/top-k-frequent-elements/description/
 *
 * algorithms
 * Medium (64.64%)
 * Likes:    2022
 * Dislikes: 0
 * Total Accepted:    734.5K
 * Total Submissions: 1.1M
 * Testcase Example:  '[1,1,1,2,2,3]\n2'
 *
 * 给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: nums = [1,1,1,2,2,3], k = 2
 * 输出: [1,2]
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: nums = [1], k = 1
 * 输出: [1]
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * k 的取值范围是 [1, 数组中不相同的元素的个数]
 * 题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的
 * 
 * 
 * 
 * 
 * 进阶：你所设计算法的时间复杂度 必须 优于 O(n log n) ，其中 n 是数组大小。
 * 
 */
class Heap {
    private heap: number[];
    private length: number;
    /**
     * @description 使用数组初始化一个堆
     */
    constructor(){
        this.heap = [];
    }

    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    private heapifyUp(index: number) {

    }

    private heapifyDown(index: number) {

    }

    size():number {
        return this.length;
    }

    /**
     * 
     * @returns 返回堆顶元素，如果存在则返回，否则返回undefined
     */
    peek():number | undefined {
        return this.heap[0] ? this.heap[0] : undefined;
    }

    /**
     * 
     * @param val 待插入的值
     * @description 往大根堆中插入一个元素
     */
    push(val: number): void {
        this.heap.push(val);
        // this.heapifyUp(this.heap.length - 1);
    }

    pop(): number | undefined {
        if (this.size() === 0) {
            return undefined;
        }
        this.swap(0, this.size() - 1);
        const val = this.heap.pop();
        this.heapifyDown(0);
        return val;
    }

}


// @lc code=start
function topKFrequent(nums: number[], k: number): number[] {
    /* 
    思路：
        1. 使用map，统计各个数字的出现频率。
        2. 使用heap，维护一个n-k大小的堆
    
    */

    const map = new Map<number,number>();
    // read the nums and store in map to statistic the frequency
    for (let i = 0; i < nums.length; i++) {
        const count = map.get(nums[i]) ?? 0;
        map.set(nums[i], count + 1);
    }
    
    const sortMapByValue = (map: Map<number, number>): number[] => {
        const entries = Array.from(map.entries());
        entries.sort((a,b)=> b[1] - a[1]);

        return entries.map(entry => entry[0]);
    }
    const res = sortMapByValue(map);
    return res.slice(0,k);
};
// @lc code=end
console.log(topKFrequent([1,1,1,2,2,3], 2));
