const {app, remote, BrowserWindow} = require('electron')
const path = require('path')
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 1000, height: 800})

  // and load the index.html of the app.
  win.loadFile('index.html')
  // win.loadFile(`file://${__dirname}/index.html`) // cuz electron-reload

  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools()
  }

  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

app.on('ready', createWindow)
