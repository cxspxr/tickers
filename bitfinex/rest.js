const bfx = require('./bitfinex');

module.exports = bfx.rest(2, { transform : true });
