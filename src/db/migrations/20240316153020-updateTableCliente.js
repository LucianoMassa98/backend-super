'use strict';
const { CLIENTE_TABLE, ClienteSchema } = require('../models/cliente.model');

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn(CLIENTE_TABLE, 'IVA',{
      type: Sequelize.STRING
    } );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
