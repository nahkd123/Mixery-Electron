"use strict";
exports.__esModule = true;
var Electron = require("electron");
var app = Electron.app;
var mainWindow;
function init() {
    mainWindow = new Electron.BrowserWindow({
        show: false,
        minWidth: 1200,
        minHeight: 300
    });
    mainWindow.loadFile("Mixery/html/index.html");
    mainWindow.once("ready-to-show", function () {
        mainWindow.removeMenu();
        mainWindow.show();
        mainWindow.webContents.openDevTools({ mode: "bottom" });
        // This will be used to display close buttons as well as additional options
        mainWindow.webContents.executeJavaScript("toggleElectronJS()", false);
    });
}
app.whenReady().then(init);
