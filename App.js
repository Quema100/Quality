const { app, BrowserWindow, Menu, Tray} = require('electron');
const path = require('path')
// Express.js 서버 모듈을 가져온다.
const server = require('./src/backend/server.js');

function initTrayIconMenu(win) {
  const tray = new Tray('./icon/biggericon.png');
  const myMenu = Menu.buildFromTemplate([
    {
      label: 'Open Quality',
      type: 'normal',
      checked: true,
      click: () => {
        if (win.isMinimized()) {
          win.focus();
        } else {
          win.show();
        }
      }
    },
    {
      label: 'Quit Quality',
      type: 'normal',
      click: () => {
        win.destroy(); // 창 닫기
      }
    },
    {
      label: 'Restart Quality',
      type: 'normal',
      click: () => {
          app.relaunch();
          app.exit();
      }
    }
  ]);

  tray.setToolTip('Quality');
  tray.setContextMenu(myMenu);

  // 트레이 아이콘 클릭 이벤트 처리
  tray.on('click', () => {
    if (win.isMinimized()) {
      win.focus();
    } else {
      win.show();
    }
  });
}

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
  
  win.on('close', (event) => {
    event.preventDefault(); // 기본 close 동작 막기
    win.hide(); // 창 숨기기
  });
  
  server.start()
  win.setMenuBarVisibility(false)
  win.loadURL('http://localhost:3000');
  initTrayIconMenu(win)
  //win.loadFile('./src/web/main.html')

}

app.whenReady().then(() => {
  createWindow()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
    
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  } 
})