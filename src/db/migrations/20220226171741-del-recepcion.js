'use strict';

const { NotapedidoSchema, NOTAPEDIDO_TABLE } = require('./../models/notapedido.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.removeColumn(NOTAPEDIDO_TABLE, 'recepcion_at');
  },

  async down (queryInterface){

    await queryInterface.addColumn(NOTAPEDIDO_TABLE, 'recepcion_at', NotapedidoSchema);

  }
};
