import path from 'path';
import { app, BrowserWindow, ipcMain, globalShortcut } from 'electron';
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

    // mainWindow.webContents.openDevTools();

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

    mainWindow.webContents.on('before-input-event', (event, input) => {
        if (input.key.toLowerCase() === 'r' && (input.control || input.meta)) {
            event.preventDefault();
        }
    });

    return mainWindow;
};

(async () => {
    await app.whenReady();

    const mainWindow = createWindow();

    globalShortcut.register('CommandOrControl+R', () => {
        console.log('Reload attempted, but disabled.');
    });

    if (isProd) {
        await mainWindow.loadURL('app://./');
    } else {
        const port = process.argv[2];
        await mainWindow.loadURL(`http://localhost:${port}/`);
    }
})();

app.on('window-all-closed', () => {
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

ipcMain.on('message', async (event, arg) => {
    event.reply('message', `${arg} World!`);
});
