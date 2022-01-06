# Getting Started with Create React App
### Run App

npm run dev




#### 组件外部使用redux
- 见utils/socketio.js
  ```
  import store from '../redux/store';
  import { loadData } from '../redux/action'
  import { io } from "socket.io-client";

  const socket = io('http://127.0.0.1:3000');
  console.log(socket)
  //连接状态放入redux 组件外部使用redux
  store.dispatch(loadData({ socketConnectedState: socket.connected }, 'socketData'));
  ```

#### 函数组件中使用store数据 react-redux
- [函数组价使用store数据](https://www.cnblogs.com/cazj/p/15186278.html)
  ```
    const current = useSelector((state) => {
    return state
    })

  console.log(current);
  ```
#### [心跳检测机制](http://yeyingxian.blog.163.com/blog/static/3447124201441462613517/)
- 通常做法
- 客户端发送心跳 ，服务端收到后回复
- 客户端设施一个定时器，测量发出心跳后多久没后回复就认为连接断开
- 前端代码
  ```
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
  ```
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
  ```
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





