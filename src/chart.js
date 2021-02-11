function ChangeChart(ICAO, Chart){
  var requestFunc = new XMLHttpRequest();
  // General
  requestFunc.open("GET", `https://api.aviationapi.com/v1/charts?apt=${ICAO}`);
  requestFunc.send();
  requestFunc.onload = function () {
    if (requestFunc.status != 200) {
        console.log("Error pulling Charts.");
    } else {
      ChartArray = JSON.parse(requestFunc.response);
      ChartArray = ChartArray[ICAO];
      ChartArray.forEach(item => {
        if(item["pdf_name"] == Chart){
          document.getElementById("ChartFrame").src = item["pdf_path"];
        }
      });
    }
  }
}

function ChangeDoc(DOC){
  document.getElementById("DocFrame").src = `https://denartcc.org/${DOC}`;
}

var SendChart = document.querySelector("#ChartICAO_Submit");

SendChart.onclick = () => {
  ICAO = document.querySelector("#ChartICAO").value
  ICAO = ICAO.toUpperCase();
  document.getElementById("general").innerHTML = `<div id=${ICAO}general></div>`
  document.getElementById("sids").innerHTML = `<div id=${ICAO}sids></div>`
  document.getElementById("stars").innerHTML = `<div id=${ICAO}stars></div>`
  document.getElementById("iaps").innerHTML = `<div id=${ICAO}iaps></div>`
  var request = new XMLHttpRequest();
  // General
  request.open("GET", `https://api.aviationapi.com/v1/charts?apt=${ICAO}&group=3`);
  request.send();
  request.onload = function () {
    if (request.status != 200) {
        console.log("Error pulling Charts.");
    } else {
      ChartArray = JSON.parse(request.response);
      ChartArray = ChartArray[ICAO];
      ChartArray.forEach(item => {
        document.getElementById(`${ICAO}general`).innerHTML += `
          <button type="button" class="btn btn-outline-secondary mb-1" onclick="ChangeChart('${ICAO}', '${item["pdf_name"]}')">
            <span class="orange-under"><span style="color: white;">${item["chart_name"]}</span></span>
          </button><br>`
      });
    }
  }
  // SIDs
  var requestsid = new XMLHttpRequest();
  requestsid.open("GET", `https://api.aviationapi.com/v1/charts?apt=${ICAO}&group=4`);
  requestsid.send();
  requestsid.onload = function () {
    if (requestsid.status != 200) {
        console.log("Error pulling Charts.");
    } else {
      ChartArray = JSON.parse(requestsid.response);
      ChartArray = ChartArray[ICAO];
      ChartArray.forEach((item, index) => {
        document.getElementById(`${ICAO}sids`).innerHTML += `
          <button type="button" class="btn btn-outline-secondary mb-1" onclick="ChangeChart('${ICAO}', '${item["pdf_name"]}')">
            <span class="orange-under"><span style="color: white;">${item["chart_name"]}</span></span>
          </button>`
        if(index == 0){
          document.getElementById(`${ICAO}sids`).innerHTML += `<br>`;
        }else{
          if(item["chart_name"].includes(ChartArray[index-1]["chart_name"])){
            document.getElementById(`${ICAO}sids`).innerHTML += `<br>`;
          }
        }
      });
    }
  }
  // STARs
  var requeststar = new XMLHttpRequest();
  requeststar.open("GET", `https://api.aviationapi.com/v1/charts?apt=${ICAO}&group=5`);
  requeststar.send();
  requeststar.onload = function () {
    if (requeststar.status != 200) {
        console.log("Error pulling Charts.");
    } else {
      ChartArray = JSON.parse(requeststar.response);
      ChartArray = ChartArray[ICAO];
      ChartArray.forEach((item, index) => {
        document.getElementById(`${ICAO}stars`).innerHTML += `
          <button type="button" class="btn btn-outline-secondary mb-1" onclick="ChangeChart('${ICAO}', '${item["pdf_name"]}')">
            <span class="orange-under"><span style="color: white;">${item["chart_name"]}</span></span>
          </button>`
          if(index == 0){
            document.getElementById(`${ICAO}stars`).innerHTML += `<br>`;
          }else{
            if(item["chart_name"].includes(ChartArray[index-1]["chart_name"].substring(0, 5))){
              document.getElementById(`${ICAO}stars`).innerHTML += `<br>`;
            }
          }
      });
    }
  }
  // IAPs
  var requestiap = new XMLHttpRequest();
  requestiap.open("GET", `https://api.aviationapi.com/v1/charts?apt=${ICAO}&group=6`);
  requestiap.send();
  requestiap.onload = function () {
    if (requestiap.status != 200) {
        console.log("Error pulling Charts.");
    } else {
      ChartArray = JSON.parse(requestiap.response);
      ChartArray = ChartArray[ICAO];
      ChartArray.forEach(item => {
        document.getElementById(`${ICAO}iaps`).innerHTML += `
          <button type="button" class="btn btn-outline-secondary mb-1" onclick="ChangeChart('${ICAO}', '${item["pdf_name"]}')">
            <span class="orange-under"><span style="color: white;">${item["chart_name"]}</span></span>
          </button><br>`
      });
    }
  }
}

  // SOPs
  var requestSOP = new XMLHttpRequest();
  requestSOP.open("GET", `https://denartcc.org/api/docs/sop`);
  requestSOP.send();
  requestSOP.onload = function () {
    if (requestSOP.status != 200) {
        console.log("Error pulling Documents.");
    } else {
      SOPArray = JSON.parse(requestSOP.response);
      SOPArray.forEach((item) => {
        document.getElementById(`SOP`).innerHTML += `
          <button type="button" class="btn btn-outline-secondary mb-1" onclick="ChangeDoc('${item["url"]}')">
            <span class="orange-under"><span style="color: white;">${item["name"]}</span></span>
          </button><br>`
      });
    }
  }
  // LOAs
  var requestLOA = new XMLHttpRequest();
  requestLOA.open("GET", `https://denartcc.org/api/docs/loa`);
  requestLOA.send();
  requestLOA.onload = function () {
    if (requestLOA.status != 200) {
        console.log("Error pulling Documents.");
    } else {
      LOAArray = JSON.parse(requestLOA.response);
      LOAArray.forEach((item) => {
        document.getElementById(`LOA`).innerHTML += `
          <button type="button" class="btn btn-outline-secondary mb-1" onclick="ChangeDoc('${item["url"]}')">
            <span class="orange-under"><span style="color: white;">${item["name"]}</span></span>
          </button><br>`
      });
    }
  }
  // References
  var requestRef = new XMLHttpRequest();
  requestRef.open("GET", `https://denartcc.org/api/docs/reference`);
  requestRef.send();
  requestRef.onload = function () {
    if (requestRef.status != 200) {
        console.log("Error pulling Documents.");
    } else {
      RefArray = JSON.parse(requestRef.response);
      RefArray.forEach((item) => {
        document.getElementById(`Reference`).innerHTML += `
          <button type="button" class="btn btn-outline-secondary mb-1" onclick="ChangeDoc('${item["url"]}')">
            <span class="orange-under"><span style="color: white;">${item["name"]}</span></span>
          </button><br>`
      });
    }
  }