/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 *
 * https://leetcode.cn/problems/kth-largest-element-in-an-array/description/
 *
 * algorithms
 * Medium (60.83%)
 * Likes:    2717
 * Dislikes: 0
 * Total Accepted:    1.3M
 * Total Submissions: 2.2M
 * Testcase Example:  '[3,2,1,5,6,4]\n2'
 *
 * 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
 *
 * 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 *
 * 你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: [3,2,1,5,6,4], k = 2
 * 输出: 5
 *
 *
 * 示例 2:
 *
 *
 * 输入: [3,2,3,1,2,4,5,5,6], k = 4
 * 输出: 4
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= k <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number} 理解题目：乍一看很简单，但是必须要用o(n)的时间复杂度来处理该问题。常规的排序算法平均时间复杂度为nlogn.
 * 考虑使用dp+记忆化搜索
 */

// 构建最小堆类
class MinHeap {
    constructor() {
        this.heap = [];
    }
    // 交换
    swap(i1, i2) {
        let temp = this.heap[i1];
        this.heap[i1] = this.heap[i2];
        this.heap[i2] = temp;
    }
    // 获取父节点位置
    getParentIndex(i) {
        return (i - 1) >> 1;
    }
    // 获取左子节点位置
    getLeftIndex(i) {
        return 2 * i + 1;
    }
    // 获取右子节点位置
    getRightIndex(i) {
        return 2 * i + 2;
    }
    // 上移
    upShift(index) {
        if (index == 0) return;
        const parentIndex = this.getParentIndex(index);
        if (this.heap[parentIndex] > this.heap[index]) {
            this.swap(index, parentIndex);
            this.upShift(parentIndex);
        }
    }
    // 下移
    downShift(index) {
        const leftIndex = this.getLeftIndex(index);
        const rightIndex = this.getRightIndex(index);
        if (this.heap[leftIndex] < this.heap[index]) {
            this.swap(leftIndex, index);
            this.downShift(leftIndex);
        }
        if (this.heap[rightIndex] < this.heap[index]) {
            this.swap(rightIndex, index);
            this.downShift(rightIndex);
        }
    }
    // 插入
    insert(value) {
        this.heap.push(value);
        this.upShift(this.heap.length - 1);
    }
    /**
     * @return 返回删除的堆顶元素
     */
    pop() {
        this.heap[0] = this.heap.pop();
        this.downShift(0);
        return this.heap[0];
    }
    /**
     *
     * @returns 返回堆顶元素
     */
    peek() {
        return this.heap[0];
    }
    /**
     *
     * @returns 返回堆中元素个数
     */
    size() {
        return this.heap.length;
    }
}

var findKthLargest = function (nums, k) {
    /* 
    1.自己建堆来处理：
        已知数组，直接原地建堆 ✖ 不适合，这个堆维护的是固定元素
    2. 边输入边建堆
   */

};
// @lc code=end
// console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));     //expected 5
// console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); //expected 4
console.log(findKthLargest([1, 1, 1, 2, 2, 3], 2));
console.log(findKthLargest([1], 1));
