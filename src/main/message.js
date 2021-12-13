const { ipcMain } = require('electron')
function useMessage(win) {
  ipcMain.on('loginAction', (event, args) => {
    console.log(args)
  })
  ipcMain.on('winAction', (event, args) => {
    switch (args) {
      case "min":
        win.minimize()
        break;
      case 'max':
        if (win.isMaximized()) {
          win.unmaximize()
        } else {
          win.maximize()
        }
        break
      case 'close':
        break
      default:
        break
    }
  })
}
module.exports = {
  useMessage
}