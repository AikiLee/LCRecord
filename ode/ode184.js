//https://hydro.ac/d/coder_gather/p/ode0184

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
/* 
    input: hello,2,ok,0,bye,0,test,0,one,1,two,1,a,0
    读题：
    1.  

*/
rl.on("line", (input) => {
    const ans = input.split(","); //分割数组，
    const res = [];
    let qp = ans.slice(); //最大嵌套层级
    console.log(ans);
    /* 
        这种一般需要通过递归来完成解析
    */
    while (qp.length > 0) {
        dfs(qp, res, 1);
    }
    printResult(res)
    rl.close();
});

const dfs = (qp, res, level) => {
    if (res.length < level) {
        res.push([]);
    }
    let comment = qp.shift();
    let subCommentCount = parseInt(qp.shift(), 10);
    res[level - 1].push(comment);
    for (let i = 0; i < subCommentCount; i++) {
        dfs(qp, res, level + 1);
    }
};

const printResult = (ans)=>{
    console.log(ans.length);
    ans.forEach(level => {
        console.log(level.join(" "));
    });
}