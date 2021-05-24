const { app, ipcMain, BrowserWindow } = require('electron')
const path = require('path')
const fs = require("fs");

let win;
let currentFilePath = __dirname;

const defaultSettings = [
  //Motor - click, hands, point, type, write
  0.2, 0.4, 1.1, 0.2, 1.0,
  //Cognitive - confirm, think, read, forget, remember, store
  1.2, 1.2, 0.25, 0, 0.5, 0.5,
  //Perceptual - look, hear, say, search
  0.5, 0.4, 0.4, 1.2,
  //System Response - response
  1,
  //Theme
  "light"
];

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

ipcMain.on("resetCurrentFilePath", (event) => {
  currentFilePath = __dirname;
})

ipcMain.on("requestSettings", (event) => {
  let settings_file = path.join(__dirname, "settings.txt");
  let data = defaultSettings;

  if (fs.existsSync(settings_file)) {
    data = fs.readFileSync(settings_file, "utf-8");
    data = data.split("\n")

    let theme = data[16];
    data = data.slice(0, 16).map(Number);

    data.push(theme);
    console.log(theme);
  }

  win.webContents.send("receiveSettings", data);
});

ipcMain.on("saveSettings", (event, settings) => {
  let data = "";

  for (i=0; i<16; i++) {
    let time = parseFloat(settings[i]);
    time = isNaN(time) ? defaultSettings[i] : time;
    data += time+"\n";
  }

  data += settings[16];

  fs.writeFileSync(path.join(__dirname, "settings.txt"), data, "utf-8");
});

app.on('window-all-closed', () => {
  app.quit()
});