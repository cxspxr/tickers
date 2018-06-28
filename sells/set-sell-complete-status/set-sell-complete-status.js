const db = require('../../database/db.js');
const findStatus = require('./find-status');

module.exports = function(sell) {
    return new Promise(function(resolve) {
        findStatus('complete', function (status) {
            let query = 'update sells set status_id=' + status + ' where id = ' + sell;
            db.query(query, function (error, sells) {
                if (error) throw error;
                console.log('sell ' + sell + ' is complete');
                resolve();
            });
        });
    });
}
