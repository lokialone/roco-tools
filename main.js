const { app, BrowserWindow, globalShortcut,Menu, MenuItem, ipcMain, remote, clipboard } = require('electron')
// const ListenClipBoard = require('./clipboard')
const menu = new Menu()
const path = require('path')
// let listenClipBoard
let win = null
// let clipInfo = []
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
  if (process.env.NODE_ENV === 'dev') {
    win.loadURL('http://localhost:8080')
  } else {
    win.loadFile(path.join(__dirname, 'build/index.html'));
  }
 
  // 打开开发者工具
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow).then(() => {
    globalShortcut.register('CommandOrControl+option+C', () => {
      console.log('CommandOrControl+option+C is pressed')
      win.show()
    })
    // listenClipBoard = new ListenClipBoard()
    // listenClipBoard.on('clip-change', (val) => {
    //   clipInfo = val;
    //   win.webContents.send('render', val)
    // })
})
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // listenClipBoard.destroy();
    globalShortcut.unregisterAll()
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
