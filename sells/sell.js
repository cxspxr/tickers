const sendCosts = require('./send-costs/send-costs');
const findSell = require('./find-sell');
const watchForDepositComplete = require('./watch-for-deposit-complete');
const setSellStatus = require('./set-sell-status');
const setSellVolume = require('./set-sell-volume');
const setSellIncome = require('./set-sell-income');
const getConfig = require('../config/get-config');
const findCurrencyRate = require('./find-currency-rate');
require('dotenv').load();

module.exports = (transaction, ticker, tickername, user) => {
    return new Promise((resolve) => {
        watchForDepositComplete(transaction, tickername).then((earnedCrypto) => {
            findSell(transaction, ticker).then((sell) => {
                setSellVolume(sell, earnedCrypto).then(() => {
                    setSellStatus(sell, process.env.PROCESSING_STATUS).then(() => {
                        findCurrencyRate(tickername).then((rate) => {
                            getConfig('currency_rate').then((rubleRate) => {
                                sendCosts(user, earnedCrypto * rate * rubleRate).then((income) => {
                                    setSellIncome(sell, income).then(() => {
                                        setSellStatus(sell, 'complete').then(() => {
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
    });
}
