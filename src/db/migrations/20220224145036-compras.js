'use strict';
const { RemitoCompraSchema, REMITOCOMPRA_TABLE}=require('../models/remitoCompra.model');
module.exports = {
  async up (queryInterface) {

     await queryInterface.createTable(REMITOCOMPRA_TABLE, RemitoCompraSchema);

  },

  async down (queryInterface) {

      await queryInterface.dropTable(REMITOCOMPRA_TABLE);

  }
};
