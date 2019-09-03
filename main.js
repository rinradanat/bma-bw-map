const electron = require('electron');
const url = require('url');
const path = require('path');
const ipc = require('electron').ipcMain;

// Set ENV
process.env.NODE_ENV = 'development';
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// const formidable = require('formidable');
// const fs = require('fs');

const {app, BrowserWindow, Menu, dialog } = require('electron');
const os = require('os');

  let mainWindow;

    // Listen for the app to be ready
    app.on('ready', function(){
      //create new window
      mainWindow = new BrowserWindow({
      // width: 600,
      // height: 425,
      resizable: true,
      webPreferences: {
        nodeIntegration: true,
  }
      });
      //load html into window
      mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file:',
        slashes: true
      }));

      // Build menu from template
      const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
      // insert MenuMenu
      Menu.setApplicationMenu(mainMenu);

    });

// create menu template

  const mainMenuTemplate =[
    {
      label:'File',
      submenu:[
        {
          label: 'Import File',
          accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
          // click(){
          //   openFile();
          // }
        },
        {
          label: 'Quit',
          accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q', // test by node it's a shortcut
          click(){
            app.quit();
          }
        }
      ]
    }
  ];

// open dialog

      ipc.on('open-file-dialog-for-file', function (event) {
        if(os.platform() === 'linux' || os.platform() === 'win32'){
           dialog.showOpenDialog({
               properties: ['openFile']
           }, function (files) {
              if (files) event.sender.send('selected-file', files[0]);
           });
       } else {
           dialog.showOpenDialog({
               properties: ['openFile', 'openDirectory']
           }, function (files) {
               if (files) event.sender.send('selected-file', files[0]);
           });
       }});
    

// add dev tools

  if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
      label: 'Developer Tools',
      submenu:[
        {
          role: 'reload'
        },
        {
          label: 'Toggle DevTools',
          accelerator:process.platform == 'darwin' ? 'Command+Shift+I' : 'Ctrl+Shift+I',
          click(item, focusedWindow){
            focusedWindow.toggleDevTools();
          }
        }
      ]
    });
  }

console.log('working on main.js');
