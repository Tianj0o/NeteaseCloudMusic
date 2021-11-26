const { app, BrowserWindow } = require('electron')
let win = null;
app.on("ready", () => {
  win = new BrowserWindow({
    width: 1030,
    height: 650,
    // frame: false,
    // titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#2f3241',
      symbolColor: '#74b1be'
    },
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  // win.loadFile('../renderer/dist/index.html')
  win.loadURL("http://localhost:3000/");
});
