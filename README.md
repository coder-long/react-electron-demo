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
[函数组价使用store数据]https://www.cnblogs.com/cazj/p/15186278.html
  ```
    const current = useSelector((state) => {
    return state
    })

  console.log(current);
  ```
#### 心跳检测机制
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






