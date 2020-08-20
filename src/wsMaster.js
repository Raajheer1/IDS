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
                        if(err) {
                                console.log("Error Writing incoming data to file");
                        }
                });
                wss.clients.forEach( (client) => {
                        if(client != ws && client.readyState === WebSocket.OPEN) {
                                client.send(data);
                        }
                });
        });
});

server.listen(8080);

