import { ipcMain } from 'electron'

export function defineIPCEndpoints() {
  ipcMain.on('ping', () => console.log('pong'))
}
