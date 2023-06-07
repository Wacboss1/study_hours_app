const { app, BrowserWindow, Menu } = require('electron');
const {spawn} = require("child_process")
const {join} = require("path");
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


  Menu.setApplicationMenu(null);
  win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  createWindow();
  // Spawn the Flask server as a child process
  flaskServer = spawn('python', [join(__dirname, 'Backend/app.py')]);

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