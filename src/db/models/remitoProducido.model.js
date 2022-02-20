const { Model, DataTypes, Sequelize } = require('sequelize');

const   REMITOPRODUCIDO_TABLE = 'remitosproducidos';

const RemitoProducidoSchema = {
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

class RemitoProducido extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: REMITOPRODUCIDO_TABLE,
      modelName: 'remitoproducido',
      timestamps: false
    }
  }
}


module.exports = { REMITOPRODUCIDO_TABLE, RemitoProducidoSchema, RemitoProducido };
