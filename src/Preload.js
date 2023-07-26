const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  OpenStudentDetails: (student) => ipcRenderer.send('open-student-details', student)
});
