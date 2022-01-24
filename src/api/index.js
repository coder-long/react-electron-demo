import { requestGet, requestPost, } from "./request";

export const URL = {
  login: '/users/login',
  register: '/users/register',
  test: '/test1',
  validateToken: '/validateToken'
}


export const getAllData = (params, cfg) => requestGet(url, cfg);
export const LoginRequest = (data, cfg) => requestPost(URL.login, data, cfg);
export const RegisterRequest = (data, cfg) => requestPost(URL.register, data, cfg);
export const testRequest = (params, cfg) => requestGet(URL.test, params, cfg);
export const validateToken = (data, cfg) => requestPost(URL.validateToken, data, cfg);