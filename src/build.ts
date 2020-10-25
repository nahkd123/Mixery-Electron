/**
 * build.ts - Pack everything to .asar package
 */

import * as asar from "asar";
import * as fs from "fs";
import { join } from "path";

// Set up directory
console.log("Setting up...");
if (fs.existsSync("./dist")) fs.rmdirSync("./dist", {recursive: true});
fs.mkdirSync("./dist");

console.log("Coping files...");
fs.copyFileSync("./package.json", "./dist/package.json");
fs.copyFileSync("./package-lock.json", "./dist/package-lock.json");
fs.copyFileSync("./readme.md", "./dist/readme.md");
copyDir("./bin", "./dist/bin");
fs.mkdirSync("./dist/Mixery");
fs.copyFileSync("./Mixery/LICENSE", "./dist/Mixery/LICENSE");
fs.copyFileSync("./Mixery/readme.md", "./dist/Mixery/readme.md");
copyDir("./Mixery/app", "./dist/Mixery/app");
copyDir("./Mixery/assets", "./dist/Mixery/assets");
copyDir("./Mixery/bin", "./dist/Mixery/bin");
copyDir("./Mixery/css", "./dist/Mixery/css");

console.log("Now packing...");
if (!fs.existsSync("./packages")) fs.mkdirSync("./packages");
const date = new Date();
const output = `./packages/app-${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}.asar`;
asar.createPackage("./dist", output).then(() => {
    console.log("Packed to " + output + "!");
});

function copyDir(src: string, dest: string) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    let dirContents = fs.readdirSync(src);
    dirContents.forEach(fileName => {
        let stat = fs.statSync(join(src, fileName));
        if (stat.isFile()) fs.copyFileSync(join(src, fileName), join(dest, fileName));
        else copyDir(join(src, fileName), join(dest, fileName));
    });
}