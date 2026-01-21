/**
 * line1： n总运动数 k可选数量 t卡路里之和
 * line2： 各项运动cal
 * 
 */
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.on("line",(line1)=>{
    rl.on("line",(line2) => {
        const [n,t,k] = line1.split(" ").map(Number);
        const input = line2.split(" ").map(Number);
        let count =0;
        // n<10,考虑使用dfs来做
        const dfs = (i,sum,length) => {
            if(i > input.length || sum < 0) return ;
            if(sum === 0 && length ===k){
                count++;
                return;
            }  
            return dfs(i+1,sum-input[i],length+1) || dfs(i+1,sum,length);
        }
        dfs(0,t,0);
        console.log(count);
        rl.close();
    })
})