const { Model, DataTypes, Sequelize } = require('sequelize');

const   REMITOENVIO_TABLE = 'remitosenvios';

const RemitoEnvioSchema = {
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

class RemitoEnvio extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: REMITOENVIO_TABLE,
      modelName: 'remitoenvio',
      timestamps: false
    }
  }
}


module.exports = { REMITOENVIO_TABLE, RemitoEnvioSchema, RemitoEnvio };
