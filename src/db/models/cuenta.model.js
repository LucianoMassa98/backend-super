const { Model, DataTypes, Sequelize } = require('sequelize');

const CUENTA_TABLE = 'Cuentas';

const CuentaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  codigo: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  debe: {
    defaultValue: 0,
    type: DataTypes.DOUBLE
  },
  haber: {
    defaultValue: 0,
    type: DataTypes.DOUBLE
  }
}


class Cuenta extends Model {

  static associate(models) {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUENTA_TABLE,
      modelName: 'Cuenta',
      timestamps: false
    }
  }
}

module.exports = { Cuenta, CuentaSchema, CUENTA_TABLE };
