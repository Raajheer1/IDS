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
            document.getElementById("RWLR1").innerHTML = DenData["arrRwy"];
            document.getElementById("RWDR1").innerHTML = DenData["depRwy"];
            document.getElementById("DENVMC").innerHTML = DenData["weather"];
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
            document.getElementById("DENLET").innerHTML = DenData["atis_letter"];
        }
    }


    //Reading JSON File
    delete require.cache[require.resolve('./data/data.json')]
    var datafile = require('./data/data.json');
    console.log(datafile);
    //ATIS
    var ATIS = datafile.ATIS;

    //PIREP
    var PIREP = datafile.PIREP;
    PIREPHTMLString = "";
    PIREP.forEach((item) => {
        PIREPHTMLString += `Loc: ${item["pireploc"]} | Time: ${item["pireptime"]} | Alt: ${item["pirepalt"]} | Acft: ${item["pirepact"]} | Sky: ${item["pirepsky"]} | Temp: ${item["pireptmp"]} | Wind: ${item["pirepwnd"]} | Rmk: ${item["pireprmk"]} <hr style="background-color: rgb(79,77,77); width: 25%; height: 0.031em; margin-top: 2px; margin-bottom: 2px;">`;
    });
    document.getElementById("PIREP_container").innerHTML = PIREPHTMLString;

    //TMU
    var TMU = datafile.TMU;
    TMUHTMLString = "";
    TMU.forEach((item) => {
        TMUHTMLString += `${item["TMUGate"]} | ${item["TMUStat"]} | ${item["TMUMIT"]} | ${item["TMUSPD"]} <hr style="background-color: rgb(79,77,77); width: 25%; height: 0.031em; margin-top: 2px; margin-bottom: 2px;">`;
    });
    document.getElementById("TMU_container").innerHTML = TMUHTMLString;

    //ActiveAreas
    var ActiveAreas = datafile.ActiveAreas;
    AAHTMLString = "";
    ActiveAreas.forEach((item) => {
        AAHTMLString += `ID: ${item["AirspaceID"]} | ALT: ${item["AirspaceALT"]} | ID: ${item["AirspaceEND"]} | Extra: ${item["AirspaceEXTRA"]} <hr style="background-color: rgb(79,77,77); width: 25%; height: 0.031em; margin-top: 2px; margin-bottom: 2px;">`;
    });
    document.getElementById("AAI_container").innerHTML = AAHTMLString;

    setTimeout(pullData, 5000);
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