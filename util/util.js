const { Promise } = require('bluebird');
const {kanzhunHost,interviewUrlPool} = require("../lib/common.js");


async function sleep(ms) {
    return new Promise((resolve) => {
        console.log("sleep start " + ms + "ms");
        setTimeout(() => {
            console.log("sleep end " + ms + "ms");
            resolve();
        }, ms);
    })
}

//生成[1,2,3 ...] 顺序数组
function generateSeqArray(length){
    let obj = {};
    obj.length = length;
    return Array.from(obj).map(function(value,idx){
        return idx+1;
    });
}


function genUrls(length,urlTemplate){
    let urlsIdx = generateSeqArray(length);
    return urlsIdx.map(idx=>{
        if(idx === 1){            
            return `${kanzhunHost}/interview/5629/`;
        }
        return `${kanzhunHost}/interview/5629/p${idx}/?ka=paging${idx}`;
    })
}

function randIntervalTime(...args){
    if(args.length == 0){
        //默认5-15s之间
        return parseInt(5000+Math.random()*10000);
    }else if(args.length ==2){
        return parseInt(args[0] + (args[1] - args[0])*Math.random());
    }else{
        throw TypeError("wrong args count");
    }
}

module.exports = {sleep,generateSeqArray,genUrls,randIntervalTime};