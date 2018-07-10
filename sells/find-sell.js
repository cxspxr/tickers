const db = require('../database/db');

module.exports = (transaction, ticker) => {
    return new Promise((resolve) => {
        let query = 'select id from sells where transaction="' + transaction
            + '" and ticker_id in (select id from tickers where tickers.id = ' + ticker + ')';
        db.query(query, (error, sells) => {
            if (error) throw error;
            console.log('sell is found for transaction ' + transaction + ' with ticker ' + ticker);
            resolve(sells[0].id);
        });
    });
}
