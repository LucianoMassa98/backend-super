const { Model, DataTypes, Sequelize } = require('sequelize');

const   REMITOPRODUCIDO_TABLE = 'remitosproducidos';

const RemitoProducidoSchema = {
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
