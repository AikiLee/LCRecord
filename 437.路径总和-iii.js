/*
 * @lc app=leetcode.cn id=437 lang=javascript
 *
 * [437] 路径总和 III
 *
 * https://leetcode.cn/problems/path-sum-iii/description/
 *
 * algorithms
 * Medium (47.59%)
 * Likes:    2073
 * Dislikes: 0
 * Total Accepted:    441.6K
 * Total Submissions: 924.5K
 * Testcase Example:  '[10,5,-3,3,2,null,11,3,-2,null,1]\n8'
 *
 * 给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。
 *
 * 路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
 * 输出：3
 * 解释：和等于 8 的路径有 3 条，如图所示。
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
 * 输出：3
 *
 *
 *
 *
 * 提示:
 *
 *
 * 二叉树的节点个数的范围是 [0,1000]
 * -10^9
 * -1000
 *
 *
 */

// @lc code=start

//   Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

// 将数组转化为二叉树,基于层序遍历
const makeTree = (arr) => {
    if (arr.length === 0) return null;
    let root = new TreeNode(arr[0]);
    let index = 1;
    const queue = [root];
    while (index < arr.length) {
        const front = queue.shift();
        if (arr[index] !== null) {
            front.left = new TreeNode(arr[index]);
            queue.push(front.left);
        }
        index++;
        if (arr[index] !== null && index < arr.length) {
            front.right = new TreeNode(arr[index]);
            queue.push(front.right);
        }
        index++;
    }
    return root;
};

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */

var pathSum = function (root, targetSum) {
    /* 
     思路：先构造这样一颗二叉树；然后再遍历这颗二叉树，求和，类似于LC112
    
   */
    // let count = 0;
    // const nodes = makeTree(root);
    // const dfs = (root, targetSum) => {
    //     if (!root) return 0;
    //     // 返回位置不对，这个相当于在下一次递归才返回
    //     if (targetSum === root.val) {
    //         count++;
    //         // 找到一个满足条件的路径,向上返回，这里我认为一条路径下不会有多种case。不对，同一条路径上可以存在多个符合的路径。
    //         return;
    //     }
    //     return dfs(root.left, targetSum - root.val) || dfs(root.right, targetSum - root.val);
    // };
    // dfs(nodes, targetSum + nodes.val);
    // return count;

    if (!root) return 0;

    // 计算以当前节点为起点的路径数
    const countFrom = (node, sum) => {
        if (!node) return 0;
        let count = 0;
        if (node.val === sum) count++;
        count += countFrom(node.left, sum - node.val);
        count += countFrom(node.right, sum - node.val);
        return count;
    };

    // 遍历所有节点作为起点
    return countFrom(root, targetSum) + pathSum(root.left, targetSum) + pathSum(root.right, targetSum);
};

const tree = makeTree([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1]);
// @lc code=end
// console.log(pathSum(tree, 8));
// console.log(pathSum([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], 22));
// console.log(makeTree([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1]));
console.log(pathSum(tree, 22));
