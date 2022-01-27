import store from '../redux/store';
import { loadData } from '../redux/action'
import { io } from "socket.io-client";

const socket = io('http://127.0.0.1:3000');

//连接状态放入redux 组件外部使用redux
store.dispatch(loadData({ socketConnectedState: socket.connected }, 'socketData'));

let timer = null;

socket.emit('key', 'val')

// client-side
socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx

  socket.emit('url', window.location.origin)
  store.dispatch(loadData({ socketConnectedState: socket.connected }, 'socketData'));

  timer = setInterval(() => {
    socket.emit('connected', "客户端连接状态: connect")
  }, 5000)
});

socket.on("disconnect", () => {
  console.log('连接断开'); // undefined
  socket.emit('url', window.location.origin)
  socket.emit('disconnected', "客户端连接状态: disconnect")
  store.dispatch(loadData({ socketConnectedState: socket.connected }, 'socketData'));

  if (timer) {
    clearInterval(timer);
  }
});




export default socket;