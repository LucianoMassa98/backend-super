'use strict';
const { NotaProductoSchema, NOTA_PRODUCTO_TABLE}=require('../models/nota-producto.model');
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(NOTA_PRODUCTO_TABLE,NotaProductoSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(NOTA_PRODUCTO_TABLE);
  }
};

