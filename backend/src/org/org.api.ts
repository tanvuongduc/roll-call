import * as express from "express";
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../lib/http";
import { OrgNS } from "./org";
import { UserAuthNS } from "../auth/auth";

export function NewOrgAPI(
  userAuthBLL: UserAuthNS.BLL,
  orgBLL: OrgNS.BLL,
) {
  const app = express();
  const roleType = Object.values(OrgNS.Role);

  //Get list
  app.get("/org/list", async (req, res) => {
    const docs = await orgBLL.ListOrg();
    res.json(docs);
  });

  //Create new org
  app.post("/org/create", async (req, res) => {
    const name = HttpParamValidators.MustBeString(req.body, "name", 2);
    const params: OrgNS.CreateOrgParams = {
      name,
    };
    const org = await orgBLL.CreateOrg(params);
    res.json(org);
  });

  //----USER-----//
  //Get list user
  app.get("/user/list", async (req, res) => {
    const docs = await orgBLL.ListUser();
    res.json(docs);
  });

  //Get one user by ID or username
  app.get("/user/get", async (req, res) => {
    if (req.query.id) {
      const id = HttpParamValidators.MustBeString(req.query, "id", 8);
      const doc = await orgBLL.GetUser(id);
      res.json(doc);
    }

    if (req.query.username) {
      const username = HttpParamValidators.MustBeString(
        req.query,
        "username",
        2
      );
      const doc = await orgBLL.GetUserByUsername(username);
      res.json(doc);
    }
  });

  //Create new user
  app.post("/user/create", async (req, res) => {
    const username = HttpParamValidators.MustBeString(req.body, "username", 2);
    const org_id = HttpParamValidators.MustBeString(req.body, "org_id", 8);
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
    const role = HttpParamValidators.MustBeOneOf(req.body, "role", roleType);
    const phone = HttpParamValidators.MustBeString(req.body, "phone", 10);
    let birthday = req.body.birthday;
    if (!birthday) {
      const day = HttpParamValidators.MustBeString(req.body, "day", 1);
      const month = HttpParamValidators.MustBeString(req.body, "month", 1);
      const year = HttpParamValidators.MustBeString(req.body, "year", 4, 4);
      // birthday = `${year}-${month}-${day}`;
      birthday = `${day}-${month}-${year}`;
    }

    const params: OrgNS.CreateUserParams = {
      username,
      org_id,
      first_name,
      last_name,
      role,
      phone,
      birthday,
    };
    const user = await orgBLL.CreateUser(params);
    res.json(user);
  });

  //Update user
  app.post("/user/update", async (req, res) => {
    const id = HttpParamValidators.MustBeString(req.query, "id");
    const params: OrgNS.UpdateUserParams = {};

    if (req.body.first_name) {
      params.first_name = HttpParamValidators.MustBeString(
        req.body,
        "first_name",
        2
      );
    }

    if (req.body.last_name) {
      params.last_name   = HttpParamValidators.MustBeString(
        req.body,
        "last_name",
        2
      );
    }

    if (req.body.role) {
      params.role = HttpParamValidators.MustBeOneOf(req.body, "role", roleType);
    }

    if (req.body.phone) {
      params.phone = HttpParamValidators.MustBeString(req.body, "phone", 10);
    }

    if (req.body.birthday) {
      params.birthday = HttpParamValidators.MustBeString(req.body, "birthday", 1);
    }
    await orgBLL.UpdateUser(id, params);
    res.json(1);
  });

  //Delete user
  app.post("/user/delete", async (req, res) => {
    const user_id = HttpParamValidators.MustBeString(req.query, "id", 8);
    await orgBLL.DeleteUser(user_id as string);
    res.json(1);
  });
  return app;
}
