const { app, BrowserWindow} = require('electron');
const {execFile} = require("child_process")
const {join} = require("path");
const isDev = require('electron-is-dev');
require('dotenv').config();

let flaskServer;
if (require('electron-squirrel-startup')) app.quit();

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 500,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, 'preload.js')
    }
  });

  win.loadURL(
      isDev
          ? 'http://localhost:3000'
          : `file://${join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

app.whenReady().then(() => {
  createWindow();
  let backend_exe = isDev
    ? 'src/Backend/dist/backend/backend.exe'
    : join(process.resourcesPath, "backend/backend.exe")
  flaskServer = execFile(backend_exe, (error, stdout) => {
    if (error) {
      console.error(`Error executing the executable: ${error.message}`);
      return;
    }
    console.log(`Executable output:\n${stdout}`);
  });

  // Print the Flask server output to the console
  flaskServer.stdout.on('data', (data) => {
    console.log(`Flask server output: ${data}`);
  });

  // Print any errors from the Flask server to the console
  flaskServer.stderr.on('data', (data) => {
    console.error(`Flask server error: ${data}`);
  });
});

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