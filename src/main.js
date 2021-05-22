const { app, ipcMain, BrowserWindow } = require('electron')
const path = require('path')
const fs = require("fs");

let win;
let currentFilePath = __dirname;

function createWindow () {
  win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile(path.join(__dirname, '/content/index.html'));
};

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
});

ipcMain.on("saveCurrentFile", (event, filename, data) => {
  if (filename.trim() == "") {
    win.webContents.send("fileSaveFailure");
  } else {
    try {
      fs.writeFileSync(path.join(currentFilePath, filename+".txt"), data, "utf-8");
      win.webContents.send("fileSaveSuccess", filename);
    } catch(err) {
      win.webContents.send("fileSaveFailure");
    }
  }
});

ipcMain.on("openFile", (event, filepathAndname) => {
  try {
    let filepath = path.dirname(filepathAndname);
    let filename = path.basename(filepathAndname, ".txt");
    const data = fs.readFileSync(filepathAndname, "utf-8");

    currentFilePath = filepath;
    win.webContents.send("openFileSuccess", filename, data);
  } catch(err) {
    win.webContents.send("openFileFailure");
  }
});

ipcMain.on("resetCurrentFilePath", (event,) => {
  currentFilePath = __dirname;
})

app.on('window-all-closed', () => {
  app.quit()
});