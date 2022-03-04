'use strict';
const { ProducidoProductoSchema, PRODUCIDO_PRODUCTO_TABLE} = require('../models/producido-producto.model');

module.exports = {
  async up (queryInterface) {
    queryInterface.createTable(PRODUCIDO_PRODUCTO_TABLE,ProducidoProductoSchema);

  },

  async down (queryInterface) {
    queryInterface.dropTable(PRODUCIDO_PRODUCTO_TABLE,ProducidoProductoSchema);

  }
};
