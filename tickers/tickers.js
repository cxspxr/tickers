const timeout = require('./timeout');
const bfx = require('../bitfinex/ws');
const mysql = require('../database/db');
const wsServer = require('../websocket-server/server');

var tickers = {};

mysql.connect();
mysql.query('select ticker from tickers', (error, results) => {
    if (error) throw error;

    bfx.on('open', () => {
        for (let i = 0; i < results.length; i++) {
            bfx.subscribeTicker(results[i].ticker);
            bfx.onTicker({
                symbol: results[i].ticker
            }, (t) => {
                tickers[results[i].ticker] = t;
            });
        }
    });
});
mysql.end();

wsServer.on('request', (request) => {
    var connection = request.accept(null, request.origin);

    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            function sendTickers() {
                if (connection.connected) {
                    connection.send(JSON.stringify(tickers));
                    setTimeout(sendTickers, timeout);
                }
            }

            sendTickers();
        }
    });
});

bfx.open();
