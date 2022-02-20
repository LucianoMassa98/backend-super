const { Model, DataTypes, Sequelize } = require('sequelize');

const   NOTAPEDIDO_TABLE = 'notasdepedidos';

const NotapedidoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  emisor: {
    allowNull: false,
    type: DataTypes.STRING
  },
  receptor: {
    allowNull: false,
    type: DataTypes.STRING
  },
  emision: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'emision',
    defaultValue: Sequelize.NOW
  },
  recepcion: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'recepcion'
  }
}

class Notapedido extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: NOTAPEDIDO_TABLE,
      modelName: 'notapedido',
      timestamps: false
    }
  }
}


module.exports = { NOTAPEDIDO_TABLE, NotapedidoSchema, Notapedido };
