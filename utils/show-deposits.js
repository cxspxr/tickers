const bfx = require('../bitfinex/rest');

bfx.movements().then(movements => {
    console.log(movements);
});
