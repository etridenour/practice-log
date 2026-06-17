import { app, BrowserWindow } from 'electron';
import path from 'path';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // Security: keep Node.js out of the renderer process
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // In development, load from Angular's dev server
  // In production, load the built Angular files
  const isDev = process.env['NODE_ENV'] === 'development';

  if (isDev) {
    win.loadURL('http://localhost:4200');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(import.meta.dirname, '../dist/practice-log/browser/index.html'));
  }
}

// Electron app lifecycle:
// 'ready' fires when Electron has finished initializing
app.whenReady().then(createWindow);

// On macOS, apps stay active until Cmd+Q even with all windows closed.
// On Windows/Linux, closing all windows quits the app.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// On macOS, clicking the dock icon re-creates a window if none exist
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
