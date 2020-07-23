console.log(process);
  const electron = require('electron');
  const { ipcRenderer } = electron;

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
    console.log(document.querySelector("#pireploc").value);
    console.log(document.querySelector("#pireptime").value);
    console.log(document.querySelector("#pirepact").value);
  });