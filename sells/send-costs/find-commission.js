const db = require('../../database/db.js');

module.exports = (user, earnedCosts, callback) => {
    let query = 'select commission from users where id=' + user;
    db.query(query, (error, users) => {
        if (error) throw error;
        //check for personal commission
        if (users[0].commission) {
            console.log('commission ' + users[0].commission + ' found for user ' + user);
            callback(users[0].commision);
        }
        // if none exists then grab common commission
        else {
            let query = 'select commission from commissions where commissions.from < ' + earnedCosts + ' order by commissions.from desc limit 1';

            db.query(query, (error, commissions) => {
                if (error) throw error;
                console.log('commission ' + commissions[0].commission + ' found for amount ' + earnedCosts);
                callback(commissions[0].commission);
            });
        }
    });
}
