const { app, BrowserWindow, Menu } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  Menu.setApplicationMenu(null);
  win.loadURL('http://localhost:3000');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});