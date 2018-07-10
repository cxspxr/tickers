const nrp = require('../redis/pubsub');
const sell = require('./sell');
const completeExistingSells = require('./complete-existing-sells');
const db = require('../database/db');

db.connect();

completeExistingSells();

nrp.on('sell', (data) => {
    var transaction = data.transaction;
    var tickername = data.ticker;
    var user = data.user;
    var ticker = data.ticker_id;

    sell(transaction, ticker, tickername, user);
});
