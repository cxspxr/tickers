const timeout = require('./timeout');
const bfx = require('../bitfinex/bitfinex');
const mysql = require('../database/db');
const wsServer = require('../websocket-server/server');

var ticker = false;

wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    function sendTicker() {
        if (ticker && connection.connected) {
            connection.send(JSON.stringify(ticker));
            setTimeout(sendTicker, timeout);
        }
    }

    sendTicker();
});

bfx.on('open', () => {
    bfx.subscribeTicker('tLTCUSD');
});

bfx.onTicker({
    symbol: 'tLTCUSD'
}, (t) => {
    ticker = {'tLTCUSD': t};
});

module.exports = wsServer;
