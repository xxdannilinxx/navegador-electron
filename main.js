const { app, BrowserWindow } = require('electron');
const electronLocalshortcut = require('electron-localshortcut');
const prompt = require('electron-prompt');
const path = require('path');
/**
 * 
 */
const nativeImage = require('electron').nativeImage;
const icone = nativeImage.createFromPath(__dirname + '/build/icons/128x128.png');
/**
 * 
 */
var URL
URL = (typeof window !== 'undefined' && window.URL)
  ? window.URL : require('url').URL
let createWindow = () => {
  const win = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 1024,
    height: 768,
    minWidth: 1024,
    minHeight: 768,
    frame: false,
    backgroundColor: '#333333',
    icon: icone,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  });
  /**
   * 
   */
  win.loadURL('http://google.com/');
  /**
   * 
   */
  electronLocalshortcut.register(win, 'F12', () => {
    win.webContents.toggleDevTools();
  });
  /**
   * 
   */
  electronLocalshortcut.register(win, 'F10', () => {
    prompt({
      title: 'Informe o endereço',
      label: 'URL:',
      value: 'http://google.com/',
      inputAttrs: {
        type: 'url'
      },
      type: 'input'
    })
      .then((r) => {
        if (r !== null) {
          url = r;
          win.loadURL(r);
        }
      }).catch(console.error);
  });
}
/**
 * 
 */
app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
/**
 * 
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
