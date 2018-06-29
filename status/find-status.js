const db = require('../database/db');

module.exports = function(name) {
    return new Promise(function (resolve) {
        let query = 'select id from statuses where name="' + name + '"';
        db.query(query, function (error, statuses) {
            if (error) throw error;
            console.log('status found with name ' + name);
            resolve(statuses[0].id);
        });
    });
}
