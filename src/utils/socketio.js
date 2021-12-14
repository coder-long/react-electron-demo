import { io } from "socket.io-client";

const socket = io('http://127.0.0.1:3000');
let timer = null;

socket.emit('key', 'val')

// client-side
socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx

  socket.emit('url', 'http://127.0.0.1:3001')

  timer = setInterval(() => {
    socket.emit('connected', "客户端连接状态: connect")
  }, 5000)
});

socket.on("disconnect", () => {
  console.log('连接断开'); // undefined
  socket.emit('disconnected', "客户端连接状态: disconnect")

  if (timer) {
    clearInterval(timer);
  }
});




export default socket;