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
