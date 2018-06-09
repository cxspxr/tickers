const fs = require('fs');

var flag = false;
const restart_interval = 60 * 60 * 1000;

setInterval(() => {
    fs.writeFile('.restart', flag.toString(), function () {
        flag = !flag;
    });
}, restart_interval);
