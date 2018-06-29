const sellDeposit = require('./sell-deposit');
const sendCosts = require('./send-costs/send-costs');
const findSell = require('./find-sell');
const watchForDepositComplete = require('./watch-for-deposit-complete');
const setCompleteStatus = require('./set-sell-complete-status/set-sell-complete-status');
const setSellVolume = require('./set-sell-volume');

module.exports = function (transaction, ticker, user) {
    return new Promise(function (resolve) {
        // watch for movement 'executed' status
        watchForDepositComplete(transaction).then(function (earnedCrypto) {
            // find sell
            findSell(transaction, ticker, function (sell) {
                setSellVolume(sell, earnedCrypto).then(function () {
                    // sell executed movement
                    sellDeposit().then(function (earnedCosts) {
                        sendCosts(user, earnedCosts).then(function () {
                            // mark sell as complete
                                setCompleteStatus(sell).then(function() {
                                    resolve();
                                });
                        });
                    });
                });
            });
        });
    });
}
