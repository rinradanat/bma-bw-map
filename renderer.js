const electron = require('electron');
const ipc = require('electron').ipcRenderer;
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;

const fs = require('fs');
const xlsx = require('xlsx');
const exceljs = require('exceljs');

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

    // *read xlsx file from path

    const workbook = xlsx.readFile(path);
    const sheetNameList = workbook.Sheets[workbook.SheetNames[0]];
    // const ws = workbook.Sheets["Sheet2"];

    const fileData = xlsx.utils.sheet_to_json(sheetNameList); // in json - no row/col
    const headerList = xlsx.utils.sheet_to_json(sheetNameList, {header: 1}); // use raw:false for formatted string ex. %
    [ ['A', 'B'],
      ['1', '2']]

    // *show by header names
    // console.log(headerList);

    // *show contents in cells
    console.log(fileData);

      // *show outputs of Site on html

      var newUtlOne = [];
      var newUtlTwo = [];

      for ( var i = 0;i < fileData.length;i++){

        var siteName = fileData[i].Site;
        var siteUtl = fileData[i].Utilization * 100;

        if(siteName.includes(1)){
          var siteOneUtl = siteUtl;
          newUtlOne.push(siteOneUtl)
          // console.log(siteName +' utlization is '+ siteOneUtl + '%');
          // document.getElementById('filedataShow').innerHTML = siteName + siteOneUtl;
        } else if (siteName.includes(2)){
          var siteTwoUtl = siteUtl;
          newUtlTwo.push(siteTwoUtl)
          // console.log(siteName +' utlization is '+ siteTwoUtl + '%');
          // document.getElementById('filedataShow').innerHTML = siteName + siteTwoUtl;
          }
        }

          var maxUtl = [];

          for (var a = 0; a < 15 ; a++)
              if (newUtlOne[a] < newUtlTwo[a]) {
                maxUtl.push(newUtlTwo[a])
                // console.log('two max');
              } else {
                maxUtl.push(newUtlOne[a])
                // console.log('one max');
          }

          // *show values from new arrays
          console.log(newUtlOne);
          console.log(newUtlTwo);
          console.log('Max Utilization');
          console.log(maxUtl);

          })

        })

      })



        // var myJSON = JSON.stringify(fileData);
        // console.log(myJSON); // *show data as string

        // *function for finding values in each column
