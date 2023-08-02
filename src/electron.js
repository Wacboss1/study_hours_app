const { app, BrowserWindow, ipcMain } = require('electron');
const { execFile } = require("child_process")
const { join } = require("path");
const isDev = require('electron-is-dev');
require('dotenv').config();

if (require('electron-squirrel-startup')) app.quit();

let flaskServer;


// const pathCreator = (route) => {
//   let indexPath;

//   if(isDev) {
//     indexPath = url.format({
//       protocol: "http:",
//       host: 'localhost:808'
//     })
//   }
// }

app.whenReady().then(() => {
  CreatePrimaryWindow();
  RunFlaskBackend();

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
      ? 'http://localhost:3000?main'
      : `file://${join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

function RunFlaskBackend(){
  let backend_exe = isDev
    ? 'src/Backend/dist/backend/backend.exe'
    : join(process.resourcesPath, "backend/backend.exe")
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

  win.loadURL('https://localhost:3000/?details')
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