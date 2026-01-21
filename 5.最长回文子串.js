/* 
给你一个字符串 s，找到 s 中最长的 回文 子串。

输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
*/

/* 先理解题目意思：
1.回文串：aba这种形式，从前到后，从后到前相同
2. 子串，一定是连续的
3. 最长，这就需要考虑dp了，找到全局最大
*/

var longestPalindrome = function (s) {
    // 先暴力解法

    const isHui =  (s) => {
        let left = 0 , right = s.length - 1;
        while(left < right) {
            if(s[left] !== s[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    let n = s.length;
    let max = "";
    for(let i = 0 ; i< n ;i ++) {
        for(let j  = 0 ;  j < n ; j ++){
            const str = s.slice(i, j + 1);
            if(isHui(str) && str.length > max.length) {
                max = str;
            }
        }
    }
    return max;

};
console.log(longestPalindrome("babad")); //expected "bab" or "aba"
console.log(longestPalindrome("cbbd")); //expected "bb"
