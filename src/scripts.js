function pullData(){
    //Metar + Wind & Altimeter
    var request = new XMLHttpRequest();
    request.open("GET", "http://metar.vatsim.net/KDEN");
    request.send();
    request.onload = function() {
        if(request.status != 200){
            console.log("error pulling VATSIM Data");
        } else {
            document.getElementById("KDENMETAR").innerHTML = request.response;
            document.getElementById("KDENWINDDIR").innerHTML = request.response.substring(12, 16);
            document.getElementById("KDENWINDSPD").innerHTML = request.response.substring(16, request.response.indexOf("KT")+2);
            document.getElementById("KDENALT").innerHTML = request.response.substring(request.response.indexOf(" A")+1, request.response.indexOf(" A")+6);
        }
    }

    //Pulls the active AAR
    var request1 = new XMLHttpRequest();
    request1.open("GET", "https://aadc.denartcc.org/AAR.php");
    request1.send();
    request1.onload = function() {
        if(request1.status != 200){
            console.log("error pulling AAR Data");
        } else {
            document.getElementById("ActiveAAR").innerHTML = request1.response;
        }
    }

    //Pulls the Real World Config
    var DENAirportConfig = new XMLHttpRequest();
    DENAirportConfig.open("GET", "https://runwayweather.com/api/airport_config/");
    DENAirportConfig.send();
    DENAirportConfig.onload = function() {
        if(DENAirportConfig.status != 200){
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
    DENAtis.onload = function() {
        if(DENAtis.status != 200){
            console.log("error pulling ATIS Data");
        } else {
            var DenData = JSON.parse(DENAtis.response)[0]
            document.getElementById("DENLET").innerHTML = DenData["atis_letter"];
        }
    }
    setTimeout(pullData, 5000);
};

pullData();
