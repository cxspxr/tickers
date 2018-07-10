module.exports = {
  apps : [
    {
      name      : 'tickers',
      script    : 'tickers/tickers.js',
      watch     : true,
      cron_restart : '*/30 * * * *'
    },
    {
      name      : 'rate',
      script    : 'rate/rate.js',
      watch     : true,
      cron_restart : '*/30 * * * *'
    },
    {
      name      : 'sells',
      script    : 'sells/sells.js',
      watch     : true,
      cron_restart : '*/30 * * * *'
    },
    {
      name      : 'cancellation',
      script    : 'cancellation/cancellation.js',
      watch     : true,
      cron_restart : '0 * * * *'
    },
    {
      name      : 'sell-balance',
      script    : 'sell-balance/sell-balance.js',
      watch     : true,
      cron_restart : '0 * * * *'
    }
  ]
};
