# Getting Started with Create React App
### Run App

npm run dev

### 目录结构
```
|-- src
    |   |-- App.css
    |   |-- App.js
    |   |-- App.test.js
    |   |-- directoryList.md
    |   |-- index.css
    |   |-- index.js
    |   |-- logo.svg
    |   |-- reportWebVitals.js
    |   |-- setupTests.js
    |   |-- api
    |   |   |-- index.js
    |   |   |-- request.js
    |   |   |-- serve.js
    |   |-- charts
    |   |   |-- charts.js
    |   |-- components
    |   |   |-- baseMsg
    |   |   |   |-- BaseMsg.jsx
    |   |   |-- classCom
    |   |   |   |-- Demo.jsx
    |   |   |   |-- fuzujian.jsx
    |   |   |   |-- Tmp.jsx
    |   |   |   |-- zizujian.jsx
    |   |   |-- funCom
    |   |   |   |-- FunComDemo.jsx
    |   |   |   |-- index.jsx
    |   |   |-- JiuJia
    |   |   |   |-- Jiujia.jsx
    |   |   |-- Log
    |   |   |   |-- Log.jsx
    |   |   |-- Setting
    |   |       |-- Setting.jsx
    |   |       |-- setting.scss
    |   |-- config
    |   |   |-- index.js
    |   |   |-- map.js
    |   |-- i18n
    |   |   |-- index.js
    |   |   |-- resources.js
    |   |   |-- locales
    |   |       |-- en.json
    |   |       |-- zh.json
    |   |-- pages
    |   |   |-- index.scss
    |   |   |-- InitialPage.jsx
    |   |   |-- Home
    |   |   |   |-- Home.jsx
    |   |   |   |-- home.scss
    |   |   |   |-- TbCharts.jsx
    |   |   |   |-- tbChartsOption.js
    |   |   |-- Login
    |   |   |   |-- bg.png
    |   |   |   |-- Login.jsx
    |   |   |   |-- login.scss
    |   |   |   |-- loginCfg.js
    |   |   |   |-- LoginPage.jsx
    |   |   |-- Music
    |   |       |-- Music.jsx
    |   |       |-- music.scss
    |   |-- redux
    |   |   |-- action
    |   |   |   |-- index.js
    |   |   |   |-- type.js
    |   |   |-- reducer
    |   |   |   |-- index.js
    |   |   |   |-- initialState.js
    |   |   |-- store
    |   |       |-- index.js
    |   |-- router
    |   |   |-- config.js
    |   |   |-- index.js
    |   |-- socket
    |   |   |-- socketio.js
    |   |-- theme
    |   |   |-- index.less
    |   |   |-- style.less
    |   |-- utils
    |-- static
    |   |-- config.json
    |   |-- Iconfont
    |   |   |-- iconfont.css
    |   |   |-- iconfont.eot
    |   |   |-- iconfont.json
    |   |   |-- iconfont.svg
    |   |   |-- iconfont.ttf
    |   |   |-- iconfont.woff
    |   |   |-- iconfont.woff2
    |   |-- images
    |       |-- bg.png
    |-- .babelrc
    |-- .env
    |-- .gitignore
    |-- main.js
    |-- package-lock.json
    |-- package.json
    |-- preload.js
    |-- README.md
    |-- server.js
    |-- test.js
    |-- webpack.common.js
    |-- webpack.config.js
    |-- webpack.dev.js
    |-- webpack.prod.js
```



#### 组件外部使用redux
- 见utils/socketio.js
  ```javascript
  import store from '../redux/store';
  import { loadData } from '../redux/action'
  import { io } from "socket.io-client";

  const socket = io('http://127.0.0.1:3000');
  console.log(socket)
  //连接状态放入redux 组件外部使用redux
  store.dispatch(loadData({ socketConnectedState: socket.connected }, 'socketData'));
  ```

#### 函数组件中使用store数据 react-redux
- [函数组价使用store数据](https://www.cnblogs.com/cazj/p/15186278.html) 见（Login.jsx）
  ```javascript
    const dispatch = useDispatch();
    const httpQueryData = bindActionCreators(reduxFunc.httpQueryData, dispatch);
    const loadData = bindActionCreators(reduxFunc.loadData, dispatch);
    const current = useSelector((state) => {
    return state
    })

  console.log(current);
  ```
- 另外一种方式 直接连接redux 通过props使用 （见初始界面 InitialPage.jsx）
  ```javascript
    import React, { useState, useEffect, } from "react";
    import { connect } from 'react-redux';
    import { Progress, } from 'antd';
    import * as reduxFunc from '../redux/action'
    import { bindActionCreators } from "redux";
    import { validateToken } from "../api";
    import './index.scss'

    function InitialPage(props) {

      const [percent, setPercent] = useState(1)
      const [complete, setComplete] = useState(false)


      /*
      * 是否需要登录 默认需要登录
      */
      const [token, setToken] = useState('')

      useEffect(async () => {

        console.log(props)
        let percent = 1
        let timer = setInterval(() => {
          percent += Math.random() * 10
          if (percent > 100) {
            percent = 100
            setComplete(true)
            clearInterval(timer)
          }
          setPercent(percent)
        }, 20)


        let token = await $electron.ipcRenderer.invoke('token');
        setToken(token);

      }, [])

      useEffect(async () => {
        // 初始界面进度条加载完成 做的操作
        if (complete) {

          if (token && token.length) {
            let { data: { bValid = false, msg = '' } } = await validateToken({ token: token });
            let userInfo = await $electron.ipcRenderer.invoke('remberLogin')
            if (bValid) {
              props.loadData(userInfo, 'userInfo')
              props.history.replace('/home')
              $electron.ipcRenderer.send('isLogin', false)
            } else {
              props.history.replace('/login')
              $electron.ipcRenderer.send('isLogin', true)
            }
          } else {
            props.history.replace('/login')
            $electron.ipcRenderer.send('isLogin', true)
          }
        }

      }, [complete, token])

      return (
        <div className="progress">
          <img src={`${_static}/images/bg.png`} alt="" />
          <Progress percent={percent} status="active" showInfo={false} />
        </div>
      )
    }

    //映射到store
    const mapStateToProps = (state) => {
      const { socketData = {}, userInfo = {} } = state.staticData;//静态数据
      const { httpHel = {} } = state.httpData;//http数据
      return { httpHel, socketData, userInfo }
    }

    const mapDispatchToProps = (dispatch, props) => {//props 父组件传过来的参数
      return {
        //dispatch 内传入action(actionCreator创建者)(就是那个addTodo函数的返回值)  dispatch之后交给reducer处理
        //对应addTodo reducer处理了之后返回一个新的state更新store
        //更新完store后自动刷新页面
        httpQueryData: () => bindActionCreators(reduxFunc.httpQueryData, dispatch),
        loadData: bindActionCreators(reduxFunc.loadData, dispatch),
      };
    }

    export default connect(mapStateToProps, mapDispatchToProps)(InitialPage);

  ```
#### [心跳检测机制](http://yeyingxian.blog.163.com/blog/static/3447124201441462613517/)
- 通常做法
- 客户端发送心跳 ，服务端收到后回复
- 客户端设施一个定时器，测量发出心跳后多久没后回复就认为连接断开
- 前端代码
  ```javascript
  // client-side
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx

    socket.emit('url', 'http://127.0.0.1:3001')
    store.dispatch(loadData({ socketConnectedState: socket.connected }, 'socketData'));

    timer = setInterval(() => {
      socket.emit('connected', "客户端连接状态: connect")
    }, 5000)
  });
  ```
- 后端代码
  ```javascript
      /*
      server socket
    */

    const socket_io = require('socket.io');
    let connectHostArr = [];//连接的地址
    let Socket = null

    module.exports = {
        initSocketio(server) {
            //解决socket 跨域 加{cors: true}
            let io = socket_io(server, {cors: true});
            io.on('connect', (socket) => {
                socket.on('url', (url) => {
                    if (connectHostArr.indexOf(url) === -1) {
                        connectHostArr.push(url);
                    }
                    console.log('当前连接数量:' + connectHostArr.length);
                })

                console.log('socket连接成功,连接id:', socket.id);

                Socket = socket

                socket.on('connected', (state) => {
                    console.log(state);
                })

                socket.on('click1', function () {
                    console.log('监听点击事件');
                    var datas = [1, 2, 3, 4, 5];
                    socket.emit('click2', {datas: datas});
                    socket.broadcast.emit('click2', {datas: datas});
                })

            })

            //断开连接
            io.on('disconnect', (socket) => {
                console.log(socket)
                socket.on("disconnected", (state) => {
                    console.log(state)
                })
            })
        },
        getSocket() {
            if (Socket) {
                return Socket
            } else {
                return null
            }
        }
    }
  ```

#### elelctron-packager
- 打包只是打包成各个平台下可执行文件，并不是安装包

#### electron-builder 可以打包成安装包
- [Electron-builder打包详解](https://www.jianshu.com/p/4699b825d285?from=timeline)
  package.json中完整配置
  ```json
  "build": {
    "productName":"xxxx",//项目名 这也是生成的exe文件的前缀名
    "appId": "com.leon.xxxxx",//包名
    "copyright":"xxxx",//版权  信息
    "directories": { // 输出文件夹
      "output": "build"
    },
    "nsis": {
      "oneClick": false, // 是否一键安装
      "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
      "allowToChangeInstallationDirectory": true, // 允许修改安装目录
      "installerIcon": "./build/icons/aaa.ico",// 安装图标
      "uninstallerIcon": "./build/icons/bbb.ico",//卸载图标
      "installerHeaderIcon": "./build/icons/aaa.ico", // 安装时头部图标
      "createDesktopShortcut": true, // 创建桌面图标
      "createStartMenuShortcut": true,// 创建开始菜单图标
      "shortcutName": "xxxx", // 图标名称
      "include": "build/script/installer.nsh", // 包含的自定义nsis脚本
    },
    "publish": [
      {
        "provider": "generic", // 服务器提供商 也可以是GitHub等等
        "url": "http://xxxxx/" // 服务器地址
      }
    ],
    "files": [
      "dist/electron/**/*"
    ],
    "dmg": {
      "contents": [
        {
          "x": 410,
          "y": 150,
          "type": "link",
          "path": "/Applications"
        },
        {
          "x": 130,
          "y": 150,
          "type": "file"
        }
      ]
    },
    "mac": {
      "icon": "build/icons/icon.icns"
    },
    "win": {
      "icon": "build/icons/aims.ico",
      "target": [
        {
          "target": "nsis",
          "arch": [
            "ia32"
          ]
        }
      ]
    },
    "linux": {
      "icon": "build/icons"
    }
  }
  ```
- [打包失败  Application entry file “build/electron.js“](https://blog.csdn.net/weixin_42826294/article/details/113592301)

### 项目打包
- npm run build
- npm run pkg1

### 知识点

- 禁止用户选择样式
  ```css
   user-select: none;
  ```

- 界面移动之后点击事件无法触发
  **父元素设置 `-webkit-app-region: drag;`**
  **子元素设置 `-webkit-app-region: no-drag;`**


- 背景图设置
  将图片导入进来 然后设置背景
  ```
  import bg from './bg.png'

  <div className="login_moudel" style={{ backgroundImage: `url(${bg})` }}></div>
  ```

- webpack5 配置更改（之前没有注意，用的是w4的写法）
  * [webpack资源配置](https://webpack.docschina.org/guides/asset-modules/#inlining-assets)
  - 静态资源打包插件 [copy-webpack-plugin
](https://www.npmjs.com/package/copy-webpack-plugin/v/9.0.1)
  - 踩坑记录：之前一直用的最新版本的copy-webpack-plugin插件 导致报错 如下
  ```
    HookWebpackError: Invalid host defined options
      at makeWebpackError (D:\workspace\my-react-demo\node_modules\webpack\lib\HookWebpackError.js:48:9)
      at D:\workspace\my-react-demo\node_modules\webpack\lib\Compilation.js:2517:12
      at eval (eval at create (D:\workspace\my-react-demo\node_modules\webpack\node_modules\tapable\lib\HookCodeFactory.js:33:10), <anonymous>:74:1)
      at D:\workspace\my-react-demo\node_modules\webpack\lib\Compilation.js:482:26
      at D:\workspace\my-react-demo\node_modules\copy-webpack-plugin\dist\index.js:705:13
      at runMicrotasks (<anonymous>)
      at processTicksAndRejections (internal/process/task_queues.js:93:5)

    TypeError: Invalid host defined options
      at D:\workspace\my-react-demo\node_modules\copy-webpack-plugin\dist\index.js:701:13
      at fn (D:\workspace\my-react-demo\node_modules\webpack\lib\Compilation.js:481:9)
      at Hook.eval [as callAsync] (eval at create (D:\workspace\my-react-demo\node_modules\webpack\node_modules\tapable\lib\HookCodeFactory.js:33:10), <anonymous>:72:1)
      at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (D:\workspace\my-react-demo\node_modules\webpack\node_modules\tapable\lib\Hook.js:18:14)
      at cont (D:\workspace\my-react-demo\node_modules\webpack\lib\Compilation.js:2514:34)
      at D:\workspace\my-react-demo\node_modules\webpack\lib\Compilation.js:2560:10
      at symbolIterator (D:\workspace\my-react-demo\node_modules\neo-async\async.js:3485:9)
      at timesSync (D:\workspace\my-react-demo\node_modules\neo-async\async.js:2297:7)
      at Object.eachLimit (D:\workspace\my-react-demo\node_modules\neo-async\async.js:3463:5)
      at Compilation.createChunkAssets (D:\workspace\my-react-demo\node_modules\webpack\lib\Compilation.js:3798:12)
    caused by plugins in Compilation.hooks.processAssets
    TypeError: Invalid host defined options
      at D:\workspace\my-react-demo\node_modules\copy-webpack-plugin\dist\index.js:701:13
      at fn (D:\workspace\my-react-demo\node_modules\webpack\lib\Compilation.js:481:9)
      at Hook.eval [as callAsync] (eval at create (D:\workspace\my-react-demo\node_modules\webpack\node_modules\tapable\lib\HookCodeFactory.js:33:10), <anonymous>:72:1)
      at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (D:\workspace\my-react-demo\node_modules\webpack\node_modules\tapable\lib\Hook.js:18:14)
      at cont (D:\workspace\my-react-demo\node_modules\webpack\lib\Compilation.js:2514:34)
      at D:\workspace\my-react-demo\node_modules\webpack\lib\Compilation.js:2560:10
      at symbolIterator (D:\workspace\my-react-demo\node_modules\neo-async\async.js:3485:9)
      at timesSync (D:\workspace\my-react-demo\node_modules\neo-async\async.js:2297:7)
      at Object.eachLimit (D:\workspace\my-react-demo\node_modules\neo-async\async.js:3463:5)
      at Compilation.createChunkAssets (D:\workspace\my-react-demo\node_modules\webpack\lib\Compilation.js:3798:12)
  ```
  - 解决办法就是将插件的版本降低 目前用的是`"copy-webpack-plugin": "^9.1.0"`

- 使用外部静态字体图标（iconfont）
  - 在index.html 中添加`<link rel="stylesheet" href="static/Iconfont/iconfont.css">` 注意路径
  - 如果引入正确的话，但是没有显示，可能是下载字体图标的时候出问题了，阿里巴巴图标下载默认不会有`eot、svg、base64`这几个选项，需要手动勾选上
  - 勾选了然后在下载到本地，这样界面上的图标就会显示了(我之前没有勾选界面上图标一直没有显示，最后看了文档才知道现在版本不会默认勾选)
  - 完整的是woff2、woff、ttf、eot、svg、base64
  - [设置链接](https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=3148156&keyword=&project_type=&page=) 的 *项目设置*

- 主进程将store的数据推送给渲染进程
  - [electron对应文档地址](https://www.electronjs.org/zh/docs/latest/api/ipc-renderer#ipcrendererinvokechannel-args)
  - 代码中

    ```javascript
      //main
      //保存token信息
      ipcMain.on('saveToken', (event, arg) => {
        console.log(arg)
        store.set('token', arg || '')
      });
      //获取token信息
      ipcMain.handle('token', (event, ...arg) => {
        console.log(193, store.get("token"))
        return store.get("token")
      })

      //IPC
      //保存token信息
      $electron.ipcRenderer.send('saveToken', data.token);
      //获取token信息
      await $electron.ipcRenderer.invoke('token')

    ```

- 获取错误请求的响应状态码 status
  - err.response.status

    ```javascript
    //请求失败拦截器
    (err) => {
      switch (err.response.status) {
        case 400:
          message.error('请求错误！');
          break;
        // 401: 未登录状态，跳转登录页
        case 401:
          console.log('token无效 !')
          message.error('登录过期，请重新登录 !')
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
    }
    ```
- 翻译i18n 不同模块翻译区分
  ```javascript
  //翻译json
  {
    "login": {
      "请输入用户名": "请输入用户名",
      "请输入密码": "请输入密码",
      "记住密码": "记住密码",
      "忘记密码": "忘记密码",
      "登录": "登录",
      "注册": "注册",
      "用户名": "用户名",
      "密码": "密码",
      "确认密码": "确认密码",
      "密码不匹配": "两次密码不匹配"
      },
    "otherMoudel": {
      "aaa": "aaa"
    }
  }

  //用法
  t("login.记住密码") //记住是点调用 ,[]我这里好像不行 没有找到原因
  t("otherMoudel.aaa")
  ```
- 解决 electron static静态资源无法加载的问题
  - issue  Not allowed to load local resource: file:///D:/workspace/my-react-demo/static/images/bg.png
    ```
    //在main.js 中加上这个属性配置
     webPreferences: {
    + webSecurity: false,
    },
    ```
- 验证token是否有效
  - 后端生成的token会在token前面加一个标识给前端 或者前端加标识  ，当前端把token传给后端验证的时候 ， 后端需要把token前面的标识符截取掉 ，然后再验证。
- 打印目录结构
  - 安装包  `npm install mddir -D`
  - 命令行cd到目标目录 直接运行  `mddir` 或者 `npx mddir` 命令
  - 完成之后会生成一个 `directoryList.md`文件，就是目录结构
    ```
    |-- src
    |-- App.css
    |-- App.js
    |-- App.test.js
    |-- index.css
    |-- index.js
    |-- logo.svg
    |-- reportWebVitals.js
    |-- setupTests.js
    |-- api
    |   |-- index.js
    |   |-- request.js
    |   |-- serve.js
    |-- charts
    |   |-- charts.js
    |-- components
    |   |-- baseMsg
    |   |   |-- BaseMsg.jsx
    |   |-- classCom
    |   |   |-- Demo.jsx
    |   |   |-- fuzujian.jsx
    |   |   |-- Tmp.jsx
    |   |   |-- zizujian.jsx
    |   |-- funCom
    |   |   |-- FunComDemo.jsx
    |   |   |-- index.jsx
    |   |-- JiuJia
    |   |   |-- Jiujia.jsx
    |   |-- Log
    |   |   |-- Log.jsx
    |   |-- Setting
    |       |-- Setting.jsx
    |       |-- setting.scss
    |-- config
    |   |-- index.js
    |   |-- map.js
    |-- i18n
    |   |-- index.js
    |   |-- resources.js
    |   |-- locales
    |       |-- en.json
    |       |-- zh.json
    |-- pages
    |   |-- index.scss
    |   |-- InitialPage.jsx
    |   |-- Home
    |   |   |-- Home.jsx
    |   |   |-- home.scss
    |   |   |-- TbCharts.jsx
    |   |   |-- tbChartsOption.js
    |   |-- Login
    |   |   |-- bg.png
    |   |   |-- Login.jsx
    |   |   |-- login.scss
    |   |   |-- loginCfg.js
    |   |   |-- LoginPage.jsx
    |   |-- Music
    |       |-- Music.jsx
    |       |-- music.scss
    |-- redux
    |   |-- action
    |   |   |-- index.js
    |   |   |-- type.js
    |   |-- reducer
    |   |   |-- index.js
    |   |   |-- initialState.js
    |   |-- store
    |       |-- index.js
    |-- router
    |   |-- config.js
    |   |-- index.js
    |-- socket
    |   |-- socketio.js
    |-- theme
    |   |-- index.less
    |   |-- style.less
    |-- utils

    ```

- **打包之后如果发现找不到模块包，那么要检查一下`package.json` 中的依赖是否是开发依赖和生产环境的依赖（之前打好包打开应用时一直报找不到模块，最后才发现是安装包的时候安装到开发依赖里面了）**
  - --save || -S 生产依赖
  - --save-dev || -D 开发依赖，顾名思义就是开发的时候所需的依赖包，打包的时候是不会打包的。
- 路由跳转 状态保持
  - 安装 `npm i react-keepalive-router`
  - [地址及使用方法](https://www.npmjs.com/package/react-keepalive-router/v/1.1.3)

- 公共表单组件封装
  - 见components/common/FormComp.jsx
  - [文章地址](https://www.cnblogs.com/tnnyang/p/13497306.html)

- **async...await 错误处理** [https://zhuanlan.zhihu.com/p/85865426](https://zhuanlan.zhihu.com/p/85865426)
  ```javascript
  //方案一
  const handleOk = async () => {
    try {
      let values = await curForm.validateFields();
      let { data } = await updateUser(values);
    } catch (error) {
      console.error("validateFields", error)
    }
  }
  //方案二
  const to = promise => {
    return promise.then(res => [null, res]).catch(error => [error]);
  };

  async function fn() {
  // 每个异步都需要处理
    let [error, res] = await to(fetchVehicle())
    console.log("error", error);
    console.log("res", res);
  }
  ```