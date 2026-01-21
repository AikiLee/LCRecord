/*
 * @lc app=leetcode.cn id=124 lang=javascript
 *
 * [124] 二叉树中的最大路径和
 *
 * https://leetcode.cn/problems/binary-tree-maximum-path-sum/description/
 *
 * algorithms
 * Hard (46.48%)
 * Likes:    2416
 * Dislikes: 0
 * Total Accepted:    556.8K
 * Total Submissions: 1.2M
 * Testcase Example:  '[1,2,3]'
 *
 * 二叉树中的 路径 被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个
 * 节点，且不一定经过根节点。
 *
 * 路径和 是路径中各节点值的总和。
 *
 * 给你一个二叉树的根节点 root ，返回其 最大路径和 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,2,3]
 * 输出：6
 * 解释：最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6
 *
 * 示例 2：
 *
 *
 * 输入：root = [-10,9,20,null,null,15,7]
 * 输出：42
 * 解释：最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数目范围是 [1, 3 * 10^4]
 * -1000 <= Node.val <= 1000
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

//   Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

// 层序构建树
const makeTree = (arr) => {
    if (arr.length === 0) return null;
    let root = new TreeNode(arr[0]);
    let cur = root;
    for (let i = 1; i < arr.length; i++) {
        let node = new TreeNode(arr[i]);
        cur.left = null;
        cur.right = node;
        cur = node;
    }
    return root;
};

/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
    /*
        读题：
        1. 如何实现从左到右的路径和最大
        2. 这也是一个dp问题，反正
    
    */

    const arr = makeTree(root);
    let ans = -Infinity;
    const dfs = (node) => {
        if (!node) return 0;
        let left = dfs(node.left);
        let right = dfs(node.right);
        ans = Math.max(ans, left + right + node.val);
        return Math.max(Math.max(left, right) + node.val, 0);
    };
    dfs(arr);
    return ans;
};
// @lc code=end
console.log(maxPathSum([1, 2, 3]));
console.log(maxPathSum([-10, 9, 20, null, null, 15, 7]));
