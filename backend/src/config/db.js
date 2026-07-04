const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'tasklist',
  user: 'postgres',
  password: 'hjvfirf'
});

module.exports = pool;