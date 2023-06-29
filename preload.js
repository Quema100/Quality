const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
  "api", {
      send: (channel, data) => {
          let validChannels = ["toMain"]; // IPC채널들 추가
          if (validChannels.includes(channel)) {
              ipcRenderer.send(channel, data);
          }
      },
      receive: (channel, func) => {
          let validChannels = ["fromMain"]; // IPC채널들 추가
          if (validChannels.includes(channel)) {
              ipcRenderer.on(channel, (event, ...args) => func(...args));
          }
      }
  }
);

window.addEventListener('DOMContentLoaded', () => {
  let close = document.getElementById('close');
  let mini = document.getElementById('mini');
  let max = document.getElementById('max');
  let back = document.getElementById("back")

  close.addEventListener('click', () => {
    ipcRenderer.send('close-window');
  });

  mini.addEventListener('click', () => {
    ipcRenderer.send('minimize-window');
  });

  max.addEventListener('click', () => {
    ipcRenderer.send('maximize-window');
  });
  back.addEventListener("click", () => {
    ipcRenderer.send('goBack');
  });
});