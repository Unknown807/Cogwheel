const { app, ipcMain, BrowserWindow } = require('electron')
const path = require('path')
const fs = require("fs");

let win;

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
      fs.writeFileSync(filename+".txt", data, "utf-8");
      win.webContents.send("fileSaveSuccess", filename);
    } catch(e) {
      win.webContents.send("fileSaveFailure");
    }
  }
});

app.on('window-all-closed', () => {
  app.quit()
});