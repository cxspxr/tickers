const db = require('../database/db');
const sell = require('./sell');

module.exports = function() {
    let query = 'select transaction, user_id, ticker_id from sells where'
        + ' status_id in (select id from statuses where statuses.name = "processing" or statuses.name = "waiting")';
    db.query(query, function(error, sells) {
        if (error) throw error;

        for(var i = 0; i < sells.length; i++) {
            var transaction = sells[i].transaction;
            var user = sells[i].user_id;
            var ticker = sells[i].ticker_id;

            sell(transaction, ticker, user);
        }
    });
}
