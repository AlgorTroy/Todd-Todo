const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron')
const url = require('url')
const path = require('path')

let win
let child

function createWindow() {
    win = new BrowserWindow({
        width: 320,
        height: 550
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))
    win.setMenu(null)
    win.show()

}

function createChildWindow() {

    child = new BrowserWindow({
        parent: win,
        width: 250,
        height: 500,
    })
    child.loadURL(url.format({
        pathname: path.join(__dirname, 'tasks.html'),
        protocol: 'file:',
        slashes: true
    }))
    child.setMenu(null)
    child.once('ready-to-show', () => {
        child.show()
    })


}

ipcMain.on('add-child-window', createChildWindow);

app.on('ready', createWindow)
