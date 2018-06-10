module.exports = {
  apps : [
    {
      name      : 'tickers',
      script    : 'tickers/tickers.js',
      watch     : true,
      cron_restart : '0 * * * *'
    },
    {
      name      : 'rate',
      script    : 'rate/rate.js',
      watch     : true,
      cron_restart : '*/30 * * * *'
    }
  ]
};
