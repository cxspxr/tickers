const db = require('../database/db');

module.exports = function(sell, earnedCrypto) {
    return new Promise(function(resolve) {
        let query = 'update sells set volume=' + earnedCrypto + ' where id = ' + sell;
        db.query(query, function (error, sells) {
            if (error) throw error;
            console.log('sell ' + sell + ' volume is set to ' + earnedCrypto);
            resolve();
        });
    });
}
