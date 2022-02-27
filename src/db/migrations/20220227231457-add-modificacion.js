'use strict';

const { RemitoCompraSchema, REMITOCOMPRA_TABLE } = require('./../models/remitoCompra.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(REMITOCOMPRA_TABLE, 'modificacion', RemitoCompraSchema.modificacion);

  },

  async down (queryInterface){

    await queryInterface.removeColumn(REMITOCOMPRA_TABLE, 'modificacion');

  }
};
