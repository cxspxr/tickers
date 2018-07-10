const db = require('../database/db');

module.exports = (sell, earnedCosts) => {
    return new Promise((resolve) => {
        let query = 'update sells set income=' + earnedCosts + ' where id = ' + sell;
        db.query(query, (error, sells) => {
            if (error) throw error;
            console.log('sell ' + sell + ' income is set to ' + earnedCosts);
            resolve();
        });
    });
}
