const { app, BrowserWindow } = require('electron');

app.whenReady().then(() => {
  const win = new BrowserWindow({
    icon: 'www/img/logo.ico',
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.setMenuBarVisibility(false);
  win.setMenu(null);
  win.maximize();
  win.loadFile('www/index.html');
  //win.webContents.openDevTools();
});
