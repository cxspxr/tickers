const db = require('../database/db');

module.exports = (sell, earnedCrypto) => {
    return new Promise((resolve) => {
        let query = 'update sells set volume=' + earnedCrypto + ' where id = ' + sell;
        db.query(query, (error, sells) => {
            if (error) throw error;
            console.log('sell ' + sell + ' volume is set to ' + earnedCrypto);
            resolve();
        });
    });
}
