const pg = require('pg')

const pool = new pg.Pool({
  user: 'node_dev',
  password: '5995',
  host: 'localhost',
  port: 5432,
  database: 'to_do_pern'
})

module.exports = pool