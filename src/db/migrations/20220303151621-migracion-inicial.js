'use strict';

const { USER_TABLE, UserSchema } = require('../models/user.model');
const { CLIENTE_TABLE, ClienteSchema } = require('../models/cliente.model');
const { CUSTOMER_TABLE, CustomerSchema } = require('../models/customer.model');
const { CAJA_TABLE, cajaSchema } = require('../models/caja.model');
const { COBRO_TABLE, CobroSchema } = require('../models/cobro.model');
const { MOVIMIENTO_TABLE, MovimientoSchema } = require('../models/movimiento.model');
const { CUENTA_TABLE, CuentaSchema } = require('../models/cuenta.model');



const { PRODUCTO_TABLE, ProductoSchema } = require('../models/producto.model');
const {
  NotapedidoSchema,
  NOTAPEDIDO_TABLE,
} = require('../models/notapedido.model');
const {
  NotaProductoSchema,
  NOTA_PRODUCTO_TABLE,
} = require('../models/nota-producto.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CLIENTE_TABLE, ClienteSchema);
    await queryInterface.createTable(CUENTA_TABLE, CuentaSchema);
    await queryInterface.createTable(CAJA_TABLE, cajaSchema);
    await queryInterface.createTable(PRODUCTO_TABLE, ProductoSchema);

    await queryInterface.createTable(NOTAPEDIDO_TABLE, NotapedidoSchema);
    await queryInterface.createTable(NOTA_PRODUCTO_TABLE, NotaProductoSchema);
    await queryInterface.createTable(COBRO_TABLE, CobroSchema);
    await queryInterface.createTable(MOVIMIENTO_TABLE, MovimientoSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(MOVIMIENTO_TABLE);
    await queryInterface.dropTable(COBRO_TABLE);
    await queryInterface.dropTable(NOTA_PRODUCTO_TABLE);
    await queryInterface.dropTable(NOTAPEDIDO_TABLE);
   await queryInterface.dropTable(PRODUCTO_TABLE);
    await queryInterface.dropTable(CAJA_TABLE);
    await queryInterface.dropTable(CUENTA_TABLE);
    await queryInterface.dropTable(CLIENTE_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
