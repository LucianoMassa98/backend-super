const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'mysql',
  logging: true,
});

// carga los modelos de la base de datos
setupModels(sequelize);
sequelize.sync();
/*empieza a leer los modelos, crea tablas y hace relist
 (se sobrescribe información),
  no se aconseja que se corra en producción.
  Es mejor sincronizar con un sistema de migraciones. */


module.exports = sequelize;
