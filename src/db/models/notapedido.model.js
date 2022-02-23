const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const NOTAPEDIDO_TABLE = 'notapedidos';

const NotapedidoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  recepcion:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'recepcion_at'
  }/*,
  estado:{
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false

  }*/
}


class NotaPedido extends Model {

  static associate(models) {
    this.belongsTo(models.Customer, { as: 'customer'});
    this.belongsToMany(models.Producto, {
      as: 'items',
      through: models.NotaProducto,
      foreignKey: 'notaId',
      otherKey: 'productoId'
    });
   /* this.hasOne(models.RemitoCompra,{
      as: 'RemitoCompra',
      foreignKey: 'notaId'
    });*/
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: NOTAPEDIDO_TABLE,
      modelName: 'Notapedido',
      timestamps: false
    }
  }
}

module.exports = { NotaPedido, NotapedidoSchema, NOTAPEDIDO_TABLE };
