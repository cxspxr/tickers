const bfx = require('../bitfinex/rest');

module.exports = (currency) => {
    return new Promise( (resolve) => {
        bfx.ticker(currency, (e, c) => {
            if (e) throw e;
            resolve(c.bid);
        });
    });
}
