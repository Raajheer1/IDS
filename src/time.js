// Time Table on Top Right
function updateTime(x) {
    if (x<10) {
      return "0" + x;
    }else{
      return x
    }
  }
  function currentTime() {
    var date = new Date();
    hour = updateTime(date.getUTCHours());
    UTCHour = date.getUTCHours()
    EST = UTCHour-5;
    CST = UTCHour-6;
    MST = UTCHour-7;
    PST = UTCHour-8;
    ESTHour = updateTime(EST);
    CSTHour = updateTime(CST);
    MSTHour = updateTime(MST);
    PSTHour = updateTime(PST);
    min = updateTime(date.getUTCMinutes());
    sec = updateTime(date.getUTCSeconds());
    document.getElementById("Zulu-Clock").innerText = hour + ":" + min + ":" + sec+"Z";
    document.getElementById("EST-Clock").innerText = ESTHour + ":" + min + ":" + sec+"L";
    document.getElementById("CST-Clock").innerText = CSTHour + ":" + min + ":" + sec+"L";
    document.getElementById("MST-Clock").innerText = MSTHour + ":" + min + ":" + sec+"L";
    document.getElementById("PST-Clock").innerText = PSTHour + ":" + min + ":" + sec+"L";
    var t = setTimeout(currentTime, 1000);
  }
  currentTime();
  const { ipcRenderer } = require('electron');
  var UserData = ipcRenderer.sendSync('specialist', '');
  document.getElementById("specialist").innerHTML = UserData[1] + " " + UserData[2];
  rating = UserData[4]
  if(UserData[4] == "S1" || UserData[4] == "S2" || UserData[4] == "S3"){
    document.getElementById("role").innerHTML = "Student"
  }else if(UserData[4] == "OBS"){
    document.getElementById("role").innerHTML = "Observer"
  }else if(UserData[4] == "C1"){
    document.getElementById("role").innerHTML = "Controller"
  }else if(UserData[4] == "C3"){
    document.getElementById("role").innerHTML = "Senior Controller"
  }else if(UserData[4] == "I1"){
    document.getElementById("role").innerHTML = "Instructor"
  }else if(UserData[4] == "I3"){
    document.getElementById("role").innerHTML = "Senior Instructor"
  }else if(UserData[4] == "SUP"){
    document.getElementById("role").innerHTML = "Supervisor"
  }else if(UserData[4] == "ADM"){
    document.getElementById("role").innerHTML = "Administrator"
  }else{
    document.getElementById("role").innerHTML = "N/A"
  }

  var vatsimDataReq = new XMLHttpRequest();
  vatsimDataReq.open("GET", "https://data.vatsim.net/v3/vatsim-data.json")
  vatsimDataReq.send();
  vatsimDataReq.onload = () => {
      if (vatsimDataReq.status != 200) {
          console.log("error pulling VATSIM Data");
      } else {
          controllers = JSON.parse(vatsimDataReq.response).controllers;
          controllers.forEach(item => {
            if(item.cid == UserData[0]){
              document.getElementById("position").innerHTML = item.callsign;
              logon = item.logon_time;
              logon = logon.substring(logon.indexOf("T")+1, logon.indexOf("."));
              console.log(logon)
              logonHour = logon.substring(0,2);
              logonMinute = logon.substring(3,5);
              logonSecond = logon.substring(6, 8);
              function logTime(){
                var date = new Date();
                hour = date.getUTCHours();
                min = date.getUTCMinutes();
                sec = date.getUTCSeconds();
                currentMS = hour*3600000 + min*60000 + sec*1000;
                LogonMS = logonHour*3600000 + logonMinute*60000 + logonSecond*1000;
                MS = currentMS - LogonMS;
                hour = Math.round(MS/3600000);
                MS = MS % 3600000;
                min = Math.round(MS/60000);
                MS = MS % 60000;
                sec = Math.round(MS/1000);
                if(hour < 0){
                  hour += 24;
                }
                if(min < 0){
                  min += 60;
                }
                if(sec < 0){
                  sec += 60;
                }
                document.getElementById("uptime").innerText = updateTime(hour) + ":" + updateTime(min) + ":" + updateTime(sec);
                var t = setTimeout(logTime, 1000);
              }
              logTime();
            }
          })
      }
  }