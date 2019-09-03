const electron = require('electron');
const ipc = require('electron').ipcRenderer;
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow

const fs = require('fs');
const xlsx = require('xlsx');

const openBtn = document.getElementById('upload')

openBtn.addEventListener('click', function(event){

    ipc.send('open-file-dialog-for-file')
    console.log('opening...');

    ipc.on('selected-file', function (event, path) {
    console.log('file path: ', path);

    fs.readFile(path, 'utf-8', (err, data) => {
      if(err){
            alert("An error ocurred reading the file :" + err.message);
            return;
        }

    //  console.log(data);

    console.log('xlsx runs here');

    // read xlsx file from path

    const workbook = xlsx.readFile(path);
    const sheet_name_list = workbook.SheetNames;

    console.log(xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]));

      })
    });
  })
