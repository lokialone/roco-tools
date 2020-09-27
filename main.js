const { app, BrowserWindow, globalShortcut,ipcMain } = require('electron')
const ListenClipBoard = require('./clipboard')

let listenClipBoard
let win = null
function createWindow () {   
  // 创建浏览器窗口
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 并且为你的应用加载index.html
  win.loadFile('index.html')
  // 打开开发者工具
  // win.webContents.openDevTools()
}

app.whenReady().then(createWindow).then(() => {
    listenClipBoard = new ListenClipBoard()
    listenClipBoard.on('clip-change', (val) => {
      win.webContents.send('render', val)
    })
})
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    listenClipBoard.destroy();
    app.quit()
  }

})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
