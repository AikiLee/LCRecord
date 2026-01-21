/*
 * @lc app=leetcode.cn id=148 lang=javascript
 *
 * [148] 排序链表
 *
 * https://leetcode.cn/problems/sort-list/description/
 *
 * algorithms
 * Medium (66.88%)
 * Likes:    2529
 * Dislikes: 0
 * Total Accepted:    698.9K
 * Total Submissions: 1M
 * Testcase Example:  '[4,2,1,3]'
 *
 * 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：head = [4,2,1,3]
 * 输出：[1,2,3,4]
 *
 *
 * 示例 2：
 *
 *
 * 输入：head = [-1,5,3,4,0]
 * 输出：[-1,0,3,4,5]
 *
 *
 * 示例 3：
 *
 *
 * 输入：head = []
 * 输出：[]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表中节点的数目在范围 [0, 5 * 10^4] 内
 * -10^5 <= Node.val <= 10^5
 *
 *
 *
 *
 * 进阶：你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？
 *
 */

// @lc code=start

//   Definition for singly-linked list.
function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 先写一个处理链表的方法
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

const middleNode = (head) => {
    // 快慢指针
    let pre = head,
        slow = head,
        fast = head;
    while (fast && fast.next) {
        pre = slow; // 记录 slow 的前一个节点
        slow = slow.next;
        fast = fast.next.next;
    }
    pre.next = null; // 断开 slow 的前一个节点和 slow 的连接
    return slow;
};

// 分支法，归并排序
const mergeSort = (list1, list2) => {
    const dummy = new ListNode(); // 用哨兵节点简化代码逻辑
    let cur = dummy; // cur 指向新链表的末尾
    while (list1 && list2) {
        if (list1.val < list2.val) {
            cur.next = list1; // 把 list1 加到新链表中
            list1 = list1.next;
        } else {
            // 注：相等的情况加哪个节点都是可以的
            cur.next = list2; // 把 list2 加到新链表中
            list2 = list2.next;
        }
        cur = cur.next;
    }
    cur.next = list1 ?? list2; // 拼接剩余链表
    return dummy.next;
};

var sortList = function (head) {
    // 如果链表为空或者只有一个节点，无需排序
    if (head === null || head.next === null) {
        return head;
    }

    const arr = getList(head);
    // 写一个链表的冒泡排序
    let cur = arr;
    let mid = middleNode(cur);
    sortList(cur);
    sortList(mid);
    return mergeSort(cur, mid);
};
// @lc code=end
console.log(sortList([4, 2, 1, 3])); //expected [1,2,3,4]
console.log(sortList([1, 2, -3, 4, 5])); //expected [-3,1,2,4,5]
console.log(sortList([])); //expected []
