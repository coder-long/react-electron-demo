import { requestGet, requestPost, } from "./request";

export const URL = {
  login: '/users/login',
  register: '/users/register',
}


export const getAllData = (url, data) => requestGet(url, data);
export const LoginRequest = ({ url = URL.login, data, cfg }) => requestPost(url, data, cfg);
export const RegisterRequest = ({ url = URL.register, data, cfg }) => requestPost(url, data, cfg);