const findStatus = require('../status/find-status');
const db = require('../database/db');
const getConfig = require('../config/get-config');

db.connect();

findStatus('waiting').then(function (waitingStatus) {
    findStatus('cancelled').then(function (cancelledStatus) {
        getConfig('sell_lifetime').then(function (sellLifetime) {
            let query = 'update sells set status_id=' + cancelledStatus
                + ' where HOUR(TIMEDIFF(NOW(), created_at)) >= ' + sellLifetime
                + ' and status_id=' + waitingStatus;

            db.query(query, function (error, results) {
                if (error) throw error;
                console.log('overwaited sells are cancelled');
                db.end();
            });
        });
    });
});
