const { app, BrowserWindow} = require('electron');
const {join} = require("path");
const isDev = require('electron-is-dev');
const {child_process} = require('child_process')
require('dotenv').config();

let flaskServer;

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 500,
    webPreferences: {
      nodeIntegration: true
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

if (require('electron-squirrel-startup')) app.quit();

app.whenReady().then(() => {
  createWindow();
  let backend_exe = isDev
    ? 'src/Backend/dist/backend/backend.exe'
    : join(process.resourcesPath, "backend/backend.exe")
  console.log("Looking for backend in " + backend_exe)
  flaskServer = child_process.execFile(backend_exe, (error, stdout) => {
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