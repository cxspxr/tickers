const db = require('../database/db');

module.exports = (name) => {
    return new Promise((resolve) => {
        let query = 'select id from statuses where name="' + name + '"';
        db.query(query, (error, statuses) => {
            if (error) throw error;
            console.log('status found with name ' + name);
            resolve(statuses[0].id);
        });
    });
}
