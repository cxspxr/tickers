const WebSocketServer = require('websocket').server;
const http = require('http');
const BFX = require('bitfinex-api-node');
const mysql = require('./database/db');
require('dotenv').load();

var server = http.createServer(function(request, response) {});

var ticker = false;

server.listen(process.env.WEBSOCKET_PORT, function() {
    console.log((new Date()) + " Server is listening on port " + process.env.WEBSOCKET_PORT);
});

wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    function sendTicker() {
        if (ticker && connection.connected) {
            connection.send(JSON.stringify(ticker));
            setTimeout(sendTicker, 10 * 1000);
        }
    }

    sendTicker();
});


var bfx = new BFX({
    ws: {
        autoReconnect: true,
        packetWDelay: 10 * 1000
    }
});

var ws = bfx.ws();

ws.on('open', () => {
    ws.subscribeTicker('tLTCUSD');
});

ws.onTicker({
    symbol: 'tLTCUSD'
}, (t) => {
    ticker = {'tLTCUSD': t};
});

ws.open()
