const { app, BrowserWindow, ipcMain } = require('electron');
const {createFileRoute, createURLRoute} = require('electron-router-dom')
const { execFile, exec } = require("child_process")
const { join } = require("path");
const url = require('url')
const isDev = require('electron-is-dev');
require('dotenv').config();

if (require('electron-squirrel-startup')) app.quit();

let flaskServer;
app.whenReady().then(() => {
  RunFlaskBackend();
  RunReact();
  CreatePrimaryWindow();

  // Print the Flask server output to the console
  flaskServer.stdout.on('data', (data) => {
    console.log(`Flask server output: ${data}`);
  });

  // Print any errors from the Flask server to the console
  flaskServer.stderr.on('data', (data) => {
    console.error(`Flask server error: ${data}`);
  });

  ipcMain.on('open-student-details', (event, student) => {
    OpenStudentDetails(student)
  })
});

function CreatePrimaryWindow() {
  const win = new BrowserWindow({
    title: 'SB Study Hours',
    width: 400,
    height: 500,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, 'preload.js')
    }
  });

  win.loadURL(GetURL('main'));

  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

function GetURL(route){
  let url = createURLRoute(
      'http:localhost:3000',
      route
    )
  return url
} 

function RunReact(){
  exec("cross-env BROWSER=none npm run start-react");
}

function RunFlaskBackend(){
  let backend_exe = isDev
    ? 'src/Backend/dist/backend/backend'
    : join(process.resourcesPath, "backend/backend")
  flaskServer = execFile(backend_exe, (error, stdout) => {
    if (error) {
      console.error(`Error executing the executable: ${error.message}`);
      return;
    }
    console.log(`Executable output:\n${stdout}`);
  })
}

function OpenStudentDetails(student) {
  const win = new BrowserWindow({
    title: student,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL(GetURL(`details${"/" + student}`))
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    CreatePrimaryWindow();
  }
});