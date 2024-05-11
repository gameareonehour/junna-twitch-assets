const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // ウィンドウがバックグラウンドになった際の処理制限を無効化する
      backgroundThrottling: false,
    },
  });
  mainWindow.loadFile('index.html');
}

(async() => {
  await app.whenReady();
  createWindow();
})();
