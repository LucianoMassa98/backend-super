'use strict';
const { CAJA_TABLE } = require('../models/caja.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(CAJA_TABLE, 'ip', {type: Sequelize.STRING });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(CAJA_TABLE, 'ip');
  }
};
