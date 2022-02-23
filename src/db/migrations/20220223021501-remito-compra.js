'use strict';
const { RemitoProductoSchema, REMITOCOMPRA_TABLE}=require('../models/remitoCompra.model');
const { CompraProductoSchema, COMPRA_PRODUCTO_TABLE}=require('../models/compra-producto.model');
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(REMITOCOMPRA_TABLE,RemitoProductoSchema);
    await queryInterface.createTable(NOTA_PRODUCTO_TABLE,CompraProductoSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(REMITOCOMPRA_TABLE);
    await queryInterface.dropTable(COMPRA_PRODUCTO_TABLE);
  }
};

