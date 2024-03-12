

const{Producto, ProductoSchema}=require('./producto.model');

const{NotaPedido, NotapedidoSchema}=require('./notapedido.model');
const { User, UserSchema } = require('./user.model');
const { Cliente, ClienteSchema } = require('./cliente.model');

const {Customer, CustomerSchema}=require('./customer.model');
const {Caja, cajaSchema}=require('./caja.model');
const {Cobro, CobroSchema}=require('./cobro.model');
const {Cuenta, CuentaSchema}=require('./cuenta.model');
const {Movimiento, MovimientoSchema}=require('./movimiento.model');

const {NotaProducto, NotaProductoSchema}=require('./nota-producto.model');

const {AperturaCaja, AperturaCajaSchema}=require('./aperturaCaja.model');
const {CierreCaja, CierreCajaSchema}=require('./cierreCaja.model');


function setupModels(sequelize) {
  Customer.init(CustomerSchema,Customer.config(sequelize));
  Cuenta.init(CuentaSchema,Cuenta.config(sequelize));

  User.init(UserSchema, User.config(sequelize));
  Movimiento.init(MovimientoSchema,Movimiento.config(sequelize));

  Cliente.init(ClienteSchema, Cliente.config(sequelize));
  Caja.init(cajaSchema,Caja.config(sequelize));
  Producto.init(ProductoSchema, Producto.config(sequelize));

  NotaPedido.init(NotapedidoSchema, NotaPedido.config(sequelize));
  NotaProducto.init(NotaProductoSchema,NotaProducto.config(sequelize));
  Cobro.init(CobroSchema,Cobro.config(sequelize));

  AperturaCaja.init(AperturaCajaSchema,AperturaCaja.config(sequelize));
  CierreCaja.init(CierreCajaSchema,CierreCaja.config(sequelize));

  //---------------

  Customer.associate(sequelize.models);
  Cuenta.associate(sequelize.models);

  User.associate(sequelize.models);
  Cliente.associate(sequelize.models);
  Movimiento.associate(sequelize.models);

  Caja.associate(sequelize.models);
  Producto.associate(sequelize.models);
  NotaPedido.associate(sequelize.models);
  NotaProducto.associate(sequelize.models);
  Cobro.associate(sequelize.models);

  AperturaCaja.associate(sequelize.models);
  CierreCaja.associate(sequelize.models);

}

module.exports = setupModels;
