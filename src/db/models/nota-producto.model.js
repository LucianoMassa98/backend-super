const { Model, DataTypes, Sequelize } = require('sequelize');

const { NOTAPEDIDO_TABLE } = require('./notapedido.model');
const { PRODUCTO_TABLE } = require('./producto.model');

const NOTA_PRODUCTO_TABLE = 'notas_productos';

const NotaProductoSchema =  {
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
  notaId: {
    field: 'nota_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: NOTAPEDIDO_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
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
    onDelete: 'CASCADE'
  }
}

class NotaProducto extends Model {

  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: NOTA_PRODUCTO_TABLE,
      modelName: 'NotaProducto',
      timestamps: false
    }
  }
}

module.exports = { NotaProducto, NotaProductoSchema, NOTA_PRODUCTO_TABLE };
