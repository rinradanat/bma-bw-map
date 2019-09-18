const electron = require('electron');
const ipc = require('electron').ipcRenderer;
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const remote = require('electron');

const fs = require('fs');
const xlsx = require('xlsx');
const exceljs = require('exceljs');

    var newUtlOne = [];
    var newUtlTwo = [];
    var siteOneUtl,siteTwoUtl
    var maxUtl = [];
    var finalSite = ['AGN-ASD','AGN-BBT','AGN-BGC','AGN-BPL','AGN-CSW','AGN-DNM','AGN-LTP',
    'AGN-PKK','AGN-PSN','AGN-PSP','AGN-PTT','AGN-RBN','AGN-RIT','AGN-TYAN','AGN-TYB'];
    var newData = [];
    var workbook, worksheet, sheetNameList, fileData, headerList;

    const openBtn = document.getElementById('upload')
    openBtn.addEventListener('click', function(event){

    ipc.send('open-file-dialog-for-file')
    console.log('opening...');

    ipc.on('selected-file', function (event, path) {
    console.log('file path: ', path);
    document.getElementById('fileNameShow').innerHTML = 'File from : ' + path;


    fs.readFile(path, 'utf-8', (err, data) => {
      if(err){
          alert("An error ocurred reading the file :" + err.message);
          return;
        }

    // *read xlsx file from path
    workbook = xlsx.readFile(path);
    sheetNameList = workbook.Sheets[workbook.SheetNames[0]];

    fileData = xlsx.utils.sheet_to_json(sheetNameList); // in json - no row/col
    headerList = xlsx.utils.sheet_to_json(sheetNameList, {header: 1}); // use raw:false for formatted string ex. %
    [ ['A', 'B'],
      ['1', '2'],]

    // *show by header names
    console.log(headerList);
    // *show contents in cells
    console.log(fileData);

      // *show outputs of Site on html
      for ( var i = 0;i < fileData.length;i++){

        var siteName = fileData[i].Site;
        var siteUtl = fileData[i].Utilization * 100;

        if(siteName.includes(1)){
          siteOneUtl = siteUtl;
          newUtlOne.push(siteOneUtl)
          // console.log(siteName +' utlization is '+ siteOneUtl + '%');
          // document.getElementById('filedataShow').innerHTML = siteName + siteOneUtl;
        } else if (siteName.includes(2)){
          siteTwoUtl = siteUtl;
          newUtlTwo.push(siteTwoUtl)
          // console.log(siteName +' utlization is '+ siteTwoUtl + '%');
          // document.getElementById('filedataShow').innerHTML = siteName + siteTwoUtl;
          }
        }

          // *create new array containing Max Utilization
          for (var a = 0; a < 15 ; a++){
              if (newUtlOne[a] < newUtlTwo[a]) {
                maxUtl[a] = newUtlTwo[a]
              } else {
                maxUtl[a] = newUtlOne[a]
              }
          }

          // *create new data for max utilizations
          for (var i = 0; i < finalSite.length; i++) {
            newData[i] = [ finalSite[i] , maxUtl[i] ]
          }
        })
      })
    })

    const runBtn = document.getElementById('run')
    runBtn.addEventListener('click', function(event){

      console.log('running...');
      console.log(newData);

      ipc.send('show-import-window', (newData))
    });
