const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { CAJA_TABLE } = require('./caja.model');
const MOVIMIENTO_TABLE = 'Movimientos';

const MovimientoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  cajaId: {
    field: 'caja_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CAJA_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  monto: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  ingreso: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
}


class Movimiento extends Model {

  static associate(models) {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MOVIMIENTO_TABLE,
      modelName: 'Movimiento',
      timestamps: false
    }
  }
}

module.exports = { Movimiento, MovimientoSchema, MOVIMIENTO_TABLE };
