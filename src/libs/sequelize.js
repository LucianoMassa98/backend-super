console.log('Moosto');
const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');
console.log('....... aqui 1');
const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : true,
}

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}
console.log(config.dbUrl.toString());
const sequelize = new Sequelize(config.dbUrl,options);
console.log('....... aqui 2');

setupModels(sequelize);
console.log('....... aqui 3');

module.exports = sequelize;
