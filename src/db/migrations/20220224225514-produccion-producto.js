'use strict';
const {ProduccionProductoSchema, PRODUCCION_PRODUCTO_TABLE }=require('../models/produccion-producto.model');

module.exports = {
  async up (queryInterface) {

     await queryInterface.createTable(PRODUCCION_PRODUCTO_TABLE, ProduccionProductoSchema);

  },

  async down (queryInterface) {

      await queryInterface.dropTable(PRODUCCION_PRODUCTO_TABLE);

  }
};
