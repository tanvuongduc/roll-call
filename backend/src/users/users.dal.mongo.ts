import {
  FromMongoData,
  MongoDB,
  ToMongoData,
  MongoErrorCodes,
} from "../lib/mongodb";
import { UsersNS } from "./users";

export class UsersDALMongo implements UsersNS.DAL {
  constructor(private db: MongoDB) {}
  private col_users = this.db.collection("users");

  async init() {
    this.col_users.createIndex("username", { unique: true });
  }

  async ListUsers() {
    const docs = await this.col_users.find().toArray();
    return FromMongoData.Many<UsersNS.Users>(docs);
  }

  async GetUsers(id: string) {
    const doc = await this.col_users.findOne({ _id: id });
    return FromMongoData.One<UsersNS.Users>(doc);
  }

  async GetUsersByUsersname(username: string) {
    const doc = await this.col_users.findOne({ username: username });
    return FromMongoData.One<UsersNS.Users>(doc);
  }

  async CreateUsers(User: UsersNS.Users) {
    try {
      const doc = ToMongoData.One(User);
      await this.col_users.insertOne(doc);
    } catch (err) {
      if (err.code === MongoErrorCodes.Duplicate) {
        throw UsersNS.Errors.ErrUsernameExisted;
      } else {
        throw err;
      }
    }
  }

  async UpdateUsers(User: UsersNS.Users) {
    const doc = ToMongoData.One(User);
    await this.col_users.updateOne({ _id: User.id }, { $set: doc });
  }
  async DeleteUsers(id: string) {
    await this.col_users.deleteOne({ _id: id });
  }
}
