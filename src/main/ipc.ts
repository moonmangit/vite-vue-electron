import { app, BrowserWindow, ipcMain } from 'electron'

export function defineIPCEndpoints(context: { mainWindow: Electron.BrowserWindow }) {
  ipcMain.on('ping', () => console.log('pong'))

  // windows
  ipcMain.handle('window:close', (event) => {
    const senderWindow = BrowserWindow.fromWebContents(event.sender)
    if (!senderWindow) return
    if (senderWindow === context.mainWindow) {
      app.quit()
    } else {
      senderWindow.close()
    }
  })
  ipcMain.handle('window:minimize', (event) => {
    const senderWindow = BrowserWindow.fromWebContents(event.sender)
    if (!senderWindow) return
    senderWindow.minimize()
  })
}
