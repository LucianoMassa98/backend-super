
const { Category, CategorySchema } = require('./category.model');
const{Producto, ProductoSchema}=require('./producto.model');
const{NotaPedido, NotapedidoSchema}=require('./notapedido.model');
const{RemitoCompra,RemitoCompraSchema}=require('./remitoCompra.model');
const{RemitoEnvio,RemitoEnvioSchema}=require('./remitoEnvio.model');
const{RemitoProducidoSchema, RemitoProducido }=require('./remitoProducido.model');
const { User, UserSchema } = require('./user.model');
const {Customer, CustomerSchema}=require('./customer.model');
const {NotaProducto, NotaProductoSchema}=require('./nota-producto.model');
const {CompraProducto, CompraProductoSchema}=require('./compra-producto.model');
const { Galpon, GalponSchema}=require('./galpon.model');
const {RemitoProduccionSchema, RemitoProduccion }=require('./remitoProduccion.model');
const {ProduccionProductoSchema, ProduccionProducto }=require('./produccion-producto.model');
const {ProducidoProducto, ProducidoProductoSchema}=require('./producido-producto.model');
const { EnvioProducto, EnvioProductoSchema}=require('./envio-producto.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema,Customer.config(sequelize));
  Category.init(CategorySchema,Category.config(sequelize));
  Producto.init(ProductoSchema, Producto.config(sequelize));
  NotaPedido.init(NotapedidoSchema, NotaPedido.config(sequelize));
  NotaProducto.init(NotaProductoSchema,NotaProducto.config(sequelize));
  RemitoCompra.init(RemitoCompraSchema, RemitoCompra.config(sequelize));
  CompraProducto.init(CompraProductoSchema,CompraProducto.config(sequelize));
  Galpon.init(GalponSchema,Galpon.config(sequelize));
  RemitoProduccion.init(RemitoProduccionSchema,RemitoProduccion.config(sequelize));
  ProduccionProducto.init(ProduccionProductoSchema,ProduccionProducto.config(sequelize));
  RemitoProducido.init(RemitoProducidoSchema, RemitoProducido.config(sequelize));
  ProducidoProducto.init(ProducidoProductoSchema,ProducidoProducto.config(sequelize));
  RemitoEnvio.init(RemitoEnvioSchema, RemitoEnvio.config(sequelize));
  EnvioProducto.init(EnvioProductoSchema,EnvioProducto.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Producto.associate(sequelize.models);
  NotaPedido.associate(sequelize.models);
  RemitoCompra.associate(sequelize.models);
  Galpon.associate(sequelize.models);
  RemitoProduccion.associate(sequelize.models);
  RemitoProducido.associate(sequelize.models);
  RemitoEnvio.associate(sequelize.models);

}

module.exports = setupModels;
