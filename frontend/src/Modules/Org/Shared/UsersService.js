import { Http } from "../../../Helper/Http";

const API_ENDPOINT = {
  GETLISTUSER: "/users/users/list",
  CREATEUSER: "/users/users/create",
  EDITUSER: "/users/users/update?id=",
  GETEDITUSER: "/users/users/get?id=",
  DELETEUSER: "/users/users/delete?id=",
};

class UsersServices {
  constructor() {
    if (UsersServices._instance) {
      return UsersServices._instance;
    }
    UsersServices._instance = this;
  }

  ///////////////// API USER ///////////////////
  // get data
  getListUser() {
    return Http.get(API_ENDPOINT.GETLISTUSER);
  }
  // get Delete
  getDeleteUser(data) {
    return Http.post(API_ENDPOINT.DELETEUSER + data);
  }

  // creat User
  postCreateUser(data) {
    return Http.post(API_ENDPOINT.CREATEUSER, data);
  }

  // Edit User
  postEditUser(id, data) {
    return Http.post(API_ENDPOINT.EDITUSER + id, data);
  }

  // getEditUser
  getEditUser(id) {
    return Http.get(API_ENDPOINT.GETEDITUSER + id);
  }
}
const instance = new UsersServices();

export default instance;
