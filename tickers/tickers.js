const timeout = require('./timeout');
const bfx = require('../bitfinex/bitfinex');
const mysql = require('../database/db');
const wsServer = require('../websocket-server/server');

var tickers = {};

mysql.connect();
mysql.query('select name from tickers', function (error, results) {
    if (error) throw error;
    tickers = results;

    bfx.on('open', () => {
        for (let i = 0; i < tickers.length; i++) {
            bfx.subscribeTicker(tickers[i].name);

            bfx.onTicker({
                symbol: tickers[i].name
            }, (t) => {
                tickers[tickers[i].name] = t;
            });
        }
    });
});
mysql.end();

wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            var name = message.utf8Data;

            function sendTicker() {
                if (tickers[name] && connection.connected) {
                    connection.send(JSON.stringify(tickers[name]));
                    setTimeout(sendTicker, timeout);
                }
            }

            sendTicker();
        }
    });
});


module.exports = wsServer;
