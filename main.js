const electron = require('electron');
const url = require('url');
const path = require('path');
const ipc = require('electron').ipcMain;

// Set ENV
process.env.NODE_ENV = 'development';
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// const formidable = require('formidable');
// const fs = require('fs');

const {app, BrowserWindow, Menu, dialog,webContents } = require('electron');
const os = require('os');

  let mainWindow;
  let importWindow;

    // Listen for the app to be ready
    app.on('ready', function(){
      //create new window
      mainWindow = new BrowserWindow({
      // width: 600,
      // height: 425,
      resizable: true,
      webPreferences: { nodeIntegration: true}
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
      ]}];

      // *open dialog
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

       // show new win
       ipc.on('show-import-window', function(event, newData){
         // load imported window
         importWindow = new BrowserWindow({
           // parent: mainWindow,
           modal:true,
           webPreferences: { nodeIntegration: true}})
         importWindow.loadURL(url.format({
           pathname: path.join(__dirname, 'src/imported.html'),
           protocol: 'file:',
           slashes: true,
           // show: false
         }));

           mainWindow.close();
           console.log(newData);

         ipc.on('req-new-data', function(event) {
           importWindow.webContents.send('send-to-import', newData)
           console.log('sent!');
         // });
       })
          importWindow.on('closed', function () {
          importWindow = null;
      })
     });

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
  };
