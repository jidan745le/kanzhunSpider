const { parseInterviewList, parseInterviewDetail } = require("./lib/htmlParser.js");
const { getProxyIntervally, spiderUrl, collectInterviewContentUrl } = require("./lib/spiderUrl.js");
const { sleep,randIntervalTime } = require("./util/util.js");
const { sqlProcess, dbConfig } = require("./lib/sqlProcess.js");
(async () => {
   //获取代理地址
   //getProxyIntervally();

   //连接数据库
   const createData = await sqlProcess(dbConfig);
   console.log("mysql connect successfully!");

   //收集热门前端面试的具体信息的url
   let interviewContentUrls = await collectInterviewContentUrl(true, { interval: "random" });
   console.log(interviewContentUrls);

   //获取url逐一获取面试具体信息    
   for (let i = 0; i < interviewContentUrls.length; i++) {
      let body = await spiderUrl(interviewContentUrls[i]);
      let obj = parseInterviewDetail(body);
      console.log(obj);
      await createData(obj);
      await sleep(randIntervalTime());
   }
})();
