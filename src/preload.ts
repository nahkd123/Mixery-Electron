import { contextBridge, ipcRenderer } from "electron";
import { homedir } from "os";
import * as fs from "fs";

// File access
let fileAccess = {
    currentPath: homedir()
};

contextBridge.exposeInMainWorld("electronjs", {
    close() {close()},
    maximize() {ipcRenderer.send("windowControl", "maximize");},
    minimize() {ipcRenderer.send("windowControl", "minimize");},
    restore() {ipcRenderer.send("windowControl", "restore");},

    // File access API
    currentPath() {return fileAccess.currentPath;},
    listFiles(path: string) {
        return fs.readdirSync(path);
    },
    readFile(path: string) {
        let stat = fs.statSync(path);
        if (stat.isFile()) return {
            dateCreate: stat.birthtimeMs,
            type: "file",
            contents: fs.readFileSync(path, {encoding: "utf-8"})
        }; else return {
            dateCreate: stat.birthtimeMs,
            type: "directory"
        };
    },
});
