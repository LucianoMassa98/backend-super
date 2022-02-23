
const { Category, CategorySchema } = require('./category.model');
const{Producto, ProductoSchema}=require('./producto.model');
const{NotaPedido, NotapedidoSchema}=require('./notapedido.model');
const{RemitoCompra,RemitoCompraSchema}=require('./remitoCompra.model');
const{RemitoEnvio,RemitoEnvioSchema}=require('./remitoEnvio.model');
const{RemitoProduccion, RemitoProduccionSchema}=require('./remitoProduccion.model');
const{RemitoProducido, RemitoProducidoSchema}=require('./remitoProducido.model');
const { User, UserSchema } = require('./user.model');
const {Customer, CustomerSchema}=require('./customer.model');
const {NotaProducto, NotaProductoSchema}=require('./nota-producto.model');
const {CompraProducto, CompraProductoSchema}=require('./compra-producto.model');
function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema,Customer.config(sequelize));
  Category.init(CategorySchema,Category.config(sequelize));
  Producto.init(ProductoSchema, Producto.config(sequelize));
  NotaPedido.init(NotapedidoSchema, NotaPedido.config(sequelize));
  NotaProducto.init(NotaProductoSchema,NotaProducto.config(sequelize));
  RemitoCompra.init(RemitoCompraSchema, RemitoCompra.config(sequelize));
 // CompraProducto.init(CompraProductoSchema,CompraProducto.config(sequelize));
  RemitoEnvio.init(RemitoEnvioSchema, RemitoEnvio.config(sequelize));
  RemitoProduccion.init(RemitoProduccionSchema, RemitoProduccion.config(sequelize));
  RemitoProducido.init(RemitoProducidoSchema, RemitoProducido.config(sequelize));


  //RemitoCompra.associate(sequelize.models);
  Customer.associate(sequelize.models);
  User.associate(sequelize.models);
  Category.associate(sequelize.models);
  Producto.associate(sequelize.models);

  NotaPedido.associate(sequelize.models);


}

module.exports = setupModels;
