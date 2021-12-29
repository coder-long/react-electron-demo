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

