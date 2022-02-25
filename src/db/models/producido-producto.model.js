const { Model, DataTypes, Sequelize } = require('sequelize');

const { REMITOPRODUCIDO_TABLE } = require('./remitoProducido.model');
const { PRODUCTO_TABLE } = require('./producto.model');

const PRODUCIDO_PRODUCTO_TABLE = 'producidos_productos';

const ProducidoProductoSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  cnt: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  producidoId: {
    field: 'nota_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: REMITOPRODUCIDO_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  productoId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCTO_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class ProducidoProducto extends Model {

  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCIDO_PRODUCTO_TABLE,
      modelName: 'ProducidoProducto',
      timestamps: false
    }
  }
}

module.exports = { ProducidoProducto, ProducidoProductoSchema, PRODUCIDO_PRODUCTO_TABLE };
