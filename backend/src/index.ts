import { ReadConfig } from "./config";
import * as express from "express";
import "./lib/express";
import "./ext/log";
import * as cors from "cors";
import { UserAuthDALMongo } from "./auth/auth.dal.mongo";
import { UserAuthBLLBase } from "./auth/auth.bll.base";
import { NewAuthAPI } from "./auth/auth.api";
import { TodoDALMongo } from "./todo/todo.dal.mongo";
import { TodoBLLBase } from "./todo/todo.bll.base";
import { NewTodoAPI } from "./todo/todo.api";

import { CustomerDALMongo } from "./customer/customer.dal.mongo";
import { CustomerBLLBase } from "./customer/customer.bll.base";
import { NewCustomerAPI } from "./customer/customer.api";

import { NewOrgAPI } from "./org/org.api";
import { OrgBLLBase } from "./org/org.bll.base";
import { OrgDALMongo } from "./org/org.dal.mongo";

import { NewLocationAPI } from "./location/location.api";
import { LocationBLLBase } from "./location/location.bll.base";
import { LocationDALMongo } from "./location/location.dal.mongo";

import { MongoCommon } from "./lib/mongodb";
import { ContextBLLBase } from "./ext/ctx.bll";
import { EventBLLBase } from "./ext/ev.bll";

import { HttpErrorHandler } from "./common/http_errror_handler";
import { ExpressStaticFallback } from "./lib/express";

async function main() {
  const config = await ReadConfig();
  console.log(config);
  const client = await MongoCommon.Connect(config.database.db_url, { replica: false });
  console.log('connected to database');
  const database = client.db(config.database.db_name);
  /******************************************************* */
  // const contextBLL = new ContextBLLBase(client);
  // const eventBLL = new EventBLLBase(database, contextBLL);
  // await eventBLL.init();

  // org
  const orgDAL = new OrgDALMongo(database);
  await orgDAL.init();
  const orgBLL = new OrgBLLBase(orgDAL);
  await orgBLL.init();
  
  // auth
  const userAuthDAL = new UserAuthDALMongo(database);
  await userAuthDAL.init();
  const userAuthBLL = new UserAuthBLLBase(userAuthDAL, orgBLL);
  await userAuthBLL.init();
  // 
  const todoDAL = new TodoDALMongo(database);
  await todoDAL.init();
  const todoBLL = new TodoBLLBase(todoDAL);
  await todoBLL.init();

  // customer
  const customerDAL = new CustomerDALMongo(database);
  await customerDAL.init();
  const customerBLL = new CustomerBLLBase(customerDAL);
  await customerBLL.init();

  // location
  const locationDAL = new LocationDALMongo(database);
  await locationDAL.init();
  const locationBLL = new LocationBLLBase(locationDAL);
  await locationBLL.init();
  

  /******************************************************* */

  /****************************************************** */
  const app = express();
  app.disable("x-powered-by");
  app.use(cors());
  app.use(express.json());
  app.use('/api/auth/', NewAuthAPI(userAuthBLL));
  app.use('/api/location/', NewLocationAPI(userAuthBLL, locationBLL));
  app.use("/api/org", NewOrgAPI(orgBLL))
  app.use("/api/customer/", NewCustomerAPI(userAuthBLL, customerBLL));
  app.use('/api/todo/', NewTodoAPI(userAuthBLL, todoBLL));
  app.use('/api/location/', NewLocationAPI(userAuthBLL, locationBLL));
  
  /****************************************************** */
  app.use("/", ExpressStaticFallback(config.app.dir));
  app.use(HttpErrorHandler);
  console.log(`listen on ${config.server.port}`);
  app.listen(config.server.port, "0.0.0.0", () => {
    const err = arguments[0];
    if (err) {
      console.log(err);
    }
  });
  /****************************************************** */
  
}

const isSetup = process.argv[2] === 'setup';

if (isSetup) {
  console.log('in setup mode');
  require('./setup/setup').SetupSampleData().catch(console.log);
} else {
  main().catch(console.log);
}
