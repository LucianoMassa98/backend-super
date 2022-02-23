const { Model, DataTypes, Sequelize } = require('sequelize');

const { REMITOCOMPRA_TABLE } = require('./notapedido.model');
const { PRODUCTO_TABLE } = require('./producto.model');

const COMPRA_PRODUCTO_TABLE = 'compras_productos';

const CompraProductoSchema =  {
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
  precio:{
    allowNull: false,
    type: DataTypes.INTEGER
  },
  compraId: {
    field: 'compra_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: REMITOCOMPRA_TABLE,
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

class CompraProducto extends Model {

  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COMPRA_PRODUCTO_TABLE,
      modelName: 'CompraProducto',
      timestamps: false
    }
  }
}

module.exports = { CompraProducto, CompraProductoSchema, COMPRA_PRODUCTO_TABLE };
