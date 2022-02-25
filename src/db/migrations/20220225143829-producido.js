'use strict';
const {REMITOPRODUCIDO_TABLE, RemitoProducidoSchema }=require('../models/remitoProducido.model');
const {ProducidoProductoSchema, PRODUCIDO_PRODUCTO_TABLE}=require('../models/producido-producto.model');

module.exports = {
  async up (queryInterface) {

     await queryInterface.createTable(REMITOPRODUCIDO_TABLE, RemitoProducidoSchema);
     await queryInterface.createTable(PRODUCIDO_PRODUCTO_TABLE, ProducidoProductoSchema);
  },

  async down (queryInterface) {

      await queryInterface.dropTable(REMITOPRODUCIDO_TABLE);
      await queryInterface.dropTable(PRODUCIDO_PRODUCTO_TABLE);
  }
};
