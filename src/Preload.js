const { contextBridge, ipcRenderer } = require('electron');

// Expose certain Node.js modules to the renderer process
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: ipcRenderer,
});
