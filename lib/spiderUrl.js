const { Promise } = require('bluebird');
const request =  require("request");
const {kanzhunHost,interviewUrlPool,proxyIpPool} = require("./common.js");
const {parseInterviewList,parseInterviewDetail} = require("./htmlParser.js");
const {sleep,generateSeqArray,genUrls,randIntervalTime} = require("../util/util.js");

async function getProxyIntervally(){    
   while(1){
       // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36', //动态设置浏览器头部信息
      let jsonStr = await spiderUrl("http://piping.mogumiao.com/proxy/api/get_ip_bs?appKey=c8dfbc4317d348db9b51446b6bb3a5e4&count=5&expiryDate=0&format=1&newLine=2",{headers:{'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'}});
      console.log(jsonStr.toString());
      let {code,msg} = JSON.parse(jsonStr.toString());     
      //清空数组
      proxyIpPool.splice(0,proxyIpPool.length);
      if(code === '0'){         
        proxyIpPool.push(...msg.map(address => `http://${address.ip}:${address.port}`));
      }     
      console.log(proxyIpPool);
      await sleep(12000);
   } 
}
//爬取网页
async function spiderUrl(url,option) { 
    let headers,proxy;
    
    if(option){
        headers = option.headers;
        proxy = option.proxy;
    } 
    
    console.log("proxy",proxy);
    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET',
            url,
            gzip: true,
            encoding: null,
            headers: headers ? headers:require('../config/config.js').requestHeaderCfg,
            proxy,
            timeout: 8000
        };
        request(options, async (error, response, body) => {            
            //console.log("info",error,body,options.url); 
            //console.log(response.statusCode);
            if (error) {
                console.log(`爬取页面失败，${error}`);  
                await sleep(2000);              
                resolve(await spiderUrl(url));
            }else if(response.statusCode == 403){
                await sleep(2000);
                console.log(`爬取页面失败，服务器反爬虫`);
                console.log(url);
                resolve(await spiderUrl(url,{proxy:proxyIpPool[parseInt(Math.random()*5)]}));
            } else{
                console.log(` 爬取页面成功，  √`);
                // console.log(body.toString());
                // console.log(error);
                resolve(body);
            }

        })
    });
}

//收集热门面试详情页url
async function collectInterviewContentUrl(blockingIO, options) {
    let interviewContentUrls = [];
    let body;
    let urls = genUrls(10);
    if (blockingIO) {
        //阻塞模式下爬取面试列表,主要防止请求太快被403拒绝访问
        for(let i = 0;i< urls.length; i++){
            body = await spiderUrl(urls[i]);//爬取网页
            interviewContentUrls = interviewContentUrls.concat(parseInterviewList(body));
            await sleep(options.interval === "random" ? randIntervalTime() : options.interval);
        }
    } else {
        //非阻塞模式下爬取面试列表
        let spiderUrlsPromiseArray = urls.map(url=>{
            // console.log("。。。",proxyIpPool,proxyIpPool[parseInt(Math.random()*5)]);
            return spiderUrl(url);
        });
        let bodies = await Promise.all(spiderUrlsPromiseArray); 
        interviewContentUrls = bodies.reduce((urls,body,idx)=>{            
            return urls.concat(parseInterviewList(body));
        },[]);    
    }
    //加入面试详情url
    interviewUrlPool.push(...interviewContentUrls);
    return interviewContentUrls;
}

module.exports = {getProxyIntervally,spiderUrl,collectInterviewContentUrl};