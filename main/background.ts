import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import serve from 'electron-serve';

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
    serve({ directory: 'app' });
} else {
    app.setPath('userData', `${app.getPath('userData')} (development)`);
}

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        simpleFullscreen: true,
        titleBarStyle: 'hiddenInset',
        fullscreen: true,
        // kiosk: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            devTools: false,
        },
    });

    mainWindow.setMenu(null);

    mainWindow.on('close', (e) => {
        e.preventDefault();
    });

    mainWindow.on('will-resize', (e) => {
        e.preventDefault();
    });

    mainWindow.on('will-move', (e) => {
        e.preventDefault();
    });

    mainWindow.on('minimize', (e) => {
        e.preventDefault();
    });

    return mainWindow;
};

(async () => {
    await app.whenReady();

    const mainWindow = createWindow();

    if (isProd) {
        await mainWindow.loadURL('app://./home');
    } else {
        const port = process.argv[2];
        await mainWindow.loadURL(`http://localhost:${port}/`);
    }
})();

app.on('window-all-closed', () => { });

ipcMain.on('message', async (event, arg) => {
    event.reply('message', `${arg} World!`);
});
