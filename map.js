const electron = require('electron');
const ipc = require('electron').ipcRenderer;
const BrowserWindow = electron.remote.BrowserWindow;
const remote = require('electron');
const {webContents} = require('electron');

   ipc.send('request-data')
    console.log('requesting...');

   ipc.on('send-to-map', function (event, newData) {
    console.log('received!');
    console.log(newData);

    var sites = ['ASD','BBT','BGC','BPL','CSW','DNM','LTP',
    'PKK','PSN','PSP','PTT','RBN','RIT','TYAN','TYB'];

    var positions = [
    'left:203px;top:416px;', 'left:28px;top:121px;',
    'left:345px;top:275px;', 'left:314px;top:463px;',
    'left:136px;top:387px;', 'left:298px;top:148px;',
    'left:213px;top:362px;', 'left:140px;top:242px;',
    'left:76px;top:393px;', 'left:275px;top:441px;',
    'left:79px;top:130px;', 'left:111px;top:478px;',
    'left:240px;top:270px;', 'left:288px;top:377px;',
    'left:281px;top:10px;']

    var redSrc = [ 'pngs-red/ASD.png', 'pngs-red/BBT.png',
     'pngs-red/BGC.png', 'pngs-red/BPL.png',
     'pngs-red/CSW.png', 'pngs-red/DNM.png',
     'pngs-red/LTP.png','pngs-red/PKK.png',
     'pngs-red/PSN.png', 'pngs-red/PSP.png',
     'pngs-red/PTT.png', 'pngs-red/RBN.png',
     'pngs-red/RIT.png', 'pngs-red/TYAN.png',
     'pngs-red/TYB.png'  ]

    var yellowSrc = [ 'pngs-yellow/ASD.png' , 'pngs-yellow/BBT.png' , 'pngs-yellow/BGC.png' , 'pngs-yellow/BPL.png' , 'pngs-yellow/CSW.png', 'pngs-yellow/DNM.png', 'pngs-yellow/LTP.png',
    'pngs-yellow/PKK.png', 'pngs-yellow/PSN.png', 'pngs-yellow/PSP.png', 'pngs-yellow/PTT.png', 'pngs-yellow/RBN.png', 'pngs-yellow/RIT.png', 'pngs-yellow/TYAN.png', 'pngs-yellow/TYB.png'  ]

    var greenSrc = [ 'pngs-green/ASD.png' , 'pngs-green/BBT.png' , 'pngs-green/BGC.png' , 'pngs-green/BPL.png' , 'pngs-green/CSW.png', 'pngs-green/DNM.png', 'pngs-green/LTP.png',
    'pngs-green/PKK.png', 'pngs-green/PSN.png', 'pngs-green/PSP.png', 'pngs-green/PTT.png', 'pngs-green/RBN.png', 'pngs-green/RIT.png', 'pngs-green/TYAN.png', 'pngs-green/TYB.png'  ]

    // var img ;
     var div = document.getElementById('map');

       for (var i = 0; i < sites.length; i++) {

            if (newData[i][1] >= 80) {
              div.innerHTML += '<img id="'+sites[i]+'" style="'+positions[i]+'position:fixed;" src="'+redSrc[i]+'"/>';
              // document.getElementById(sites[i]).className = sites[i];
            } else if (newData[i][1] < 50) {
              div.innerHTML += '<img id="'+sites[i]+'"  style="'+positions[i]+'position:fixed;" src="'+greenSrc[i]+'"/>';
              // document.getElementById(sites[i]).className = sites[i];
            } else if (newData[i][1] >= 50 && newData[i][1] < 80) {
              div.innerHTML += '<img id="'+sites[i]+'"  style="'+positions[i]+'position:fixed;" src="'+yellowSrc[i]+'"/>';
              // document.getElementById(sites[i]).className = sites[i];
            }
       }
       document.getElementById("ASD").addEventListener("mouseover", mouseOver);

        function mouseOver() {
          document.getElementById("ASD").style.text = "green";
        }



    });
