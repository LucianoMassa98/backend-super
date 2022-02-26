'use strict';

const { NotapedidoSchema, NOTAPEDIDO_TABLE } = require('./../models/notapedido.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(NOTAPEDIDO_TABLE, 'estado', NotapedidoSchema.estado);

  },

  async down (queryInterface){

    await queryInterface.removeColumn(NOTAPEDIDO_TABLE, 'estado');

  }
};
