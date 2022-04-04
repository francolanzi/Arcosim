import { app, BrowserWindow } from 'electron';
import path from 'path';

app.whenReady().then(() => {
  const win = new BrowserWindow({
    icon: path.resolve(__dirname, 'www/images/favicon.ico'),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });
  win.setMenuBarVisibility(false);
  win.setMenu(null);
  win.maximize();
  win.loadFile(path.resolve(__dirname, 'www/index.html'));
  // win.webContents.openDevTools();
});
