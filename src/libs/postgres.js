const {Client} = require('pg');


// obtener el cliente
async function getconexion(){

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'admin',
  password: 'admin123',
  database: 'my_store'
});

await client.connect();
return client;
}


module.exports = getconexion;
