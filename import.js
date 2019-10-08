const electron = require('electron');
const ipc = require('electron').ipcRenderer;
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const remote = require('electron');

const fs = require('fs');
const xlsx = require('xlsx');
const exceljs = require('exceljs');
var FileSaver = require('file-saver');
const {webContents} = require('electron');

var newData = [];

      ipc.send('req-new-data');
      console.log('requesting...');

      ipc.on('send-to-import', function(event, newData) {
        console.log('received!');
        console.log(newData);

        function generateTableHead(table, data) {
          let thead = table.createTHead();
          let row = thead.insertRow();
          for (let key of data) {
            let th = document.createElement("th");
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
          }
        }

        function generateTable(table, data) {
          for (let element of data) {
            let row = table.insertRow();
            for (key in element) {
              let cell = row.insertCell();
              let text = document.createTextNode(element[key]);
              cell.appendChild(text);
            }
          }
        }
        var headers = ["Site" , "Utilization(%)"];
        generateTableHead(table, headers);
        generateTable(table, newData);

        const nextBtn = document.getElementById('next')
        nextBtn.addEventListener('click', function(event){
        console.log('creating map...');

        ipc.send('show-map-window', (newData))
        });

    });
