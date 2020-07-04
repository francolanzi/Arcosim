const { app, BrowserWindow } = require('electron');

app.whenReady().then(() =>
{
    var win = new BrowserWindow({ webPreferences: { nodeIntegration: true } });
    win.setMenuBarVisibility(false);
    win.setMenu(null);
    win.maximize();
    win.loadFile('index.html');
    //win.webContents.openDevTools();
});