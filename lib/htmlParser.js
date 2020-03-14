const cheerio = require('cheerio');
const {kanzhunHost,interviewUrlPool} = require("./common.js");

//解析面试列表页
function parseInterviewList(html) {
    let urls = [];
    let $ = cheerio.load(html.toString());
    let moreInterviewDetails = $("p.mt10 a");
    moreInterviewDetails.each((idx, ele) => {
        //plain Object attribs
        let { ka, href } = ele.attribs;
        urls.push(`${kanzhunHost}/${href}?ka=${ka}`);
    })
    console.log(urls);
    return urls;
}

//解析每个面试详情页内容
function parseInterviewDetail(html){
    let interviewDetail = {};
    let $ = cheerio.load(html.toString());
    
    interviewDetail.company = $(".company-head-content .content-title .name").eq(0).text();
    interviewDetail.username = $(".company-ugc-detail .user-name").eq(0).text();
    interviewDetail.userdesc = $(".company-ugc-detail .user-desc").eq(0).text();
    interviewDetail.detailTitle = $(".company-ugc-detail .detail-title").eq(0).text();
    interviewDetail.detailContent = $(".company-ugc-detail .datail-content").eq(0).text();
    console.log("interviewDetail.detailContent",interviewDetail.detailContent);
    let result = interviewDetail.result = [];
    //面试结果处理
    $(".company-ugc-detail .detail-status .item").each((idx,ele)=>{        
        ele.children.forEach((ele,idx)=>{
            //包含textNode所以第三个
            if(idx == 3){
                result.push($(ele).text());
            }            
        })
    });
    interviewDetail.result = result.join();
    interviewDetail.time = $(".company-ugc-detail .time").eq(0).text();
    return interviewDetail;
}

module.exports = {parseInterviewList,parseInterviewDetail};
