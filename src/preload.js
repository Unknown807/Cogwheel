const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
  "api", {
    send: (channel, ...data) => {
      let validChannels = [
        "saveCurrentFile", "openFile",
        "resetCurrentFilePath", "requestSettings",
        "saveSettings"
      ];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, ...data);
      }
    },
    receive: (channel, func) => {
      let validChannels = [
        "fileSaveSuccess", "fileSaveFailure",
        "openFileSuccess", "openFileFailure",
        "receiveSettings"
      ];
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    }
  }
)