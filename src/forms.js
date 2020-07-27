const electron = require('electron');
const { ipcRenderer } = electron;
var fs = require('fs');

const IDSForm = document.getElementById("IDSForm");
IDSForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const hs = document.querySelector("#HS").value / 100 + 1;
  const he = document.querySelector("#HE").value / 100 + 1;
  const AAR = parseInt(document.querySelector("#AAR").value);
  const DAAR = parseInt(document.querySelector("#DAAR").value);
  var AADC = [];
  AADC.push(hs);
  AADC.push(he);
  AADC.push(AAR);
  AADC.push(DAAR);

  ipcRenderer.send("AADC:add", AADC);
});


// const PIREPForm = document.getElementById("PIREPForm");
// PIREPForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   var PirepSubmission = {
//       "pireploc": document.querySelector("#pireploc").value,
//       "pireptime": document.querySelector("#pireptime").value,
//       "pirepalt": document.querySelector("#pirepalt").value,
//       "pirepact": document.querySelector("#pirepact").value,
//       "pirepsky": document.querySelector("#pirepsky").value,
//       "pireptmp": document.querySelector("#pireptmp").value,
//       "pirepwnd": document.querySelector("#pirepwnd").value,
//       "pireprmk": document.querySelector("#pireprmk").value
//   };
//   var datafile = require('./data/data.json');
//   datafile.PIREP.push(PirepSubmission);
//   var finalPirep = JSON.stringify(datafile);
//   fs.writeFile('./src/data/data.json', finalPirep, (err, result) => {
//       if(err) {
//           console.log("***ERROR***", err);
//       }
//   });
//   fs.readFile('./src/data/data.json', (err, result) => {
//     ws.send(result);
//     console.log("Data Sent");
//   });
// });

// const ATISForm = document.getElementById("ATISForm");
// ATISForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   var ATISSubmission = {
//     "atisfield": document.querySelector("#atisfield").value,
//     "atisland": document.querySelector("#atisland").value,
//     "atisdep": document.querySelector("#atisdep").value,
//     "atisextrainfo": document.querySelector("#atisextrainfo").value
//   };
//   var datafile = require('./data/data.json');
//   datafile.ATIS.push(ATISSubmission);
//   var finalATIS = JSON.stringify(datafile);
//   fs.writeFile('./src/data/data.json', finalATIS, (err, result) => {
//       if(err) {
//           console.log("***ERROR***", err);
//       }
//   });
// });