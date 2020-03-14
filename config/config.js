const requestHeaderCfg = {
   // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36', //动态设置浏览器头部信息
   //  'Cookie':'W_CITY_S_V=1; GEMINI_CLIENT_ID1.0=945a5360-82c9-8f6a-78cf-d6263ecb30bc; ac=18721086195; __t=9GQYJKvV9fJctJk; R_SCH_CY_V=11514|1990882|1659669|1460015|1619939; JSESSIONID=""; AB_T=abva; __c=1583805953; __g=-; __l=l=%2Fwww.kanzhun.com%2Fcaptcha%2FpopUpCaptcha%2F%3Fredirect%3Dhttp%253A%252F%252Fwww.kanzhun.com%252Finterview%252F2117%252Fp2%252F%253Fka%253Dpaging2&r=; Hm_lvt_1f6f005d03f3c4d854faec87a0bee48e=1583768629,1583771323,1583771533,1583805967; lastMessageId=66148651; __a=50407064.1583768626.1583771323.1583805953.135.3.14.135; t=9GQYJKvV9fJctJk; Hm_lpvt_1f6f005d03f3c4d854faec87a0bee48e=1583826563'
   "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
   "Accept-Encoding": "gzip, deflate, br",
   "Accept-Language": "zh-CN,zh;q=0.9",
   "Cache-Control": "max-age=0",
   "Connection": "keep-alive",
   "Cookie": 'W_CITY_S_V=1; GEMINI_CLIENT_ID1.0=945a5360-82c9-8f6a-78cf-d6263ecb30bc; ac=18721086195; __t=9GQYJKvV9fJctJk; R_SCH_CY_V=3321|11514|1990882|1659669|1460015; AB_T=abva; __c=1584165040; __g=-; __l=l=%2Fwww.kanzhun.com%2Fmsh%2F%3Fka%3Dclick_top_tab_interview&r=; Hm_lvt_1f6f005d03f3c4d854faec87a0bee48e=1583771323,1583771533,1583805967,1584165040; lastMessageId=66148651; JSESSIONID=""; __a=50407064.1583768626.1583805953.1584165040.197.4.2.197; t=9GQYJKvV9fJctJk; Hm_lpvt_1f6f005d03f3c4d854faec87a0bee48e=1584165080',
   "Host": "www.kanzhun.com",
   "Sec-Fetch-Mode": "navigate",
   "Sec-Fetch-Site": "none",
   "Sec-Fetch-User": "?1",
   "Upgrade-Insecure-Requests": "1",
   "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
}

const dbConfig = {
   database: "testdb",
   username: "root",
   password: "123456",
   host: "localhost",
   dialect: "mysql"
};

module.exports = { requestHeaderCfg, dbConfig };
