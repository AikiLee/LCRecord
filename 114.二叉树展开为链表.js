/*
 * @lc app=leetcode.cn id=114 lang=javascript
 *
 * [114] 二叉树展开为链表
 *
 * https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/description/
 *
 * algorithms
 * Medium (75.29%)
 * Likes:    1843
 * Dislikes: 0
 * Total Accepted:    647.7K
 * Total Submissions: 855.9K
 * Testcase Example:  '[1,2,5,3,4,null,6]'
 *
 * 给你二叉树的根结点 root ，请你将它展开为一个单链表：
 *
 *
 * 展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
 * 展开后的单链表应该与二叉树 先序遍历 顺序相同。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,2,5,3,4,null,6]
 * 输出：[1,null,2,null,3,null,4,null,5,null,6]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = []
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = [0]
 * 输出：[0]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中结点数在范围 [0, 2000] 内
 * -100
 *
 *
 *
 *
 * 进阶：你可以使用原地算法（O(1) 额外空间）展开这棵树吗？
 *
 */

const { forIn } = require("lodash");

// @lc code=start

//   Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
//将数组转换为链表
const getList = function makeList(array) {
    let head = new ListNode();
    let cur = head;
    for (let i = 0; i < array.length; i++) {
        let node = new ListNode(array[i]);
        cur.next = node;
        cur = cur.next;
    }
    return head.next;
};

// 层序构建树
const makeTree = (arr) =>{
    if(arr.length === 0) return null;
    let root = new TreeNode(arr[0]);
    let cur = root;
    for(let i =  1 ; i< arr.length; i++){
        let node = new TreeNode(arr[i]);
        cur.left = null;
        cur.right = node;
        cur = node;
    }
   return root; 
}

var flatten = function (root) {
    /* 如何理解：
    基本思路： 前序遍历顺便存储 + 转为链表

    */
    if (root.length === 0) return;
    const arr = [];
    const node = makeTree(root);
    const frontTraverse = (node) => {
        if (!node) return null; //递归出口
        arr.push(node.val);
        arr.push(null);
        frontTraverse(node.left);
        frontTraverse(node.right);
    };
    frontTraverse(node);
    const n  = arr.length;
    return arr.slice(0,n -1 ); 

};
// @lc code=end
console.log(flatten([1,2,5,3,4,null,6]));