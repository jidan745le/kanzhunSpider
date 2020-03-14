const Sequelize = require("sequelize");
const { dbConfig } = require("../config/config.js");
const sqlProcess = async (dbConfig,tableConfig) => {
    const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
        host: dbConfig.host,
        dialect:dbConfig.dialect,
        operatorsAliases: false
    });
    const interview = sequelize.define("interview",
        {
            company: Sequelize.STRING,
            username: Sequelize.STRING,
            userdesc: Sequelize.TEXT,
            detailTitle: Sequelize.TEXT,
            detailContent:Sequelize.TEXT,
            result:Sequelize.STRING,
            time:Sequelize.STRING,            
        });
    // await sequelize.authenticate().catch(e => { console.log("error", e) });
    await sequelize.sync({force:true});

    return async interviewInfo => {
        await interview.create(interviewInfo);
    }

}

// (async ()=>{
//     (await sqlProcess(dbConfig))({company:"米哈有"});
// })()
module.exports = {sqlProcess,dbConfig};