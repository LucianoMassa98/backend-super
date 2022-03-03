'use strict';

const { USER_TABLE, UserSchema} = require('../models/user.model');
const { CUSTOMER_TABLE, CustomerSchema} = require('../models/customer.model');
const { CATEGORY_TABLE, CategorySchema} = require('../models/category.model');
const { PRODUCTO_TABLE, ProductoSchema} = require('../models/producto.model');
const { GalponSchema, GALPON_TABLE} = require('../models/galpon.model');
const { NotapedidoSchema, NOTAPEDIDO_TABLE} = require('../models/notapedido.model');
const { NotaProductoSchema, NOTA_PRODUCTO_TABLE } = require('../models/nota-producto.model');
const { RemitoCompraSchema, REMITOCOMPRA_TABLE } = require('../models/remitoCompra.model');
const { CompraProductoSchema, COMPRA_PRODUCTO_TABLE} = require('../models/compra-producto.model');
const {REMITOPRODUCCION_TABLE, RemitoProduccionSchema} = require('../models/remitoProduccion.model');
const { ProduccionProductoSchema, PRODUCCION_PRODUCTO_TABLE} = require('../models/produccion-producto.model');
const { REMITOPRODUCIDO_TABLE, RemitoProducidoSchema} = require('../models/remitoProducido.model');
const { ProducidoProductoSchema, PRODUCIDO_PRODUCTO_TABLE} = require('../models/producido-producto.model');
const { REMITOENVIO_TABLE, RemitoEnvioSchema} = require('../models/remitoEnvio.model');


module.exports = {
  async up (queryInterface) {
   queryInterface.createTable(USER_TABLE,UserSchema);
   queryInterface.createTable(CUSTOMER_TABLE,CustomerSchema);
   queryInterface.createTable(CATEGORY_TABLE,CategorySchema);
   queryInterface.createTable(PRODUCTO_TABLE,ProductoSchema);
   queryInterface.createTable(GALPON_TABLE,GalponSchema);
   queryInterface.createTable(NOTAPEDIDO_TABLE,NotapedidoSchema);
   queryInterface.createTable(NOTA_PRODUCTO_TABLE,NotaProductoSchema);
   queryInterface.createTable(REMITOCOMPRA_TABLE,RemitoCompraSchema);
   queryInterface.createTable(COMPRA_PRODUCTO_TABLE,CompraProductoSchema);
   queryInterface.createTable(REMITOPRODUCCION_TABLE,RemitoProduccionSchema);
   queryInterface.createTable(PRODUCCION_PRODUCTO_TABLE,ProduccionProductoSchema);
   queryInterface.createTable(REMITOPRODUCIDO_TABLE,RemitoProducidoSchema);
   queryInterface.createTable(PRODUCIDO_PRODUCTO_TABLE,ProducidoProductoSchema);
   queryInterface.createTable(REMITOENVIO_TABLE,RemitoEnvioSchema);


  },

  async down (queryInterface) {
   queryInterface.dropTable(USER_TABLE,UserSchema);
   queryInterface.dropTable(CUSTOMER_TABLE,CustomerSchema);
   queryInterface.dropTable(CATEGORY_TABLE,CategorySchema);
   queryInterface.dropTable(PRODUCTO_TABLE,ProductoSchema);
   queryInterface.dropTable(GALPON_TABLE,GalponSchema);
   queryInterface.dropTable(NOTAPEDIDO_TABLE,NotapedidoSchema);
   queryInterface.dropTable(NOTA_PRODUCTO_TABLE,NotaProductoSchema);
   queryInterface.dropTable(REMITOCOMPRA_TABLE,RemitoCompraSchema);
   queryInterface.dropTable(COMPRA_PRODUCTO_TABLE,CompraProductoSchema);
   queryInterface.dropTable(REMITOPRODUCCION_TABLE,RemitoProduccionSchema);
   queryInterface.dropTable(PRODUCCION_PRODUCTO_TABLE,ProduccionProductoSchema);
   queryInterface.dropTable(REMITOPRODUCIDO_TABLE,RemitoProducidoSchema);
   queryInterface.dropTable(PRODUCIDO_PRODUCTO_TABLE,ProducidoProductoSchema);
   queryInterface.dropTable(REMITOENVIO_TABLE,RemitoEnvioSchema);
  }
};
