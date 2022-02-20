const { Model, DataTypes, Sequelize } = require('sequelize');

const   NOTAPEDIDO_TABLE = 'notasdepedidos';

const NotapedidoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
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
