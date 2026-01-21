/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    /**
        读题： 子串，说明需要保持字符串的连续；如何实现不含重复字符？考虑使用map，遇到字符就加一。每次循环都使用get方法判断是否为1 
        具体实现方法：双指针+ map
        1. 使用双指针来统计区间长度，使用map来记录各种字符的出现次数
        2. 观察范围：s.length范围是0-50000，所以控制时间复杂度最好不要超过n2
     */
    const n = s.length;
    let i = 0, j = 0;
    const map = new Map();
    if (n === 0) return 0;
    let len = 0;
    while (i < n && j < n) {

        const c = s[j];
        if (!map.has(c)) {
            map.set(c, j);
        } else {
            const pos = map.get(c);
            i = pos + 1;
            map.set(c, j);    
        }
        len = Math.max(len, j - i+1);
        j++;
    }
    return len;
};

console.log(lengthOfLongestSubstring("abba"));