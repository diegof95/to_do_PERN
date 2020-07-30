const pg = require('pg')

const pool = pg.Pool({
  user: 'delta',
  password: '',
  host: 'localhost',
  port: 5432,
  database: 'to_do_pern'
})

module.exports = pool