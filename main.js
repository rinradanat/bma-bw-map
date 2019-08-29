const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu } = electron;

let mainWindow;

// Listen for the app to be ready
app.on('ready', function(){
  //create new window
  mainWindow = new BrowserWindow({
  width: 600,
  height: 425,
  backgroundColor: '#FFFFFF',
  resizable: false,
  });
  //load html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // insert MenuMenu
  Menu.setApplicationMenu(mainMenu);

});

// handle create import window

  function createImportWindow(){
    // create new window
    importWindow = new BrowserWindow({
    width: 500,
    height: 325,
    title: 'Import File'
    });
    importWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'importWindow.html'),
      protocol: 'file:',
      slashes: true
    }));

  }

// create menu template

const mainMenuTemplate =[
  {
    label:'File',
    submenu:[
      {
        label: 'Import File',
        click(){
          createImportWindow();
        }
      },
      {
        label: 'Quit',
        //accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q' // test by node it's a shortcut
        click(){
          app.quit();
        }
      }
    ]
  }
];
// add dev tools
