'use strict';
const {NOTAPEDIDO_TABLE, NotapedidoSchema}=require('../models/notapedido.model');
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(NOTAPEDIDO_TABLE,NotapedidoSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(NOTAPEDIDO_TABLE);
  }
};
