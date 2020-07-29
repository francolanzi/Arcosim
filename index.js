const { app, BrowserWindow } = require('electron');

app.whenReady().then(() => {
  const win = new BrowserWindow({
    icon: 'img/logo.ico',
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.setMenuBarVisibility(false);
  win.setMenu(null);
  win.maximize();
  win.loadFile('index.html');
  //win.webContents.openDevTools();
});
