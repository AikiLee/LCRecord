/*
 * @lc app=leetcode.cn id=208 lang=javascript
 *
 * [208] 实现 Trie (前缀树)
 *
 * https://leetcode.cn/problems/implement-trie-prefix-tree/description/
 *
 * algorithms
 * Medium (72.66%)
 * Likes:    1810
 * Dislikes: 0
 * Total Accepted:    438.5K
 * Total Submissions: 602.2K
 * Testcase Example:  '["Trie","insert","search","search","startsWith","insert","search"]\n' +
  '[[],["apple"],["apple"],["app"],["app"],["app"],["app"]]'
 *
 * Trie（发音类似 "try"）或者说 前缀树
 * 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补全和拼写检查。
 * 
 * 请你实现 Trie 类：
 * 
 * 
 * Trie() 初始化前缀树对象。
 * void insert(String word) 向前缀树中插入字符串 word 。
 * boolean search(String word) 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；否则，返回
 * false 。
 * boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix ，返回 true
 * ；否则，返回 false 。
 * 
 * 
 * 
 * 
 * 示例：
 * 
 * 
 * 输入
 * ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
 * [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
 * 输出
 * [null, null, true, false, true, null, true]
 * 
 * 解释
 * Trie trie = new Trie();
 * trie.insert("apple");
 * trie.search("apple");   // 返回 True
 * trie.search("app");     // 返回 False
 * trie.startsWith("app"); // 返回 True
 * trie.insert("app");
 * trie.search("app");     // 返回 True
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= word.length, prefix.length <= 2000
 * word 和 prefix 仅由小写英文字母组成
 * insert、search 和 startsWith 调用次数 总计 不超过 3 * 10^4 次
 * 
 * 
 */

// @lc code=start
class Node {
    /**
     * 构造函数，生成一个节点，包含26个字母的hash，和end
     */
    constructor() {
        this.son = new Array(26).fill(null);
        this.isEnd = false;
    }
}


class Trie { 
    /**
     * 前缀树的特点：
     * 1. root为null
     * 2. 每个节点包含两个属性，(1)存储一个字母的hash，使用cur.charCodeAt(0) - 'a'.charCodeAt(0)来存 (2)一个标志isEnd用于判断当前节点是否是一个单词的结束
     * 3. 每个节点的所有子节点都应该不同，
     * 
     * 
     */

    constructor() {
        this.root = new Node();
    }
    /**
     * 
     * @param {*} word 
     * 在前缀树中查找一个单词。和插入基本一致，
     */
    #find(word){
        let cur = this.root;
        for(let c of word){
            c = c.charCodeAt(0) - 'a'.charCodeAt(0);
            if(cur.son[c] === null){
                // 道不同，不相为谋。匹配失败
                return 0;
            }
            // 继续
            cur = cur.son[c];
        }
        // 2=完全匹配 1=前缀匹配
        return cur.isEnd ? 2 : 1;
    }

    /**
     * 
     * @param {*} word 
     * 向前缀树中插入一个单词.
     * 实现方式还是比较简单的：
     * 1.从root开始往下走，
     */
    insert(word){
        let cur = this.root;
        for(let c of word){
            c = c.charCodeAt(0) - 'a'.charCodeAt(0);
            if(cur.son[c] === null){
                // 当前节点没有子节点时，创建一个子节点
                cur.son[c] = new Node();
            }
            // 有了子节点之后，更新当前的root，指向当前层,也是靠这个将子节点存储下来
            cur = cur.son[c];
        }
        cur.isEnd = true;
    }

    /**
     * 
     * @param {*} word 
     * 在前缀树中查找一个单词
     */
    search(word){
        // 成功找到单词 <=>  当前节点是结束节点
        return this.#find(word) === 2;
    }
    /**
     * 
     * @param {*} prefix 
     * @return true:存在word前缀为prefix；false:不存在word以prefix为前缀
     */
    startsWith(prefix) {
        return this.#find(prefix) !== 0;
    }

}


/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
// @lc code=end
let obj = new Trie();
//expected: null , true, false, true, null , true;
obj.insert("apple");
obj.search("apple");
obj.search("app");
obj.startsWith("app");
obj.insert("app");
obj.search("app");