import * as express from "express";
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../lib/http";
import { UsersNS } from "./users";
import { UserAuthNS } from "../auth/auth";

export function NewUsersAPI(
  // userAuthBLL: UserAuthNS.BLL,
  orgBLL: UsersNS.BLL
) {
  const app = express();
  //----USER-----//
  //Get list user
  app.get("/users/list", async (req, res) => {
    const docs = await orgBLL.ListUsers();
    res.json(docs);
  });

  //Get one user by ID or username
  app.get("/users/get", async (req, res) => {
    if (req.query.id) {
      const id = HttpParamValidators.MustBeString(req.query, "id", 8);
      const doc = await orgBLL.GetUsers(id);
      res.json(doc);
    }
    if (req.query.username) {
      const username = HttpParamValidators.MustBeString(
        req.query,
        "username",
        2
      );
      const doc = await orgBLL.GetUsersByUsersname(username);
      res.json(doc);
    }
  });

  //Create new user
  app.post("/users/create", async (req, res) => {
    const username = HttpParamValidators.MustBeString(req.body, "username", 2);
    const first_name = HttpParamValidators.MustBeString(
      req.body,
      "first_name",
      2
    );
    const last_name = HttpParamValidators.MustBeString(
      req.body,
      "last_name",
      2
    );
    const role_id = HttpParamValidators.MustBeNumber(req.body, "role_id", 0);
    const phone = HttpParamValidators.MustBeString(req.body, "phone", 10);
    let birthday = req.body.birthday;
    if (!birthday) {
      const day = HttpParamValidators.MustBeString(req.body, "day", 1);
      const month = HttpParamValidators.MustBeString(req.body, "month", 1);
      const year = HttpParamValidators.MustBeString(req.body, "year", 4, 4);
      // birthday = `${year}-${month}-${day}`;
      birthday = `${day}-${month}-${year}`;
    }

    const params: UsersNS.CreateUsersParams = {
      username,
      first_name,
      last_name,
      role_id,
      phone,
      birthday,
    };
    const users = await orgBLL.CreateUsers(params);
    res.json(users);
  });

  //Update user
  app.post("/users/update", async (req, res) => {
    const id = HttpParamValidators.MustBeString(req.query, "id");
    const params: UsersNS.UpdateUsersParams = {};

    if (req.body.first_name) {
      params.first_name = HttpParamValidators.MustBeString(
        req.body,
        "first_name",
        2
      );
    }

    if (req.body.last_name) {
      params.last_name = HttpParamValidators.MustBeString(
        req.body,
        "last_name",
        2
      );
    }

    if (req.body.role_id) {
      params.role_id = HttpParamValidators.MustBeNumber(req.body, "role_id", 0);
    }

    if (req.body.phone) {
      params.phone = HttpParamValidators.MustBeString(req.body, "phone", 10);
    }

    if (req.body.birthday) {
      params.birthday = HttpParamValidators.MustBeString(
        req.body,
        "birthday",
        1
      );
    }
    await orgBLL.UpdateUsers(id, params);
    res.json(1);
  });

  //Delete user
  app.post("/users/delete", async (req, res) => {
    const user_id = HttpParamValidators.MustBeString(req.query, "id", 8);
    await orgBLL.DeleteUsers(user_id as string);
    res.json(1);
  });
  return app;
}
