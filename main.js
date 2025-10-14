const { app, BrowserWindow } = require('electron');

// create app window
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, // allow node.js in renderer
            contextIsolation: false
        }
    });

    // load index.html in the window
    win.loadFile('index.html');
}

// runs when electron is ready to start
app.whenReady().then(createWindow);

// quit app when windows closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})