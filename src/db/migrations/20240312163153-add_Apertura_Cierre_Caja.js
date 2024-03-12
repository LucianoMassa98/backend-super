'use strict';
const { APERTURA_CAJA_TABLE, AperturaCajaSchema } = require('../models/aperturaCaja.model');
const { CIERRE_CAJA_TABLE, CierreCajaSchema } = require('../models/cierreCaja.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(APERTURA_CAJA_TABLE, AperturaCajaSchema);
    await queryInterface.createTable(CIERRE_CAJA_TABLE, CierreCajaSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CIERRE_CAJA_TABLE);
    await queryInterface.dropTable(APERTURA_CAJA_TABLE);
  }
};
