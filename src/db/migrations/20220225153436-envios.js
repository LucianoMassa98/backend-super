'use strict';
const {REMITOENVIO_TABLE, RemitoEnvioSchema }=require('../models/remitoEnvio.model');
const {EnvioProductoSchema, ENVIO_PRODUCTO_TABLE}=require('../models/envio-producto.model');

module.exports = {
  async up (queryInterface) {

     await queryInterface.createTable(REMITOENVIO_TABLE, RemitoEnvioSchema);
     await queryInterface.createTable(ENVIO_PRODUCTO_TABLE, EnvioProductoSchema);
  },

  async down (queryInterface) {

      await queryInterface.dropTable(REMITOENVIO_TABLE);
      await queryInterface.dropTable(ENVIO_PRODUCTO_TABLE);
  }
};
