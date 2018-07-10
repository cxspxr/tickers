const BFX = require('bitfinex-api-node-updated');
const config = require('./config');

require('dotenv').load();

var bfx = new BFX({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    ws: config
});

module.exports = bfx;
