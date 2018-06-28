const db = require('../database/db');

module.exports = function(transaction, ticker, callback) {
    let query = 'select id from sells where transaction="' + transaction
        + '" and ticker_id in (select id from tickers where tickers.id = ' + ticker + ')';
    db.query(query, function (error, sells) {
        if (error) throw error;
        console.log('sell is found for transaction ' + transaction + ' with ticker ' + ticker);
        callback(sells[0].id);
    });
}
