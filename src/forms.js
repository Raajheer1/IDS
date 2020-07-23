console.log(process);
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


  const PIREPForm = document.getElementById("PIREPForm");
  PIREPForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var PirepSubmission = {
        "pireploc": document.querySelector("#pireploc").value,
        "pireptime": document.querySelector("#pireptime").value,
        "pirepalt": document.querySelector("#pirepalt").value,
        "pirepact": document.querySelector("#pirepact").value,
        "pirepsky": document.querySelector("#pirepsky").value,
        "pireptmp": document.querySelector("#pireptmp").value,
        "pirepwnd": document.querySelector("#pirepwnd").value,
        "pireprmk": document.querySelector("#pireprmk").value
    };
    var datafile = require('./data/data.json');
    datafile.PIREP.push(PirepSubmission);
    var final = JSON.stringify(datafile);
    fs.writeFile('./src/data/data.json', final, (err, result) => {
        if(err) {
            console.log("***ERROR***", err);
        }
    });
  });