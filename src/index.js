const { app, BrowserWindow, Menu, ipcMain, ipcRenderer} = require('electron');
const { autoUpdater } = require("electron-updater")
var XMLHttpRequest = require('xhr2');
const path = require('path');
const { send } = require('process');
let mainWindow;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width:1920,
    height:1080,
    frame: false,
    titleBarStyle: "hidden",
    icon:__dirname+"/img/icon.png",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'login.html'));
  //mainWindow.webContents.on("devtools-opened", () => { mainWindow.webContents.closeDevTools(); });
};



autoUpdater.checkForUpdates();
const sendStatusToWindow = (text) => {
  if(mainWindow){
    mainWindow.webContents.send('updater', text);
  }
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

var AADC;
// Catch the IDSForm Submit Data.
ipcMain.on('AADC:add', (e, AADCData) => {
  AADC = AADCData
  var d = new Date();
  var hour = d.getUTCHours();
  if(hour > AADC[0]){
    hour = hour-24;
  }
  AADC[0] = AADC[0] - hour;
  AADC[1] = AADC[1] - hour;
  var request = new XMLHttpRequest();
  request.open("GET", "https://aadc.denartcc.org/ids.php?AAR="+AADC[2]+"&HS="+AADC[0]+"&HE="+AADC[1]+"&DAAR="+AADC[3]);
  request.send();
});

//Catch User Information
var UserData;

ipcMain.on("USER:add", (e, UserArray) => {
  UserData = UserArray;
  mainWindow.loadFile(path.join(__dirname, 'mainWindow.html'));
});

ipcMain.on('synchronous-message', (event, arg) => {
  event.returnValue = UserData;
});

ipcMain.on('specialist', (event, arg) => {
  event.returnValue = UserData;
});


autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  mainWindow.webContents.send('download-progress', log_message);
})

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});