import axios from "axios";
import { message } from 'antd'
import history from '../router/config'
import config from '../config/index.js'

let serve = axios.create({
  baseURL: config.getConfig('baseURL'),
  timeout: 1000 * 60 * 2
})

let token

(async () => {
  token = await $electron.ipcRenderer.invoke('token')
})()


//请求拦截器 添加token等信息
serve.interceptors.request.use(async config => {

  config.headers.authorization = token; //请求头加上token

  return config
}, err => {
  return Promise.reject(err)
})

//响应拦截器
serve.interceptors.response.use(res => {

  console.log(res);



  return res.data;
}, err => {
  //初始页面不显示提示信息
  if (history.location.pathname === '/initialPage') {
    return Promise.reject(err);
  };

  switch (err.response.status) {
    case 400:
      message.error('请求错误！');
      break;
    // 401: 未登录状态，跳转登录页
    case 401:
      console.log('token无效 !')
      message.error('登录过期，请重新登录 !')
      $electron.ipcRenderer.send('saveToken', '');
      $electron.ipcRenderer.send('isLogin', true)
      history.replace('/login')
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      message.error('访问被拒绝 !')
      break;
    // 404请求不存在
    case 404:
      // 请求的资源不存在
      message.error('访问资源不存在 !')
      break;
    default:
      console.log('other');
  }
  return Promise.reject(err)
})

export default serve;