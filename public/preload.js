//渲染进程的electron
window.$electron = require('electron');
//将主进程的方法挂载到渲染进程
window.$remote = require('@electron/remote');