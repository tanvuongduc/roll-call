import { Http } from '../../../Helper/Http';

const API_ENDPOINT = {
  //////// ORG/USER ////////////////
  GETLISTUSER: '/org/user/list',
  CREATEUSER: '/org/user/create',
  EDITUSER: '/org/user/update?id=',
  GETEDITUSER: '/org/user/get?id=',
  DELETEUSER: '/org/user/delete?id=',
  /////////  AUTH ///////////////////
  UPDATE_PASSWORD: '/auth/user/set_password',
  ///////// ORG/ORG ////////////////
  GETLISTORG: '/org/org/list',

}

class UserServices {
    constructor() {
        if (UserServices._instance) {
            return UserServices._instance
        }
        UserServices._instance = this;
    }

    ///////////////// API USER ///////////////////
  // get data
  getListUser() {
    return Http.get(API_ENDPOINT.GETLISTUSER);
  }
  // get Delete
   getDeleteUser(data) {
      return Http.post(API_ENDPOINT.DELETEUSER + data );
    }

  // creat User
  postCreateUser(data) {
    return Http.post(API_ENDPOINT.CREATEUSER,data);
  }

  // Edit User
  postEditUser(id ,data) {
    return Http.post(API_ENDPOINT.EDITUSER + id, data)
  }

  // getEditUser
  getEditUser(id) {
    return Http.get(API_ENDPOINT.GETEDITUSER + id )
  }

  ///////////////// API ORG ///////////////////
  getListOrg(){
    return Http.get(API_ENDPOINT.GETLISTORG)
  }

  //UPDATE PASSWORD
  postUpdatePassword(data) {
    return Http.post(API_ENDPOINT.UPDATE_PASSWORD, data);
  }
}
const instance = new UserServices();

export default instance;