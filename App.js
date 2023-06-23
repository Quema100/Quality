const { app, BrowserWindow} = require('electron');
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
      frame: false, // 타이틀바 숨기기
      width: 800,
      height: 600,
      icon: path.join(__dirname, './icon/biggericon.png'),
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    })
    win.setMenuBarVisibility(false)
    win.loadFile('main.html')

  }

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  })
    
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    } 
  })