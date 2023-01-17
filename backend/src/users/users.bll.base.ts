import { UsersNS } from "./users";

export class UsersBLLBase implements UsersNS.BLL {
  constructor(private dal: UsersNS.DAL) {}
  async init() {}
  async ListUsers() {
    return this.dal.ListUsers();
  }

  async GetUsers(id: string) {
    const user = await this.dal.GetUsers(id);
    if (!user) {
      throw UsersNS.Errors.ErrUserNotFound;
    }
    return user;
  }

  async GetUsersByUsersname(username: string) {
    const user = await this.dal.GetUsersByUsersname(username);
    if (!user) {
      throw UsersNS.Errors.ErrUserNotFound;
    }
    return user;
  }

  async CreateUsers(params: UsersNS.CreateUsersParams) {
    const now = Date.now();
    const user = {
      id: UsersNS.Generator.NewUserId(),
      username: params.username,
      role: params.role,
      first_name: params.first_name,
      last_name: params.last_name,
      phone: params.phone,
      birthday: params.birthday,
      ctime: now,
      mtime: now,
    };
    await this.dal.CreateUsers(user);
    return user;
  }

  async UpdateUsers(id: string, params: UsersNS.UpdateUsersParams) {
    const user = await this.GetUsers(id);
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
    await this.dal.UpdateUsers(user);
  }

  async DeleteUsers(id: string) {
    const user = await this.GetUsers(id);
    await this.dal.DeleteUsers(id);
    return user;
  }
}
