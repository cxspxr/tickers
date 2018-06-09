const fs = require('fs');

var flag = false;
const restart_interval = 60 * 60 * 1000;

setInterval(() => {
    fs.writeFile('tickers/watch-me.js', flag.toString(), (err) => {
        flag = !flag;
    });
}, restart_interval);
