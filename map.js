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
  });

  // for filling colours
  // var context = document.getElementById('bmamap').getContext("2d");
  //
  // function loadImgs(sources, callback) {
  //   var imgs = {};
  //   var loadedImgs = 0;
  //   var numImgs = 0;
  //
  //   for (var src in sources){
  //     numImgs++;
  //   }
  //   for (var src in sources){
  //     imgs[src] = new Image();
  //     imgs[src].onload = function(){
  //       if(++loadedImgs >= numImgs){
  //         callback(imgs);
  //       }
  //     };
  //     imgs[src].src = sources[src];
  //       // context.fillRect(imgs[src].src , 10, 10, 50, 50);// use this for image source => function
  //     // draw(imgs[src.src]);
  //   }
  // }
  //
  // var sources = {
  //     ASD : "pngs/ASD.png",
  //     BBT : "pngs/BBT.png",
  //     BGC : "pngs/BGC.png",
  //     BPL : "pngs/BPL.png",
  //     CSW : "pngs/CSW.png",
  //     DNM : "pngs/DNM.png",
  //     LTP : "pngs/LTP.png",
  //     PKK : "pngs/PKK.png",
  //     PSN : "pngs/PSN.png",
  //     PSP : "pngs/PSP.png",
  //     PTT : "pngs/PTT.png",
  //     RBN : "pngs/RBN.png",
  //     RIT : "pngs/RIT.png",
  //     TYAN : "pngs/TYAN.png",
  //     TYB : "pngs/TYB.png"
  // };
  //
  // loadImgs(sources, function(imgs){
  //     context.drawImage(imgs.ASD, 203, 416, 96, 92);
  //     context.drawImage(imgs.BBT, 28, 121, 202, 286);
  //     context.drawImage(imgs.BGC, 345, 275, 220, 216);
  //     context.drawImage(imgs.BPL, 314, 463, 267, 197);
  //     context.drawImage(imgs.CSW, 136, 387, 95, 102);
  //     context.drawImage(imgs.DNM, 298, 148, 249, 158);
  //     context.drawImage(imgs.LTP, 213, 362, 105, 82);
  //     context.drawImage(imgs.PKK, 140, 242, 132, 147);
  //     context.drawImage(imgs.PSN, 76, 393, 129, 153);
  //     context.drawImage(imgs.PSP, 275, 441, 111, 82);
  //     context.drawImage(imgs.PTT, 79, 130, 226, 163);
  //     context.drawImage(imgs.RBN, 111, 478, 126, 175);
  //     context.drawImage(imgs.RIT, 240, 270, 139, 151);
  //     context.drawImage(imgs.TYAN, 288, 377, 99, 101);
  //     context.drawImage(imgs.TYB, 281, 10, 295, 229);
  // });



  // try new

  var canvas = document.getElementById('bmamap'); // get the canvas object
  var ctx = canvas.getContext('2d'); //get the 2d context
  var ASD = document.getElementById('ASD');
  var BBT = document.getElementById('BPL');
  var BGC = document.getElementById('BGC');

       ctx.drawImage(ASD, 203, 416);
       ctx.drawImage(BPL, 314, 463);
       ctx.drawImage(BGC, 345, 275);

   var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
   var data = imageData.data;

   var changeColor = function() {
           for (var i = 0; i < data.length; i += 4) { // we are jumping every 4 values of RGBA for every pixel
             data[i]     = data[i] - 199;      // the red color channel - we have decreased its value
             data[i + 1] = data[i + 1] - 199;  // the green color channel - we have decreased its value
             data[i + 2] = data[i + 2] + 100;  // the blue color channel - we have increased its value
           }
       ctx.putImageData(imageData, 0, 0);
     };

   changeColor();
