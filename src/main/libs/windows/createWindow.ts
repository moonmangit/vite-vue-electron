import { shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import icon from '../../../../resources/icon.png?asset'

export default function (path?: string, options?: { width?: number; height?: number }) {
  const _path = path || '/'
  const _width = options?.width || 900
  const _height = options?.height || 670

  const createdWindow = new BrowserWindow({
    width: _width,
    height: _height,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  createdWindow.on('ready-to-show', () => {
    createdWindow.show()
  })
  createdWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    createdWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#${_path}`)
  } else {
    const basePath = join(__dirname, '../renderer/index.html')
    createdWindow.loadFile(basePath).then(() => {
      createdWindow.webContents.loadFile(basePath, {
        hash: _path
      })
    })
  }
  return createdWindow
}
