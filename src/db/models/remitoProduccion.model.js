const { Model, DataTypes, Sequelize } = require('sequelize');

const   REMITOPRODUCCION_TABLE = 'remitosdeproduccion';

const RemitoProduccionSchema = {
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
