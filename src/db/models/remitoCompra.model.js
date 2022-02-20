const { Model, DataTypes, Sequelize } = require('sequelize');

const   REMITOCOMPRA_TABLE = 'remitosdecompras';

const RemitoCompraSchema = {
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
    type: DataTypes.ARRAY
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

class RemitoCompra extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: REMITOCOMPRA_TABLE,
      modelName: 'remitocompra',
      timestamps: false
    }
  }
}


module.exports = { REMITOCOMPRA_TABLE, RemitoCompraSchema, RemitoCompra };
