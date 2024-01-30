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
            devTools: true,
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

    // Open Developer Tools for debugging
    mainWindow.webContents.openDevTools();

    // Log load URL for debugging
    if (isProd) {
        console.log('Loading URL: app://./');
    } else {
        const port = process.argv[2];
        console.log(`Loading URL: http://localhost:${port}/`);
    }

    return mainWindow;
};

(async () => {
    await app.whenReady();

    const mainWindow = createWindow();

    // Load URL based on environment
    if (isProd) {
        await mainWindow.loadURL('app://./').catch(e => {
            console.error('Failed to load URL in production:', e);
        });
    } else {
        const port = process.argv[2];
        await mainWindow.loadURL(`http://localhost:${port}/`).catch(e => {
            console.error('Failed to load URL in development:', e);
        });
    }
})();

app.on('window-all-closed', () => {
    app.quit(); // Quit the app when all windows are closed
});

app.on('will-quit', () => {
    // Unregister all shortcuts.
    globalShortcut.unregisterAll();
});

ipcMain.on('message', async (event, arg) => {
    event.reply('message', `${arg} World!`);
});
