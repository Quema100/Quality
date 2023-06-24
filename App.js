const { app, BrowserWindow} = require('electron');
const path = require('path')
// Express.js 서버 모듈을 가져온다.
const server = require('./src/backend/server.js');

const createWindow = () => {
    const win = new BrowserWindow({
      frame: false, // 타이틀바 숨기기
      width: 1000,
      height: 600,
      icon: path.join(__dirname, './icon/biggericon.png'),
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        devTools:true,
        preload: path.join(__dirname, './preload.js')
      },
    })

    server.start()
    win.setMenuBarVisibility(false)
    win.loadURL('http://localhost:3000');
    win.loadFile('./src/web/main.html')

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