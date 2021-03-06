const WebSocketServer = require('websocket').server;
const http = require('http');
require('dotenv').load();

server = http.createServer((request, response) => {});

server.listen(process.env.WEBSOCKET_PORT, () => {
   console.log((new Date()) + " Server is listening on port " + process.env.WEBSOCKET_PORT);
});

wsServer = new WebSocketServer({
   httpServer: server
});

module.exports = wsServer;
