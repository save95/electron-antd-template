import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { spawn } from 'child_process';
import { platform } from 'os';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';
import serverSettings from '../config/serverSettings';

let mainWindow = null;

const fileURL = path.join('file:', __dirname, 'index.html');
const winURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : new URL(fileURL).href;
const serverFiles = {
  win32: 'server.exe',
  darwin: 'server',
  linux: 'server',
};

const log = require('electron-log');

// 当前应用的目录
const appPath = app.isPackaged ? path.dirname(app.getPath('exe')) : app.getAppPath();
log.transports.file.resolvePath = () =>
  path.join(appPath, 'storage/logs/win.log').replace(/\\/g, '\\\\');
log.transports.file.level = 'silly';
if (process.env.NODE_ENV !== 'development') {
  log.transports.console.level = false;
}

function startServer() {
  if (process.env.NODE_ENV === 'development') return;

  if (!serverSettings.enabled) return;

  // 启动 server
  const server = serverFiles[platform()];
  if (server && server.length > 0) {
    const child = spawn(server);
    child.stdout.on('data', (data) => {
      log.info(`[server] stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
      log.error(`[server] stderr: ${data}`);
    });

    child.on('close', (code) => {
      log.info(`[server] exited with code ${code}`);
    });
  }
}

function createWindow() {
  startServer();

  mainWindow = new BrowserWindow({
    height: 800,
    width: 1200,
    useContentSize: true,
  });

  mainWindow.loadURL(winURL);
  // Open dev tools initially when in development mode
  if (process.env.NODE_ENV === 'development') {
    // Errors are thrown if the dev tools are opened
    // before the DOM is ready
    mainWindow.webContents.once('dom-ready', async () => {
      await installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
        .then((name) => log.log(`Added Extension: ${name}`))
        .catch((err) => log.log('An error occurred: ', err))
        .finally(() => {
          // require("electron-debug")(); // https://github.com/sindresorhus/electron-debug
          mainWindow.webContents.openDevTools();
        });
    });

    mainWindow.webContents.once('devtools-opened', () => {
      mainWindow.focus();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
