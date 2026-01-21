const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const input = [];
rl.on("line", (line) => {
    /**
     * 读题：
     * 1. N的数字很大，1e10，需要使用bigInt
     * 2. 运动员数量倒是还可以，对时间复杂度几乎没什么限制
     * 3. 判断规则：通常情况，实力大的获胜，实力相同，id小的获胜
     * 4. 运行原理，相邻的运动员在一起比赛，这是一个问题，这是一个问题，至少要比logn次，时间复杂度接近n2
     * 还要处理轮空的case，这和数组长度相关，为奇必有轮空
     */
    input.push(line.split(" ").map(Number).map((val,idx) => new Sports(idx,val)));

}).on("close", () => {
    const len = input.length;
    /**
     * 如何处理：
     * 1. 通过promote产生晋级赛的名单，最后产生3个名额
     * 2. genResult，这个简单，将promote中产生的冠军组数据处理，
     * 如果只有一个，那么就是那个人，如果>=1，则还需要进行依次promote
     * 3. 如何产生冠军：这是需要先打promote晋级赛，需要一直保持在冠军组才有机会竞争冠军
     * 4. 当promote函数中，所有比赛都打完了，且最多只有三个人时才会进行最后的冠军赛
     * 
     */
    genResult(input[0]);
    

});

// 产生最后的排名
function genResult(sports) {
    // 比赛组
    const ans = [];
    // 开展晋级赛
    promote(sports,ans);
    // 当冠军组人数> 1继续进行冠军赛
    while(ans[0].length > 1){
        promote(ans.shift(),ans);
    }
    // 冠军一定在第一位，亚军一定在第二位
    const first = ans[0][0].id;
    const second = ans[1][0].id;
    // 季军可以直接比出来
    ans[2].sort((a,b) => a.strength != b.strength ? b.strength - a.strength : a.id - b.id);
    const third = ans[2][0].id;
    console.log(`${first} ${second} ${third}`);
}

// 进行晋级赛
function promote(sports, ans) {
    /**
     * 晋级赛：
     * 再具体看一下具体的运行过程：
        1. 第一次运行promote
        产生两个组ans[[冠军组3,5],[亚军组2,4]]
        2. 如果冠军组不是一个人，那么晋级赛还需要继续，拿之前的冠军组继续比赛。那么会继续产生[[冠军组 5]，[亚军组 3]]
        3. 此时ans = [[冠军组 5]， [亚军组 3]， [季军组 2，4]]
     */
    const win = [];
    const fail = [];

    for(let i = 1 ; i < sports.length; i+=2) {
        // id较小的
        const minor = sports[i-1];
        // id较大的
        const major = sports[i];
        if (minor.strength < major.strength) {
            win.push(major);
            fail.push(minor);
        }else {
            // 二者相等时/ major.strength>= minor.strength合并了
            win.push(minor);
            fail.push(major);
        }
    }
    if(sports.length % 2 !==0 ) {
        win.push(sports.at(-1));
    }
    ans.unshift(fail);
    ans.unshift(win);
    // 只需要三个组就行了，多余的舍弃掉
    while(ans.length > 3) ans.pop();

}

class Sports{
    constructor(id,strength) {
        this.id = id;
        this.strength = strength;
    }
}