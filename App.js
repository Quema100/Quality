const { app, BrowserWindow, Menu, Tray, ipcMain} = require('electron');
const path = require('path')
// 서버 모듈을 가져온다.
const server = require('./src/backend/server.js');

let win;

// 단일 인스턴스로 실행 중인지 확인
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
  return;
}

function initTrayIconMenu() {
  const tray = new Tray('./icon/biggericon.png');
  const myMenu = Menu.buildFromTemplate([
    {
      label: 'Open Quality',
      type: 'normal',
      checked: true,
      click: () => {
        if (win.isMaximized()) {
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
    if (win.isMaximized()) {
      win.focus();
    } else {
      win.show();
    }
  });
}

const createWindow = () => {
  win = new BrowserWindow({
    frame: false, // 타이틀바 숨기기
    width: 1000,
    height: 600,
    icon: path.join(__dirname, './icon/biggericon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
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
  initTrayIconMenu()
  //win.loadFile('./src/web/main.html')

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
    
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  } 
})

ipcMain.on("toMain", (event, data) => {
  console.log(`Received [${data}] from renderer browser`);
  win.webContents.send("fromMain", ' here is main! ');
});

  // 이벤트 수신
ipcMain.on('close-window', () => {
  win.close();
});

ipcMain.on('minimize-window', () => {
  win.minimize();
});

ipcMain.on('maximize-window', () => {
  if (win.isMaximized()) {
    win.restore();
  } else {
    win.maximize();
  }
});