const db = require('../database/db');

module.exports = function(sell, earnedCosts) {
    return new Promise(function(resolve) {
        let query = 'update sells set income=' + earnedCosts + ' where id = ' + sell;
        db.query(query, function (error, sells) {
            if (error) throw error;
            console.log('sell ' + sell + ' income is set to ' + earnedCosts);
            resolve();
        });
    });
}
