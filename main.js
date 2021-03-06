const { app, BrowserWindow, ipcMain, Menu, Tray } = require("electron");
const isDev = require('electron-is-dev')
const path = require('path')
const fs = require('fs')
const Store = require('electron-store');
console.log('isDev:', isDev)

const store = new Store();
//记录状态
const screenState = {
  bFullScreen: false,

};
/*
Tray 系统托盘 小标
Menu 菜单
*/

// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow = null, tray = null

//创建托盘
function createTray() {
  tray = new Tray(path.resolve(__dirname, './public/favicon.ico'));
  tray.setToolTip('自己的app');

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'show',
      click: () => {
        mainWindow.show();
        tray = null;
      }
    },
    {
      label: 'quit',
      click: () => {
        app.quit()
      }
    },
  ]);

  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    mainWindow.show()
  })
}

/**
 * 无边框窗口 https://www.electronjs.org/zh/docs/latest/api/frameless-window
*/

//创建主进程
function createWindow(windowUrl = 'http://localhost:3001/main_window') {

  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 800,//800
    height: 400,//400
    // minHeight: 600,
    // minWidth: 1000,
    center: true,
    safeDialogs: true,//对话框保护
    safeDialogsMessage: "是否关闭应用！",
    icon: path.resolve(__dirname, './public/favicon.ico'),
    // // alwaysOnTop: true,//窗口是否永远在别的窗口的上面
    // skipTaskbar: true,//是否在任务栏中显示窗口 默认值为 false。
    webPreferences: {
      nodeIntegration: true,
      preload: path.resolve(__dirname, './preload.js'),//在页面运行其他脚本之前预先加载指定的脚本 无论页面是否集成Node, 此脚本都可以访问所有Node API 脚本路径为文件的绝对路径。
      contextIsolation: false,//是否在独立 JavaScript 环境中运行 Electron API和指定的preload 脚本. 默认为 true
      enableRemoteModule: true,
      webSecurity: false
    },
    frame: false,//设置为 false 时可以创建一个无边框窗口 默认值为 true。
    // closable: false,//界面是否可以关闭
    resizable: true,//窗口是否可以伸缩
    // transparent: true,//只有无边框才起效果 透明窗口
  });


  // 隐藏主菜单栏
  Menu.setApplicationMenu(null);



  const productURL = path.resolve(__dirname, './dist/index.html');
  const urlLocation = isDev ? windowUrl : productURL
  mainWindow.loadURL(urlLocation);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  });

  //当窗口关闭时 创建系统托盘
  mainWindow.on('close', () => {
    mainWindow.hide();

  })

  //创建系统托盘
  createTray();

  // 打开开发者工具
  mainWindow.webContents.openDevTools();
  // mainWindow.webContents.openDevTools({ mode: "bottom" });

  // 关闭window时触发下列事件.
  // mainWindow.on("closed", function () {
  //   mainWindow = null;
  // });

  /**
  * electron 升级 remote删除 解决electron 15 中remote无法使用的办法:
  * https://blog.csdn.net/qq_51634332/article/details/120575284
 */
  require('@electron/remote/main').initialize();
  require('@electron/remote/main').enable(mainWindow.webContents);
}

// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow();

  console.log(BrowserWindow.getAllWindows());
});

//当所有窗口都被关闭后退出
// app.on("window-all-closed", () => {
//   // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
//   // 否则绝大部分应用及其菜单栏会保持激活。
//   if (process.platform !== "darwin") {
//     // app.quit();
//   }
// });

ipcMain.on('window-close', () => {
  mainWindow.hide()
})




app.on("activate", () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
//新窗口渲染进程
ipcMain.on('openPage', (e, arg) => {
  createWindow('http://localhost:3001/page1');
});
//退出应用
ipcMain.on('quit', (e, arg) => {
  app.quit()
});
//隐藏窗口
ipcMain.on('hide', (event, arg) => {
  mainWindow.hide()
  console.log(arg)
})
//最小化窗口
ipcMain.on('minSize', (event, arg) => {
  mainWindow.minimize()
  console.log(arg)
});
//全屏
ipcMain.on('win-full-screen', (e, arg) => {
  screenState.bFullScreen = true;
  mainWindow.maximize()
  console.log(arg)
});
//取消全屏
ipcMain.on('cancel-win-full-screen', (e, arg) => {
  screenState.bFullScreen = false;
  mainWindow.unmaximize()
  console.log(arg)
})
//监听登录变化
ipcMain.on('isLogin', (event, arg) => {
  console.log('isLogin', arg)
  if (Boolean(arg) && arg) {
    console.log('监听登录变化', arg)
    mainWindow.unmaximize();
    mainWindow.setContentSize(800, 400);
    mainWindow.setResizable(false);
  } else {
    mainWindow.setContentSize(1200, 800)
    mainWindow.setResizable(true)
  }
  mainWindow.center()
})
//是否记住用户信息
ipcMain.on('loginRember', (event, arg) => {
  store.set('user', { ...arg })
})
//再次打开应用是将记住的用户信息推送出去
ipcMain.handle('remberLogin', (event, ...arg) => {
  return store.get('user');
})
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

module.exports = mainWindow