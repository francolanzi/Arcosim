const { app, BrowserWindow } = require('electron');
const path = require('path');

app.whenReady().then(() => {
  const win = new BrowserWindow({
    icon: path.resolve(__dirname, 'www/images/favicon.ico'),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  win.setMenuBarVisibility(false);
  win.setMenu(null);
  win.maximize();
  win.loadFile(path.resolve(__dirname, 'www/index.html'));
  //win.webContents.openDevTools();
});
