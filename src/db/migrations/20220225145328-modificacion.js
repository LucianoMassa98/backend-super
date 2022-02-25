'use strict';

const { ProducidoProductoSchema, PRODUCIDO_PRODUCTO_TABLE } = require('./../models/producido-producto.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.removeColumn(PRODUCIDO_PRODUCTO_TABLE, 'precio');
  },

  async down (queryInterface){

    await queryInterface.addColumn(PRODUCIDO_PRODUCTO_TABLE, 'precio', ProducidoProductoSchema.role);

  }
};
