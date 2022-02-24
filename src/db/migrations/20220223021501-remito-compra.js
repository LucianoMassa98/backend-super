'use strict';
const {  REMITOCOMPRA_TABLE, RemitoCompraSchema }=require('../models/remitoCompra.model');
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(REMITOCOMPRA_TABLE,RemitoCompraSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(REMITOCOMPRA_TABLE);
    }
};

