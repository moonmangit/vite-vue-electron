import { app, BrowserWindow } from 'electron'
import { defineIPCEndpoints } from './ipc'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import createWindow from './libs/windows/createWindow'

let mainWindow: BrowserWindow | null = null

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  mainWindow = createWindow('/')
  defineIPCEndpoints({
    mainWindow
  })
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createWindow('/about')
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
