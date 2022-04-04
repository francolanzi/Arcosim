import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { readFileSync } from 'fs';
import { resolve } from 'path';

app.whenReady().then(() => {
  const window = new BrowserWindow({
    icon: resolve(__dirname, 'www/images/favicon.ico'),
    webPreferences: {
      contextIsolation: false,
      preload: resolve(__dirname, 'preload.js')
    }
  });
  window.setMenuBarVisibility(false);
  window.setMenu(null);
  window.maximize();
  window.loadFile(resolve(__dirname, 'www/index.html'));
  // window.webContents.openDevTools();

  ipcMain.handle('get-args', async () => {
    return process.argv;
  });

  ipcMain.handle('get-versions', async () => {
    return process.versions;
  });

  ipcMain.handle('get-package', async () => {
    const path = resolve(__dirname, '../package.json');
    return JSON.parse(readFileSync(path, 'utf8'));
  });

  ipcMain.handle('open-dialog', async (event, options) => {
    return dialog.showOpenDialogSync(options);
  });

  ipcMain.handle('save-dialog', async (event, options) => {
    return dialog.showSaveDialogSync(options);
  });

  ipcMain.handle('set-title', async (event, title) => {
    window.setTitle(title);
  });
});
