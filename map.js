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
              div.innerHTML += '<img id="'+sites[i]+'" src="'+redSrc[i]+'"/>';
            } else if (newData[i][1] < 50) {
              div.innerHTML += '<img id="'+sites[i]+'" src="'+greenSrc[i]+'"/>';
            } else if (newData[i][1] >= 50 && newData[i][1] < 80) {
              div.innerHTML += '<img id="'+sites[i]+'" src="'+yellowSrc[i]+'"/>';
            }
            document.getElementById(sites[i]).className = sites[i] + ' site simptip-position-top';
            document.getElementById(sites[i]).title = sites[i] +' '+newData[i][1] + '%'
       }



    });
