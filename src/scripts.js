const fs = require("fs");


function pullData() {
    //Metar + Wind & Altimeter
    var request = new XMLHttpRequest();
    request.open("GET", "https://metar.vatsim.net/KDEN");
    request.send();
    request.onload = function () {
        if (request.status != 200) {
            console.log("error pulling VATSIM Data");
        } else {
            document.getElementById("KDENMETAR").innerHTML = request.response;
            document.getElementById("KDENWINDDIR").innerHTML = request.response.substring(12, 16);
            document.getElementById("KDENWINDSPD").innerHTML = request.response.substring(16, request.response.indexOf("KT") + 2);
            document.getElementById("KDENALT").innerHTML = request.response.substring(request.response.indexOf(" A") + 1, request.response.indexOf(" A") + 6);
        }
    }

    //Pulls the active AAR
    var request1 = new XMLHttpRequest();
    request1.open("GET", "https://aadc.denartcc.org/AAR.php");
    request1.send();
    request1.onload = function () {
        if (request1.status != 200) {
            console.log("error pulling AAR Data");
        } else {
            document.getElementById("ActiveAAR").innerHTML = request1.response;
        }
    }

    //Pulls the Real World Config
    var DENAirportConfig = new XMLHttpRequest();
    DENAirportConfig.open("GET", "https://runwayweather.com/api/airport_config/");
    DENAirportConfig.send();
    DENAirportConfig.onload = function () {
        if (DENAirportConfig.status != 200) {
            console.log("error pulling Real World AAR Data");
        } else {
            var DenData = JSON.parse(DENAirportConfig.response)[0]
            document.getElementById("RWAAR").innerHTML = DenData["arrRate"];
            document.getElementById("RWADR").innerHTML = DenData["depRate"];
            document.getElementById("RWLR").innerHTML = DenData["arrRwy"];
            document.getElementById("RWDR").innerHTML = DenData["depRwy"];
        }
    }

    //Pulls the VATSIM ATIS Letter
    var DENAtis = new XMLHttpRequest();
    DENAtis.open("GET", "https://denartcc.org/atis/KDEN");
    DENAtis.send();
    DENAtis.onload = function () {
        if (DENAtis.status != 200) {
            console.log("error pulling ATIS Data");
        } else {
            var DenData = JSON.parse(DENAtis.response)[0]
            if(DenData != null){
                document.getElementById("DENLET").innerHTML = DenData["atis_letter"];
            }
        }
    }

    // Pulls VATUSA NTOS
    var NTOSReq = new XMLHttpRequest();
    NTOSReq.open("GET", "https://api.vatusa.net/v2/tmu/notices/ZDV?children=true");
    NTOSReq.send();
    NTOSReq.onload = () => {
        if(NTOSReq.status != 200){
            console.log("Error pulling VATUSA NTOS Data.");
        } else {
            var data = JSON.parse(NTOSReq.response);
            data = Object.values(data);
            data.pop()
            NTOSHTMLString = "";
            data.forEach((item, index) => {
                NTOSHTMLString += `
                  <div class="mb-1" style="background-color:#1F1F1F; text-align: center; vertical-align: middle; padding: .5rem;">
                    <div class="col-12 d-flex d-inline flex-wrap">
                      <p class="m-0">
                        <p class="orange-under pr-1 m-0">Priority:</p> ${item["priority"]} <p class="m-0 TextOr pl-2 pr-2">|</p> 
                        <p class="orange-under pr-1 m-0">Start:</p> ${item["start_date"]} <p class="m-0 TextOr pl-2 pr-2">|</p> 
                        <p class="orange-under pr-1 m-0">End:</p> ${item["expire_date"]} <p class="m-0 TextOr pl-2 pr-2">|</p> 
                        <p class="orange-under pr-1 m-0">Message:</p> ${item["message"]} 
                      </p>
                    </div>
                  </div>
                `;
            });
            document.getElementById("NTOSEntry").innerHTML = NTOSHTMLString;
        }
    }

    var randomthingy = setTimeout(pullData, 60000);

    ipcRenderer.on('message', (event, text) => {
        document.getElementById("VersionID").innerHTML = text
    })
};

pullData();


function flightStripMaker() {
    var vatsimDataReq = new XMLHttpRequest();
    vatsimDataReq.open("GET", "https://api.aviationapi.com/v1/vatsim/pilots?apt=KDEN")
    vatsimDataReq.send();
    vatsimDataReq.onload = () => {
        if (vatsimDataReq.status != 200) {
            console.log("error pulling Departure Data");
        } else {
            return JSON.parse(vatsimDataReq.response);
        }
    }
}


//Gets Charts 
function getChart(chartAirport) {
    var chartDataReq = new XMLHttpRequest();
    chartDataReq.open("GET", "https://api.aviationapi.com/v1/charts?apt=" + chartAirport);
    chartDataReq.send();
    chartDataReq.onload = () => {
        if (chartDataReq.status = 200) {
            return JSON.parse(chartDataReq.response);
        } else if (chartDataReq = 403) {
            console.log("Error 403 - Invalid Group Code")
        } else {
            console.log("Error 404 - No APT Specified")
        }
    }
            
}