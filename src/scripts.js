var request = new XMLHttpRequest();
//const metar = fetch('http://metar.vatsim.net/KDEN');
//const text = metar.text();

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

//GET AAR from AADC
//request.open("GET", )
