const ws = require('../bitfinex/ws');

ws.onWalletSnapshot({
    'wallet_type' : 'exchange'
}, (wallet) => {
    console.log(wallet);
});

ws.on('open', () => {
    ws.auth();
});


ws.open();
