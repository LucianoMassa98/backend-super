const { Model, DataTypes, Sequelize } = require('sequelize');

const   REMITOENVIO_TABLE = 'remitosenvios';

const RemitoEnvioSchema = {
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
