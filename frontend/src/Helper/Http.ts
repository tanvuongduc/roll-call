import Axios from "axios";
import { BASE_URL, LOCALSTORAGE } from "../Constances/const";

export class Http {

  constructor() { }

  static _getHeader(): any {
    return {
      "Authorization": `Bearer ${window.localStorage.getItem(LOCALSTORAGE.TOKEN) || ''}`,
    };
  }

  static get = (endPoint: any, params: any) => {
    const options: any = {
      headers: this._getHeader(),
    };
    if (params && Object.keys(params).length) {
      options.params = params;
    }
    return Axios.get(BASE_URL + endPoint, options);
  };

  static post = (endPoint: any, payload: any) => {
    return Axios.post(BASE_URL + endPoint, payload, {
      headers: this._getHeader(),
    });
  };

  static put = (endPoint: any, payload: any) => {
    return Axios.put(BASE_URL + endPoint, payload, {
      headers: this._getHeader(),
    });
  };

  static patch = (endPoint: any, payload: any) => {
    return Axios.patch(BASE_URL + endPoint, payload, {
      headers: this._getHeader(),
    });
  };

  static delete = (endPoint: any, id: any) => {
    return Axios.delete(BASE_URL + endPoint + "/" + id, {
      headers: this._getHeader(),
    });
  };
}
