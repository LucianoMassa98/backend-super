const {Pool} = require('pg');
// utilizamos una misma conexion para el cliente
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'admin',
  password: 'admin123',
  database: 'my_store'
});
pool.connect();
module.exports = pool;
