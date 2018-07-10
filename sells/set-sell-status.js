const db = require('../database/db');
const findStatus = require('../status/find-status');

module.exports = (sell, statusname) => {
    return new Promise((resolve) => {
        findStatus(statusname).then((status) => {
            let query = 'update sells set status_id=' + status + ' where id = ' + sell;
            db.query(query, (error, sells) => {
                if (error) throw error;
                console.log('sell ' + sell + ' is complete');
                resolve();
            });
        });
    });
}
