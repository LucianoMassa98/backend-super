const { Model, DataTypes, Sequelize } = require('sequelize');


const CAJA_TABLE = 'cajas';

const cajaSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  saldo: {
    allowNull: false,
    type: DataTypes.DOUBLE,
    defaultValue: 0
  },
  ip: {
    allowNull: false,
    type: DataTypes.STRING
  }
}

class Caja extends Model {

  static associate(models) {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CAJA_TABLE,
      modelName: 'Caja',
      timestamps: false
    }
  }
}

module.exports = { Caja, cajaSchema, CAJA_TABLE };
