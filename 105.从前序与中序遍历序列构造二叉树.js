/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
 *
 * https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
 *
 * algorithms
 * Medium (72.65%)
 * Likes:    2545
 * Dislikes: 0
 * Total Accepted:    847.3K
 * Total Submissions: 1.2M
 * Testcase Example:  '[3,9,20,15,7]\n[9,3,15,20,7]'
 *
 * 给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder
 * 是同一棵树的中序遍历，请构造二叉树并返回其根节点。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
 * 输出: [3,9,20,null,null,15,7]
 *
 *
 * 示例 2:
 *
 *
 * 输入: preorder = [-1], inorder = [-1]
 * 输出: [-1]
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= preorder.length <= 3000
 * inorder.length == preorder.length
 * -3000 <= preorder[i], inorder[i] <= 3000
 * preorder 和 inorder 均 无重复 元素
 * inorder 均出现在 preorder
 * preorder 保证 为二叉树的前序遍历序列
 * inorder 保证 为二叉树的中序遍历序列
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

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
    /**
     * 这应该是ds中的老问题了,考虑使用分治法来实现：
     *  1. 这个子问题十分容易寻找就是不断地将一个大数列分割成小数列的过程
     *  2. 如何实现这一过程：
     *      - 通过preOrder[0]找到root节点，再通过inOrder找到root节点的左右子树
     *      - 返回root的位置，并在此时创建节点
     *      - 递归出口 root === null
     *  3.时间复杂度：
     *      O(N^2),空间复杂度O(N)
     *  4.优化:
     *      - 我们在递归过程中，每次都要去找preorder[0]在inorder中的位置，通过indexOf方法的时间复杂度是O(N)，如果使用map进行哈希查找，速度可以降为O(1)
     */

    // const n = preorder.length;
    // if (n === 0) return null;
    // const root = preorder[0];
    // const leftSize = inorder.indexOf(root);
    // // 划分范围
    // const pre1 = preorder.slice(1, leftSize + 1);
    // const pre2 = preorder.slice(leftSize + 1);
    // const in1 = inorder.slice(0, leftSize);
    // const in2 = inorder.slice(leftSize + 1);
    // const left = buildTree(pre1, in1);
    // const right = buildTree(pre2, in2);
    // return new TreeNode(root, left, right);
    const n = preorder.length;
    const Index = new Map();
    for(let i = 0; i < n; i++){
        // 把map当数组用
        Index.set(inorder[i], i);
    }
    const dfs = (preL,preR, inL, inR)=>{
        if(preL === preR){
            // 左 = 右 空元素
            return null;
        }
        const leftSize =  Index.get(preorder[preL]) - inL;
        const left = dfs(preL+1, preL + 1 + leftSize, inL, inL + leftSize);
        const right = dfs(preL + 1 + leftSize, preR, inL + 1 + leftSize, inR);
        return new TreeNode(preorder[preL], left, right);
    }
    dfs(0, n, 0, n);
};
// @lc code=end
console.log(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]));
