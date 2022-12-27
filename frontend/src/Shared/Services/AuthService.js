import { UtilService } from "../";
import { LOCALSTORAGE } from "../../Constances/const";
import { Http } from "../../Helper/Http";

const API_ENDPOINT = {
    LOGIN: "/auth/login",
    ME: "/auth/me",
};

class AuthService extends UtilService {
    constructor() {
        super();
        if (AuthService._instance) {
            return AuthService._instance;
        }
        AuthService._instance = this;
    }

    userInfo = JSON.parse(window.localStorage.getItem(LOCALSTORAGE.USER) || 'null');

    async login(username, password) {
        return (await Http.post(API_ENDPOINT.LOGIN, { username, password })).data;
    }

    async getUserInfo() {
        return (await Http.get(API_ENDPOINT.ME)).data;
    }


    hasRole(role) {
        if (!role || !this.userInfo) return;
        return this.userInfo.role === role.value;
    }

}

const instance = new AuthService();

export default instance;
