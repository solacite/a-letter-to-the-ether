const { app, BrowserWindow } = require('electron') // import electron modules

const createWindow = () => { // loads web page into new BrowserWindow instance
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => { // calls function when app is ready
    createWindow()

    app.on('activate', () => { // re-creates window
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => { // quits app when all windows are closed
    if (process.platform !== 'darwin') {
        app.quit()
    }
})