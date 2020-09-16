const fs = require('fs');
const https = require('https');
const WebSocket = require("ws");

const server = https.createServer({
    cert: fs.readFileSync('/etc/letsencrypt/live/iws.raajpatel.com/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/iws.raajpatel.com/privkey.pem')
});

const wss = new WebSocket.Server({ server });
console.log("WebSocket Server is running on Port 8080\n\n");

wss.on('connection', (ws) => {
    console.log("Client Connected\n\n");
    fs.readFile('./data.json', "utf8", (err, datafile) => {
        ws.send(datafile);
    });
    ws.on('message', (data) => {
        console.log('received: %s', data);
        fs.writeFile("./data.json", data, (err, result) => {
            if (err) {
                console.log("Error Writing incoming data to file");
            }
        });
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});

server.listen(8080);



function checkTime() {
    fs.readFile("./data.json", (err, result) => {
        if (err) {
            console.log("Error opening datafile.");
        }
        var d = new Date();
        var hour = d.getUTCHours();
        var min = d.getUTCMinutes();
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (min < 10) {
            min = "0" + min;
        }
        var time = hour + "" + min;
        data = JSON.parse(result);
        data.PIREP.forEach(element => {
            if (element['pireptime'].substring(0, 4) == time) {
                data.PIREP.splice(data.PIREP.indexOf(element), 1);
            }
        });
        data.ActiveAreas.forEach(element => {
            if (element['AirspaceEND'].substring(0, 4) == time) {
                data.ActiveAreas.splice(data.ActiveAreas.indexOf(element), 1);
            }
        });
        fs.writeFile("./data.json", JSON.stringify(data), (err, result) => {
            if (err) {
                console.log("RAAAAAJ THERE WAS AN ERROR YOU DING ALING: ", err);
            }
            ws = new WebSocket('wss://iws.raajpatel.com:8080');

            ws.onopen = () => {
                console.log("WS Connection opened!");
                ws.send(JSON.stringify(data));
            }

        });
    });

    setTimeout(checkTime, 45*1000);
}

checkTime();