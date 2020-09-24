const { app, BrowserWindow, globalShortcut } = require('electron')
const {clipboard} = require('electron')

function createWindow () {   
  // 创建浏览器窗口
  const win = new BrowserWindow({
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
  setInterval(() => {
    // console.log('xxx',clipboard.readText());
  }, 1000);
})
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    globalShortcut.unregister("Ctrl+X");
	  // 注销所有快捷键
	  globalShortcut.unregisterAll();
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
