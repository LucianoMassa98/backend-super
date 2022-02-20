const {Material, MaterialSchema}= require('./material.model');
const{Notapedido, NotapedidoSchema}=require('./notapedido.model');
const{Producto, ProductoSchema}=require('./producto.model');
const{RemitoCompra,RemitoCompraSchema}=require('./remitoCompra.model');
const{RemitoEnvio,RemitoEnvioSchema}=require('./remitoEnvio.model');
const{RemitoProduccion, RemitoProduccionSchema}=require('./remitoProduccion.model');
const{RemitoProducido, RemitoProducidoSchema}=require('./remitoProducido.model');
const { User, UserSchema } = require('./user.model');
function setupModels(sequelize) {
  Material.init(MaterialSchema, Material.config(sequelize));
  Notapedido.init(NotapedidoSchema, Notapedido.config(sequelize));
  Producto.init(ProductoSchema, Producto.config(sequelize));
  RemitoCompra.init(RemitoCompraSchema, RemitoCompra.config(sequelize));
  RemitoEnvio.init(RemitoEnvioSchema, RemitoEnvio.config(sequelize));
  RemitoProduccion.init(RemitoProduccionSchema, RemitoProduccion.config(sequelize));
  RemitoProducido.init(RemitoProducidoSchema, RemitoProducido.config(sequelize));

  User.init(UserSchema, User.config(sequelize));
}

module.exports = setupModels;
