const { Model, DataTypes, Sequelize } = require('sequelize');

const   REMITOPRODUCCION_TABLE = 'remitosdeproduccion';

const RemitoProduccionSchema = {
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

class RemitoProduccion extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: REMITOPRODUCCION_TABLE,
      modelName: 'remitoproduccion',
      timestamps: false
    }
  }
}


module.exports = { REMITOPRODUCCION_TABLE, RemitoProduccionSchema, RemitoProduccion };
