const request = require('request');
const crypto = require('crypto');
const bfx = require('../bitfinex/rest');
const completeStatus = 'COMPLETED';

module.exports = (transaction, ticker) => {
    // transaction = 'd1fe547293ac982a3a7f82a316eb7c484bf1d9e9523605fa264dba975538eca3';
    ticker = ticker.replace('t', '').replace('USD', '');

    return new Promise((resolve) => {
        var intervalId = setInterval(() => {
            bfx.movements().then(movements => {
                var movement = movements.find((movement) => {
                    return movement.transactionId === transaction && movement.currency === ticker;
                });
                if (movement.status === completeStatus) {
                    console.log('deposit is complete for transaction ' + transaction);
                    clearInterval(intervalId);
                    resolve(movement.amount - movement.fees);
                }
            });
        }, 1000);
    });
}
