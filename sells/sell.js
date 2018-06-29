const sellDeposit = require('./sell-deposit');
const sendCosts = require('./send-costs/send-costs');
const findSell = require('./find-sell');
const watchForDepositComplete = require('./watch-for-deposit-complete');
const setSellStatus = require('./set-sell-status');
const setSellVolume = require('./set-sell-volume');
const setSellIncome = require('./set-sell-income');

module.exports = function (transaction, ticker, user) {
    return new Promise(function (resolve) {
        // watch for movement 'executed' status
        watchForDepositComplete(transaction).then(function (earnedCrypto) {
            // find sell
            findSell(transaction, ticker, function (sell) {
                setSellStatus(sell, 'processing').then(function () {
                    setSellVolume(sell, earnedCrypto).then(function () {
                        // sell executed movement
                        sellDeposit().then(function (earnedCosts) {
                            setSellIncome(sell, earnedCosts).then(function () {
                                sendCosts(user, earnedCosts).then(function () {
                                    // mark sell as complete
                                    setSellStatus(sell, 'complete').then(function() {
                                        resolve();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}
