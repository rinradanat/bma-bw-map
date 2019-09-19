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

   var canvas = document.getElementById('bmamap'); // get the canvas object
   var ctx = canvas.getContext('2d'); //get the 2d context

   var pngsData = [
     { site : ASD, left : 203, top : 416, width: 96, height: 92},
     { site : BBT, left : 28,  top : 121, width: 202, height: 286},
     { site : BGC, left : 345, top : 275, width: 220, height: 216},
     { site : BPL, left : 314, top : 463, width: 267, height: 197},
     { site : CSW, left : 136, top : 387, width: 95, height: 102},
     { site : DNM, left : 298, top : 148, width: 249, height: 158},
     { site : LTP, left : 213, top : 362, width: 105, height: 82},
     { site : PKK, left : 140, top : 242, width: 132, height: 147},
     { site : PSN, left : 76,  top : 393, width: 129, height: 153},
     { site : PSP, left : 275, top : 441, width: 111, height: 82},
     { site : PTT, left : 79,  top : 130, width: 226, height: 163},
     { site : RBN, left : 111, top : 478, width: 126, height: 175},
     { site : RIT, left : 240, top : 270, width: 139, height: 151},
     { site : TYAN, left: 288, top : 377, width: 99, height: 101},
     { site : TYB, left : 281, top : 10, width: 295, height: 229}
    ]


      var changeColor = function() {

           for (var i = 0; i < data.length; i += 4) { // we are jumping every 4 values of RGBA for every pixel
               data[i]     = data[i] - 199;      // the red color channel - we have decreased its value
               data[i + 1] = data[i + 1] - 200;  // the green color channel - we have decreased its value
               data[i + 2] = data[i + 2] + 100;  // the blue color channel - we have increased its value
           }
            ctx.putImageData(imageData, pngsData[i].left , pngsData[i].top);
       };

       for (var i = 0; i < 15; i++) {
         ctx.drawImage(pngsData[i].site , pngsData[i].left , pngsData[i].top);

         var imageData = ctx.getImageData(pngsData[i].left , pngsData[i].top, pngsData[i].width, pngsData[i].height);
         var data = imageData.data;
         console.log(data);

        if (newData[i][1] >= 30 && newData[i][1] >= 40 && newData[i][1] < 80 ) {
         ctx.fillStyle = "#ff9900";
         ctx.fillRect(pngsData[i].left , pngsData[i].top, pngsData[i].width, pngsData[i].height);
        } else if (newData[i][1] >= 80 ) {
        ctx.fillStyle = "#cc3300";
        ctx.fillRect(pngsData[i].left , pngsData[i].top, pngsData[i].width, pngsData[i].height);
        } else {
         ctx.fillStyle = "#006600";
         ctx.fillRect(pngsData[i].left , pngsData[i].top, pngsData[i].width, pngsData[i].height);
        }
       };


   });
