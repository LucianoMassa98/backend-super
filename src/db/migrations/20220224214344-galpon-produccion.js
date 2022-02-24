'use strict';
const {GalponSchema, GALPON_TABLE }=require('../models/galpon.model');
const {REMITOPRODUCCION_TABLE, RemitoProduccionSchema }=require('../models/remitoProduccion.model');

module.exports = {
  async up (queryInterface) {

     await queryInterface.createTable(GALPON_TABLE, GalponSchema);
     await queryInterface.createTable(REMITOPRODUCCION_TABLE, RemitoProduccionSchema);

  },

  async down (queryInterface) {

      await queryInterface.dropTable(GALPON_TABLE);
      await queryInterface.dropTable(REMITOPRODUCCION_TABLE);

  }
};
