(function () {
var SendPIREP = document.querySelector("#editprp_update");
var SendActiveArea = document.querySelector("#editAA_update");
var SendRWY = document.querySelector("#editrwy_update");
var SendCDR = document.querySelector("#editcdr_update");

// TMU DEPARTURES
var SendYAMMI = document.querySelector("#YAMMI_Update");
var SendRIKKK = document.querySelector("#RIKKK_Update");
var SendBRYCC = document.querySelector("#BRYCC_Update");
var SendYOKES = document.querySelector("#YOKES_Update");
var SendEEONS = document.querySelector("#EEONS_Update");
var SendEMMYS = document.querySelector("#EMMYS_Update");
var SendEXTAN = document.querySelector("#EXTAN_Update");
var SendEPKEE = document.querySelector("#EPKEE_Update");
var SendSTAKR = document.querySelector("#STAKR_Update");
var SendSHOJO = document.querySelector("#SHOJO_Update");
var SendSCAGS = document.querySelector("#SCAGS_Update");
var SendSOLAR = document.querySelector("#SOLAR_Update");
var SendBAYLR = document.querySelector("#BAYLR_Update");
var SendCONNR = document.querySelector("#CONNR_Update");
var SendCOORZ = document.querySelector("#COORZ_Update");
var SendZIMMR = document.querySelector("#ZIMMR_Update");
// TMU ARRIVALS
var SendLONGZ = document.querySelector("#LONGZ_Update");
var SendFLATI = document.querySelector("#FLATI_Update");
var SendAALLE = document.querySelector("#AALLE_Update");
var SendLAWGR = document.querySelector("#LAWGR_Update");
var SendCLASH = document.querySelector("#CLASH_Update");
var SendNIIXX = document.querySelector("#NIIXX_Update");
var SendTBARR = document.querySelector("#TBARR_Update");
var SendSSKII = document.querySelector("#SSKII_Update");


let ws;

function init() {
    function DeleteWS(Type, Index){
    var WSData = {
        "Delete": true,
        "Type": Type,
        "Index": Index
    }
    WSData = JSON.stringify(WSData);
    ws.send(WSData);
    }
    window.DeleteWS = DeleteWS

    if (ws) {
    ws.onerror = ws.onopen = ws.onclose == null;
    ws.close();
    }

    ws = new WebSocket('wss://iws.denartcc.org:8080');

    ws.onopen = () => {
    console.log("WS Connection opened!");
    }

    ws.onmessage = ({ data }) => {
    datafile = JSON.parse(data);

    //RWYs
    var RWYs = datafile.RWYS;
    // RWYs.forEach(item => {
        document.getElementById("RWLR1").innerHTML = RWYs["LandingRWYs"];
        document.getElementById("RWDR1").innerHTML = RWYs["DepartingRWYs"];
    // });

    //PIREP
    var PIREP = datafile.PIREP;
    PIREPHTMLString = "";
    PIREP.forEach((item, index) => {
        PIREPHTMLString += `
        <div class="mb-1" style="background-color:#1F1F1F; text-align: center; vertical-align: middle; padding: .5rem;">
            <div class="col-12 d-flex d-inline flex-wrap">
                <p class="m-0">${item["UA"]}<p class="m-0 TextOr">/OV</p>${item["OV"]}<p class="m-0 TextOr">/TM</p>${item["TM"]}<p class="m-0 TextOr">/FL</p>${item["FL"]}<p class="m-0 TextOr">/TP</p>${item["TP"]}<p class="m-0 TextOr">/WX</p>${item["WX"]}<p class="m-0 TextOr">/SK</p>${item["SK"]}<p class="m-0 TextOr">/TA</p>${item["TA"]}<p class="m-0 TextOr">/WV</p>${item["WV"]}<p class="m-0 TextOr">/IC</p>${item["ICLevel"]} ${item["ICType"]}<p class="m-0 TextOr">/TB</p>${item["TBTime"]} ${item["TBLevel"]} ${item["TBType"]} ${item["TBAlt"]}<p class="m-0 TextOr">/RM</p>${item["RM"]}</p>
                <span class="float-right" style="margin-left:auto;">
                <button type="button" class="close pb-1" onclick="DeleteWS('PIREP', ${index})">
                    <i class="bi bi-x-circle TextOr"></i>
                </button>
                </span>
            </div>
        </div>
        `;
    });
    document.getElementById("PIREPEntry").innerHTML = PIREPHTMLString;

    //TMU
    var TMU = datafile.TMU;
    TMUHTMLString = "";
    TMU.forEach((item, index) => {
        TMUHTMLString += `
            <div class="mb-1" style="background-color:#1F1F1F; text-align: center; vertical-align: middle; padding: .5rem;">
            <div class="col-12 d-flex d-inline flex-wrap">
                <p class="m-0">
                <p class="orange-under pr-1 m-0">GATE:</p> ${item["Gate"].toUpperCase()} <p class="m-0 TextOr pl-2 pr-2">|</p> 
                <p class="orange-under pr-1 m-0">STATUS:</p>` 
                if(item["Status"] == "OPEN"){
                    TMUHTMLString += item["Status"]
                }else{
                    TMUHTMLString += `<p class="m-0" style="color:red"> ${item["Status"]} </p>`
                }
                TMUHTMLString += `<p class="m-0 TextOr pl-2 pr-2">|</p> 
                <p class="orange-under pr-1 m-0">MIT:</p> ${item["MIT"]} <p class="m-0 TextOr pl-2 pr-2">|</p> 
                <p class="orange-under pr-1 m-0">SPD:</p> ${item["SPD"]} 
                </p>
                <span class="float-right" style="margin-left:auto;">
                <button type="button" class="close pb-1" onclick="DeleteWS('TMU', ${index})">
                    <i class="bi bi-x-circle TextOr"></i>
                </button>
                </span>
            </div>
            </div>
        `;
    });
    document.getElementById("TMUEntry").innerHTML = TMUHTMLString;

    //ActiveAreas
    var ActiveAreas = datafile.ActiveAreas;
    AAHTMLString = "";
    ActiveAreas.forEach((item, index) => {
        AAHTMLString += `
            <div class="mb-1" style="background-color:#1F1F1F; text-align: center; vertical-align: middle; padding: .5rem;">
            <div class="col-12 d-flex d-inline flex-wrap">
                <p class="m-0">
                <p class="orange-under pr-1 m-0">ID:</p> ${item["AirspaceID"]} <p class="m-0 TextOr pl-2 pr-2">|</p> 
                <p class="orange-under pr-1 m-0">ALT:</p> ${item["AirspaceALT"]} <p class="m-0 TextOr pl-2 pr-2">|</p> 
                <p class="orange-under pr-1 m-0">TIME:</p> ${item["AirspaceEND"]} <p class="m-0 TextOr pl-2 pr-2">|</p> 
                <p class="orange-under pr-1 m-0">Extra:</p> ${item["AirspaceEXTRA"]} 
                </p>
                <span class="float-right" style="margin-left:auto;">
                <button type="button" class="close pb-1" onclick="DeleteWS('ActiveAreas', ${index})">
                    <i class="bi bi-x-circle TextOr"></i>
                </button>
                </span>
            </div>
            </div>
        `;
    });
    document.getElementById("AAEntry").innerHTML = AAHTMLString;
    }

    ws.onclose = () => {
    ws = null;
    }

    // Send PIREP over WS
    SendPIREP.onclick = () => {
    if (!ws) {
        console.log("Attempt to send Pirep - No Websocket Connection");
        return;
    }
    var PirepSubmission = {
        "UA": document.querySelector("#ReportType").value,
        "OV": document.querySelector("#OV").value,
        "TM": document.querySelector("#TM").value,
        "FL": document.querySelector("#FL").value,
        "TP": document.querySelector("#TP").value,
        "WX": document.querySelector("#WX").value,
        "SK": document.querySelector("#SK").value,
        "TA": document.querySelector("#TA").value,
        "WV": document.querySelector("#WV").value,
        "ICLevel": document.querySelector("#ICLevel").value,
        "ICType": document.querySelector("#ICType").value,
        "TBTime": document.querySelector("#TBTime").value,
        "TBLevel": document.querySelector("#TBLevel").value,
        "TBType": document.querySelector("#TBType").value,
        "TBAlt": document.querySelector("#TBAlt").value,
        "RM": document.querySelector("#RM").value,
    };
    var FinalPIREP = JSON.stringify(PirepSubmission);
    ws.send(FinalPIREP);
    }

    // SEND AA over WS
    SendActiveArea.onclick = () => {
    if (!ws) {
        console.log("Attempt to send Active Area - No Websocket Connection");
        return;
    }
    var AASubmission = {
        "AirspaceID": document.querySelector("#airspaceid").value,
        "AirspaceALT": document.querySelector("#airspacealt").value,
        "AirspaceEND": document.querySelector("#airspaceend").value,
        "AirspaceEXTRA": document.querySelector("#airspaceextra").value
    };
    var finalAA = JSON.stringify(AASubmission);
    ws.send(finalAA);
    }

    // SEND TMU over WS
    SendYAMMI.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "yammi";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendRIKKK.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "rikkk";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendBRYCC.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "brycc";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendYOKES.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "yokes";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendEEONS.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "eeons";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendEMMYS.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "emmys";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendEXTAN.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "extan";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendEPKEE.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "epkee";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendSTAKR.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "STAKR";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendSHOJO.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "shojo";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendSCAGS.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "scags";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendSOLAR.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "solar";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendBAYLR.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "baylr";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendCONNR.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "connr";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendCOORZ.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "coorz";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendZIMMR.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "zimmr";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendLONGZ.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "longz";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendFLATI.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "flati";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendAALLE.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "aalle";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendLAWGR.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "lawgr";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendCLASH.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "clash";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendNIIXX.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "niixx";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendTBARR.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "tbarr";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }

    SendSSKII.onclick = () => {
    if (!ws) {
        console.log("Attempt to send TMU - No Websocket Connection");
        return;
    }
    GATE = "sskii";
    var TMUSubmission = {
        "Gate": GATE,
        "Status": document.querySelector(`#${GATE}gate`).value,
        "MIT": document.querySelector(`#${GATE}mit`).value,
        "SPD": document.querySelector(`#${GATE}speed`).value
    };
    var finalTMU = JSON.stringify(TMUSubmission);
    ws.send(finalTMU);
    }
    
    // Send RWYs over WS |||| BROKEN!!!!
    SendRWY.onclick = () => {
    if (!ws) {
        console.log("Attempt to send ATIS - No Websocket Connection");
        return;
    }
    var RWYSubmit = {
        "LandingRWYs": document.querySelector("#rwyland").value,
        "DepartingRWYs": document.querySelector("#rwydep").value,
    };
    var finalRWY = JSON.stringify(RWYSubmit);
    ws.send(finalRWY);
    }


}

// Fetch CDR from zdv
SendCDR.onclick = () => {
    var CDRQuery = new XMLHttpRequest();
    CDRQuery.open("GET", "https://denartcc.org/api/cdrs/" + document.querySelector("#cdrentry").value);
    CDRQuery.send();
    CDRQuery.onload = function () {
    if (CDRQuery.status != 200) {
        console.log("DENARTCC CDR Website is Down");
    } else {
        var QueryResponse = CDRQuery.response;
        console.log("https://denartcc.org/api/cdrs/" + document.querySelector("#cdrentry").value);
        console.log(QueryResponse);
        QueryResponse = JSON.parse(QueryResponse)[0];
        document.getElementById("CDROrig").innerHTML = QueryResponse.Orig;
        document.getElementById("CDRDest").innerHTML = QueryResponse.Dest;
        document.getElementById("CDRDepFix").innerHTML = QueryResponse.DepFix;
        document.getElementById("CDRRoute").innerHTML = QueryResponse.Route;
        document.getElementById("CDRDCNTR").innerHTML = QueryResponse.DCNTR;
        document.getElementById("CDRACNTR").innerHTML = QueryResponse.ACNTR;
        document.getElementById("CDRTCNTR").innerHTML = QueryResponse.TCNTR;
        document.getElementById("CDRCoordReq").innerHTML = QueryResponse.CoordReq;
        document.getElementById("CDRPlay").innerHTML = QueryResponse.Play;
        document.getElementById("CDRNavEqp").innerHTML = QueryResponse.NavEqp;
    }
    }
}

init();
})();

// Close Active Area Modal on Submit
$(function () {
$(".closemodalaa").on('click', function() {
    $('#activeareamodal').modal('hide');
}); 
});

// Close IDS/AADC Modal on Submit
$(function () {
$(".closemodalaadc").on('click', function() {
    $('#aadcmodal').modal('hide');
});
});