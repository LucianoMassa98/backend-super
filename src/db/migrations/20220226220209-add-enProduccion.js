'use strict';

const {GalponSchema, GALPON_TABLE } = require('./../models/galpon.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(GALPON_TABLE, 'enProduccion', GalponSchema.enProduccion);

  },

  async down (queryInterface){

    await queryInterface.removeColumn(GALPON_TABLE, 'enProduccion');

  }
};
