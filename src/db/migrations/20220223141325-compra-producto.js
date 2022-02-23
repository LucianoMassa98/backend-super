'use strict';

const {  CompraProductoSchema, COMPRA_PRODUCTO_TABLE }=require('../models/compra-producto.model');
module.exports = {
  async up (queryInterface) {

    await queryInterface.createTable(COMPRA_PRODUCTO_TABLE,CompraProductoSchema);
  },

  async down (queryInterface) {

    await queryInterface.dropTable(COMPRA_PRODUCTO_TABLE);
  }
};
