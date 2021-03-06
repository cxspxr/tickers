const bfx = require('../bitfinex/ws');
const Order = require('bitfinex-api-node-updated').Models.Order;
const getBalances = require('./get-balances');

bfx.on('open', () => {
    bfx.auth();
});

bfx.once('auth', () => {
    getBalances().then((balances) => {
        for(let i = 0; i < balances.length; i++) {
            if (balances[i][0] === "exchange" && balances[i][1] !== 'USD' && balances[i][2] > 0) {
                let ticker = balances[i][1];
                let amount = balances[i][2];
                let o = new Order({
                    cid: Date.now(),
                    symbol: 't' + ticker + 'USD',
                    type: 'EXCHANGE MARKET',
                    amount: -1 * amount
                }, bfx);

                let closed = true;

                o.registerListeners();

                o.on('update', () => {
                    console.log(o.serialize());
                });

                o.submit().then(() => {
                    console.log('submitted');
                }).catch((err) => {
                    console.log(err);
                });

                o.on('close', () => {
                    console.log('order is closed: ' + o.status);
                    closed = true;

                    bfx.close();
                });
            }
        }
    });
});

bfx.open();
