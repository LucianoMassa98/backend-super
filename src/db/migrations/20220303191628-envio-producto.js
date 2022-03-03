'use strict';
const { EnvioProductoSchema, ENVIO_PRODUCTO_TABLE} = require('../models/envio-producto.model');

module.exports = {
  async up (queryInterface) {
    queryInterface.createTable(ENVIO_PRODUCTO_TABLE,EnvioProductoSchema);

  },

  async down (queryInterface) {
    queryInterface.dropTable(ENVIO_PRODUCTO_TABLE,EnvioProductoSchema);

  }
};
