const electron = require('electron');
const ipc = require('electron').ipcRenderer;
const BrowserWindow = electron.remote.BrowserWindow;
const remote = require('electron');
const {webContents} = require('electron');
const fs = require('fs');
const xlsx = require('xlsx');
const exceljs = require('exceljs');
var FileSaver = require('file-saver');
var htmlToImage = require('html-to-image');

var newData = [];

   ipc.send('request-data')
    console.log('requesting...');

   ipc.on('send-to-map', function (event, newData) {
    console.log('received!');
    console.log(newData);

    var sites = ['ASD','BBT','BGC','BPL','CSW','DNM','LTP',
    'PKK','PSN','PSP','PTT','RBN','RIT','TYAN','TYB'];

    var redSrc = [
     'pngs-red/ASD.png', 'pngs-red/BBT.png',
     'pngs-red/BGC.png', 'pngs-red/BPL.png',
     'pngs-red/CSW.png', 'pngs-red/DNM.png',
     'pngs-red/LTP.png', 'pngs-red/PKK.png',
     'pngs-red/PSN.png', 'pngs-red/PSP.png',
     'pngs-red/PTT.png', 'pngs-red/RBN.png',
     'pngs-red/RIT.png', 'pngs-red/TYAN.png',
     'pngs-red/TYB.png']

    var yellowSrc = [
     'pngs-yellow/ASD.png', 'pngs-yellow/BBT.png',
     'pngs-yellow/BGC.png', 'pngs-yellow/BPL.png',
     'pngs-yellow/CSW.png', 'pngs-yellow/DNM.png',
     'pngs-yellow/LTP.png', 'pngs-yellow/PKK.png',
     'pngs-yellow/PSN.png', 'pngs-yellow/PSP.png',
     'pngs-yellow/PTT.png', 'pngs-yellow/RBN.png',
     'pngs-yellow/RIT.png', 'pngs-yellow/TYAN.png',
     'pngs-yellow/TYB.png']

    var greenSrc = [
     'pngs-green/ASD.png', 'pngs-green/BBT.png',
     'pngs-green/BGC.png', 'pngs-green/BPL.png',
     'pngs-green/CSW.png', 'pngs-green/DNM.png',
     'pngs-green/LTP.png', 'pngs-green/PKK.png',
     'pngs-green/PSN.png', 'pngs-green/PSP.png',
     'pngs-green/PTT.png', 'pngs-green/RBN.png',
     'pngs-green/RIT.png', 'pngs-green/TYAN.png',
     'pngs-green/TYB.png']

    var div = document.getElementById('map');

       for (var i = 0; i < sites.length; i++) {

            if (newData[i][1] >= 80) {
              div.innerHTML += '<div class="'+sites[i]+' container"><img id="'+sites[i]+'" src="'+redSrc[i]+'"/><div class="'+sites[i]+' overlay"><div class="'+sites[i]+' text">'+sites[i]+'</div></div></div>'; // data-tooltip="'+sites[i] +' '+newData[i][1] + '%" />';
            } else if (newData[i][1] < 50) {
              div.innerHTML += '<div class="'+sites[i]+' container"><img id="'+sites[i]+'" src="'+greenSrc[i]+'"/><div class="'+sites[i]+' overlay"><div class="'+sites[i]+' text">'+sites[i]+'</div></div></div>'; //data-tooltip="'+sites[i] +' '+newData[i][1] + '%" />';
            } else if (newData[i][1] >= 50 && newData[i][1] < 80) {
              div.innerHTML += '<div class="'+sites[i]+' container"><img id="'+sites[i]+'" src="'+yellowSrc[i]+'"/><div class="'+sites[i]+' overlay"><div class="'+sites[i]+' text">'+sites[i]+'</div></div></div>';
            }
            document.getElementById(sites[i]).className = sites[i] + ' sites overlay';
            // document.getElementById(sites[i]).onmouseover = function(){
	          //      this.setAttribute('data-tooltip', 'test')}
            // document.getElementById(sites[i]).title = sites[i] +' '+newData[i][1] + '%';
            // document.getElementById(sites[i]).setAttribute('data-tooltip', sites[i] +' '+newData[i][1] + '%');
       }

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

       // *for exporting table
       var wb = xlsx.utils.table_to_book(document.getElementById('table'), {sheet:"Sheet 1"});
       var wbout = xlsx.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
         function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
             for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
              return buf;
         }

       const exportFile = document.getElementById('expfile')
       exportFile.addEventListener('click', function(event){
         saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'new.xlsx');
       });

       const exportMap = document.getElementById('expmap')
       exportMap.addEventListener('click', function(event){
         htmlToImage.toBlob(document.getElementById('map'))
         .then(function (blob) {
            window.saveAs(blob, 'map.png');
          });
       });
       
     });

      // let setUpToolTip = function() {
      //   let tooltip = "",
      //       toolTipDiv = document.querySelector(".div-tooltip"),
      //       toolTipElements = Array.from(document.querySelectorAll(".hover-reveal"));
      //
      //   let displayToolTip = function(e, obj) {
      //     tooltip = obj.dataset.tooltip;
      //     toolTipDiv.innerHTML = tooltip;
      //     toolTipDiv.style.top = e.pageY + "px";
      //     toolTipDiv.style.left = e.pageX + "px";
      //     toolTipDiv.style.opacity = 1;
      //     toolTipDiv.style.property = "inherit";
      //   }
      //
      //   toolTipElements.forEach(function(elem) {
      //     elem.addEventListener("mouseenter", function(e) {
      //         displayToolTip(e, this);
      //     });
      //     elem.addEventListener("mouseleave", function(e) {
      //         toolTipDiv.style.opacity = 0;
      //     });
      //   })
      // }
      // setUpToolTip();
    // });