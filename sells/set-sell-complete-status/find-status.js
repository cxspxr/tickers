const db = require('../../database/db.js');

module.exports = function(name, callback) {
    let query = 'select id from statuses where name="' + name + '"';
    db.query(query, function (error, statuses) {
        if (error) throw error;
        console.log('status found with name ' + name);
        callback(statuses[0].id);
    });
}
