'use strict';
const {MATERIAL_TABLE, MaterialSchema}=require('../models/material.model');
const {PRODUCTO_TABLE, ProductoSchema}=require('../models/producto.model');
/*
const {NOTAPEDIDO_TABLE, NotapedidoSchema}=require('../models/notadepedido.model');
const {REMITOCOMPRA_TABLE, RemitoCompraSchema}=require('../models/remitoCompra.model');
const {REMITOENVIO_TABLE, RemitoEnvioSchema}=require('../models/remitoEnvio.model');
const {REMITOPRODUCCION_TABLE, RemitoProduccionSchema}=require('../models/remitoProduccion.model');
const {REMITOPRODUCIDO_TABLE, RemitoProducidoSchema}=require('../models/remitoProducido.model');
*/
module.exports = {
  async up (queryInterface) {

    await queryInterface.createTable(MATERIAL_TABLE,MaterialSchema);
    await queryInterface.createTable(PRODUCTO_TABLE,ProductoSchema);
    /*
    await queryInterface.createTable(NOTAPEDIDO_TABLE,NotapedidoSchema);
    await queryInterface.createTable(REMITOCOMPRA_TABLE,RemitoCompraSchema);
    await queryInterface.createTable(REMITOENVIO_TABLE,RemitoEnvioSchema);
    await queryInterface.createTable(REMITOPRODUCCION_TABLE,RemitoProduccionSchema);
    await queryInterface.createTable(REMITOPRODUCIDO_TABLE,RemitoProducidoSchema);
    */
  },

  async down (queryInterface) {
    await queryInterface.dropTable(MATERIAL_TABLE);
    await queryInterface.dropTable(PRODUCTO_TABLE);
    /*
    await queryInterface.dropTable(NOTAPEDIDO_TABLE);
    await queryInterface.dropTable(REMITOCOMPRA_TABLE);
    await queryInterface.dropTable(REMITOENVIO_TABLE);
    await queryInterface.dropTable(REMITOPRODUCCION_TABLE);
    await queryInterface.dropTable(REMITOPRODUCIDO_TABLE);
    */
  }
};
