const BFX = require('bitfinex-api-node');
const config = require('./config');

var bfx = new BFX({
    ws: config
});

var ws = bfx.ws();

module.exports = ws;
