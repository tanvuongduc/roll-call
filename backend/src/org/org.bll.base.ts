import { OrgNS } from "./org";

export class OrgBLLBase implements OrgNS.BLL {
  constructor(private dal: OrgNS.DAL) { }

  async init() { }

  async ListOrg() {
    return this.dal.ListOrg();
  }

  async CreateOrg(params: OrgNS.CreateOrgParams) {
    const now = Date.now();
    const org: OrgNS.Org = {
      id: OrgNS.Generator.NewOrgId(),
      name: params.name,
      ctime: now,
      mtime: now,
    };
    await this.dal.CreateOrg(org);
    return org;
  }

  async ListUser() {
    return this.dal.ListUser();
  }

  async GetUser(id: string) {
    const user = await this.dal.GetUser(id);
    if (!user) {
      throw OrgNS.Errors.ErrUserNotFound;
    }
    return user;
  }

  async GetUserByUsername(username: string) {
    const user = await this.dal.GetUserByUsername(username);
    if (!user) {
      throw OrgNS.Errors.ErrUserNotFound;
    }
    return user;
  }

  async CreateUser(params: OrgNS.CreateUserParams) {
    const now = Date.now();
    const user = {
      id: OrgNS.Generator.NewUserId(),
      username: params.username,
      org_id: params.org_id,
      role: params.role,
      first_name: params.first_name,
      last_name: params.last_name,
      phone: params.phone,
      birthday: params.birthday,
      ctime: now,
      mtime: now,
    };
    await this.dal.CreateUser(user);
    return user;
  }

  async UpdateUser(id: string, params: OrgNS.UpdateUserParams) {
    const user = await this.GetUser(id);
    if (params.first_name) {
      user.first_name = params.first_name;
    }

    if (params.last_name) {
      user.last_name = params.last_name;
    }

    if (params.role) {
      user.role = params.role;
    }

    if (params.phone) {
      user.phone = params.phone;
    }

    if (params.birthday) {
      user.birthday = params.birthday;
    }

    user.mtime = Date.now();
    await this.dal.UpdateUser(user);
  }

  async DeleteUser(id: string) {
    const user = await this.GetUser(id);
    await this.dal.DeleteUser(id);
    return user;
  }
}
