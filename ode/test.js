const input = [1, 3, 3, 3, 2, 4, 4, 4, 5];
// 期待输出：3,4,1,2,5
const temp = new Map();
for (const v of input) {
    if (temp.has(v)) {
        // 有键 + 1
        temp.set(v, temp.get(v) + 1);
    } else {
        // 没有键
        temp.set(v, 1);
    }
}
// 我希望将map中的key按value从大到小排序，如果value相同，则先出现的key排在前面
// 记录每个元素首次出现的位置
const firstOccurrence = new Map();
input.forEach((value, index) => {
    if (!firstOccurrence.has(value)) {
        firstOccurrence.set(value, index);
    }
});

// 按照 value 从大到小排序，如果 value 相同，则按首次出现顺序排序
const sortedResult = new Map(
    // 先将map转化为二维数组，再排序。第一个是key，第二个是次数
    [...temp].sort((a, b) => {
        // 先按 value 降序排序
        if (a[1] !== b[1]) {
            return b[1] - a[1];
        }
        // 如果 value 相同，按首次出现顺序排序
        return firstOccurrence.get(a[0]) - firstOccurrence.get(b[0]);
    })
);

console.log([...sortedResult.keys()]);
// console.log([...temp])
// console.log([...temp.entries()]);
