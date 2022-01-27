import { requestGet, requestPost, } from "./request";

export const URL = {
  login: '/users/login',
  register: '/users/register',
  test: '/test1',
  validateToken: '/validateToken',
  updateUser: '/users/update-user',
  getUserInfo: '/users/get-user-info',
  getAllUser: 'users/get-all-user',
}


export const getAllData = (params, cfg) => requestGet(url, params, cfg);
export const LoginRequest = (data, cfg) => requestPost(URL.login, data, cfg);
export const RegisterRequest = (data, cfg) => requestPost(URL.register, data, cfg);
export const testRequest = (params, cfg) => requestGet(URL.test, params, cfg);
export const validateToken = (data, cfg) => requestPost(URL.validateToken, data, cfg);
export const updateUser = (data, cfg) => requestPost(URL.updateUser, data, cfg);
export const getUserInfo = (params, cfg) => requestGet(URL.getUserInfo, params, cfg);
export const getAllUser = (params, cfg) => requestGet(URL.getAllUser, params, cfg);