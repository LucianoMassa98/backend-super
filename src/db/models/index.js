
const { Category, CategorySchema } = require('./category.model');
const{Producto, ProductoSchema}=require('./producto.model');
const{Notapedido, NotapedidoSchema}=require('./notapedido.model');
const{RemitoCompra,RemitoCompraSchema}=require('./remitoCompra.model');
const{RemitoEnvio,RemitoEnvioSchema}=require('./remitoEnvio.model');
const{RemitoProduccion, RemitoProduccionSchema}=require('./remitoProduccion.model');
const{RemitoProducido, RemitoProducidoSchema}=require('./remitoProducido.model');
const { User, UserSchema } = require('./user.model');
const {Customer, CustomerSchema}=require('./customer.model');
function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema,Customer.config(sequelize));
  Category.init(CategorySchema,Category.config(sequelize));
  Producto.init(ProductoSchema, Producto.config(sequelize));
  Notapedido.init(NotapedidoSchema, Notapedido.config(sequelize));
  RemitoCompra.init(RemitoCompraSchema, RemitoCompra.config(sequelize));
  RemitoEnvio.init(RemitoEnvioSchema, RemitoEnvio.config(sequelize));
  RemitoProduccion.init(RemitoProduccionSchema, RemitoProduccion.config(sequelize));
  RemitoProducido.init(RemitoProducidoSchema, RemitoProducido.config(sequelize));



  Customer.associate(sequelize.models);
  User.associate(sequelize.models);
  Category.associate(sequelize.models);
  Producto.associate(sequelize.models);
  Notapedido.associate(sequelize.models);
}

module.exports = setupModels;
