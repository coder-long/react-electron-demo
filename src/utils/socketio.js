import { io } from "socket.io-client";

const socket = io('http://127.0.0.1:3000');


socket.emit('key', 'val')

// client-side
socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("disconnect", () => {
  console.log(socket.id); // undefined
});