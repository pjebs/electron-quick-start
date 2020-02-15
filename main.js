// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

// createWindow1 shows a non-kiosk window working as perfectly.
// It demonstrates transparency + opacity setting.
function createWindow1 () {
  const mainWindow = new BrowserWindow({
    backgroundColor: '#FF0000',
    width: 800,
    height: 600,
    transparent: true,
    opacity: 0.90, // 10% transparent
  })
  mainWindow.loadFile('index.html')
}

// createWindow2 kiosk mode (+Fullscreen) window to show that it doesn't care about transparency.
// Also demonstrate that opacity changes "darkness" instead of transparency.
function createWindow2 () {
  const mainWindow = new BrowserWindow({
    backgroundColor: '#FFFFFF', // Adjust this
    width: 800,
    height: 600,
    transparent: true,
    opacity: 0.5, // 50% transparent <--- Adjust this
    kiosk: true,
  })
  mainWindow.loadFile('index.html')
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow1()
  setTimeout(() => { createWindow2() }, 2000);
})
