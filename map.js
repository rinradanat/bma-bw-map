const electron = require('electron');
const ipc = require('electron').ipcRenderer;
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const remote = require('electron');
const {webContents} = require('electron');

  ipc.send('request-data')
  console.log('requesting...');

  ipc.on('send-to-map', function (event, newData) {
    console.log('received!');
    console.log(newData);
  });

  // for filling colours

  
