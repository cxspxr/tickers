const ws = require('../bitfinex/ws');

module.exports = () => {
    return new Promise((resolve) => {
        ws.onWalletSnapshot({
            'wallet_type' : 'exchange'
        }, (wallets) => {
            resolve(wallets);
        });
    });
}
