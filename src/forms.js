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