const { app, BrowserWindow, globalShortcut, session } = require("electron");
const { useMessage } = require('./message')
const path = require('path')
let win = null;
app.on("ready", async () => {
  win = new BrowserWindow({
    width: 1068,
    height: 650,
    frame: false, // 无边框 需要设置相应的css才能拖拽
    movable: true,
    titleBarOverlay: {
      color: "#2f3241",
      symbolColor: "#74b1be",
    },
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  globalShortcut.register('Control+Shift+i', function () {
    win.webContents.openDevTools()
  })
  // await session.defaultSession.loadExtension(path.resolve(__dirname + '../../devtools/ljjemllljcmogpfapbkkighbhhppjdbg/6.0.0.20_0'))
  win.loadURL("http://localhost:3000/");
});
useMessage(win)
