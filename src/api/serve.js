import axios from "axios";

let serve = axios.create({
  // baseURL: '',
  timeout: 1000 * 60 * 2
})


serve.interceptors.request.use(config => {
  // config.headers.authorization = "Basic amp1c2VyOkpKSkpwYXNzd29yZDEh"; //请求头加上token
  config.headers.tk = "wxapptoken:10:1f6375e5c122cad3cebba4de87e1a468_f6a28e6318bad0151a31a85666b48e2f"; //请求头加上token
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

  return config
}, err => {
  return Promise.reject(err)
})

// serve.interceptors.response.use(res => {

//   console.log(res);

//   switch (res.status) {
//     // 401: 未登录状态，跳转登录页
//     case 401:
//       // toLogin();
//       break;
//     // 403 token过期
//     // 清除token并跳转登录页
//     case 403:
//       // tip('登录过期，请重新登录');
//       // localStorage.removeItem('token');
//       // store.commit('loginSuccess', null);
//       // setTimeout(() => {
//       //   toLogin();
//       // }, 1000);
//       break;
//     // 404请求不存在
//     case 404:
//       // 请求的资源不存在
//       break;
//     default:
//       console.log('other');
//   }


//   return res;
// }, err => {
//   return Promise.reject(err)
// })

export default serve;