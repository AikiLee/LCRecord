/*
 * @lc app=leetcode.cn id=199 lang=javascript
 *
 * [199] 二叉树的右视图
 *
 * https://leetcode.cn/problems/binary-tree-right-side-view/description/
 *
 * algorithms
 * Medium (70.09%)
 * Likes:    1202
 * Dislikes: 0
 * Total Accepted:    608.3K
 * Total Submissions: 860.2K
 * Testcase Example:  '[1,2,3,null,5,null,4]'
 *
 * 给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,2,3,null,5,null,4]
 *
 * 输出：[1,3,4]
 *
 * 解释：
 *
 *
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1,2,3,4,null,null,null,5]
 *
 * 输出：[1,3,4,5]
 *
 * 解释：
 *
 *
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = [1,null,3]
 *
 * 输出：[1,3]
 *
 *
 * 示例 4：
 *
 *
 * 输入：root = []
 *
 * 输出：[]
 *
 *
 *
 *
 * 提示:
 *
 *
 * 二叉树的节点个数的范围是 [0,100]
 * -100 <= Node.val <= 100
 *
 *
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
    /* 
    想法：层序，每层仅展示最后一个节点
    js实现queue，使用数组的push/shift实现
   */
    // const res = [];
    // const queue = [];
    // if (root) {
    //     queue.push(root); //根节点进队列
    // }
    // while (queue.length > 0) {
    //     const levelSize = queue.length;
    //     let lastNodeVal;
    //     for (let i = 0; i < levelSize; i++) {
    //         const node = queue.shift();
    //         lastNodeVal = node.val;
    //         if (node.left) {
    //             queue.push(node.left);
    //         }
    //         if (node.right) {
    //             queue.push(node.right);
    //         }
    //     }
    //     res.push(lastNodeVal);
    // }
    // return res;

    // 使用dfs方法,核心思想：后进先出，当第一次遇到子节点，实际上是当前层次最后一个节点
    const ans = [];

    const dfs = (node,depth) => {
        if (!node) {
            // 为空返回
            return;
        }
        if (depth === ans.length) {
            ans.push(node.val);
        }
        dfs(node.right,depth+1); //这里是有讲究的，要先右再左，保证，第一个返回的是最后一个节点
        dfs(node.left,depth+1);
    };
    dfs(root,0);
    return ans;



};

const array2binary = (arr) => {
    if (!arr || !arr.length) {
        return null;
    }
    let index = 0;
    const queue = [];
    const len = arr.length;
    const head = new TreeNode(arr[index]);
    queue.push(head);

    while (index < len) {
        index++;
        const parent = queue.shift();
        if (arr[index] !== null && arr[index] !== undefined) {
            const node = new TreeNode(arr[index]);
            parent.left = node;
            queue.push(node);
        }

        index++;
        if (arr[index] !== null && arr[index] !== undefined) {
            const node = new TreeNode(arr[index]);
            parent.right = node;
            queue.push(node);
        }
    }
    return head;
};

const isEmpty = (queue) => {
    return queue.length === 0;
};

const input = array2binary([1, 2, 3, null, 5, null, 4]);

// @lc code=end
console.log(rightSideView(input));
