const { Model, DataTypes, Sequelize } = require('sequelize');

const { REMITOENVIO_TABLE } = require('./remitoEnvio.model');
const { PRODUCTO_TABLE } = require('./producto.model');

const ENVIO_PRODUCTO_TABLE = 'envios_productos';

const EnvioProductoSchema =  {
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
  envioId: {
    field: 'envio_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: REMITOENVIO_TABLE,
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

class EnvioProducto extends Model {

  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ENVIO_PRODUCTO_TABLE,
      modelName: 'EnvioProducto',
      timestamps: false
    }
  }
}

module.exports = { EnvioProducto, EnvioProductoSchema, ENVIO_PRODUCTO_TABLE };
