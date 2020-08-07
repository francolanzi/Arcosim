const { app, BrowserWindow } = require('electron');
const path = require('path');

app.whenReady().then(() => {
  const win = new BrowserWindow({
    icon: path.resolve(__dirname, 'build/icon.ico'),
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.setMenuBarVisibility(false);
  win.setMenu(null);
  win.maximize();
  win.loadFile(path.resolve(__dirname, 'www/index.html'));
  //win.webContents.openDevTools();
});
