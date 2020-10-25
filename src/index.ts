import * as Electron from "electron";
import { join } from "path";

let app = Electron.app;
let mainWindow: Electron.BrowserWindow;

function init() {
    mainWindow = new Electron.BrowserWindow({
        show: false,
        minWidth: 1200,
        minHeight: 300,
        webPreferences: {
            preload: join(__dirname, "preload.js"),
            contextIsolation: true
        }
    });
    mainWindow.loadFile("Mixery/app/index.html");
    mainWindow.removeMenu();

    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
        // mainWindow.webContents.openDevTools({mode: "bottom"});
    });
    
    Electron.ipcMain.on("windowControl", (event, control: string) => {
        switch (control) {
            case "maximize": mainWindow.maximize(); break;
            case "minimize": mainWindow.minimize(); break;
            case "restore": mainWindow.restore(); break;
            default: break;
        }
    });
}

app.whenReady().then(init);