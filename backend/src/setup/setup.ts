import { ReadConfig } from "../config";
import { MongoCommon } from "../lib/mongodb";
import { ContextBLLBase } from "../ext/ctx.bll";
import { EventBLLBase } from "../ext/ev.bll";
import { OrgDALMongo } from "../org/org.dal.mongo";
import { UserAuthDALMongo } from "../auth/auth.dal.mongo";
import { TodoDALMongo } from "../todo/todo.dal.mongo";
import { CustomerDALMongo } from "../customer/customer.dal.mongo";
import { LocationDALMongo } from "../location/location.dal.mongo";

async function SetupSampleData() {
    const config = await ReadConfig();
    console.log(new Date(), config);
    const client = await MongoCommon.Connect(config.database.db_url, { replica: false });
    console.log(new Date(), 'connected to database');
    const database = client.db(config.database.db_name);
    /******************************************************* */
    const contextBLL = new ContextBLLBase(client);
    const eventBLL = new EventBLLBase(database, contextBLL);
    await eventBLL.init();
    // org
    const orgDAL = new OrgDALMongo(database);
    await orgDAL.init();
    // auth
    const userAuthDAL = new UserAuthDALMongo(database);
    await userAuthDAL.init();
    // 
    const todoDAL = new TodoDALMongo(database);
    await todoDAL.init();
    // customer
    const customerDAL = new CustomerDALMongo(database);
    await customerDAL.init();

    // location
    const locationDAL = new LocationDALMongo(database);
    await locationDAL.init();


    /******************************************************* */
    console.log(new Date(), `setup finished`);
}

module.exports = {
    SetupSampleData,
}
