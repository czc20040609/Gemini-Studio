const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  controlWindow: (command) => ipcRenderer.send('window-control', command)
});