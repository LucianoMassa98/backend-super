const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { CAJA_TABLE } = require('./caja.model');
const APERTURA_CAJA_TABLE = 'Aperturas';

const AperturaCajaSchema = {
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
    onDelete: 'CASCADE'
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
    onDelete: 'CASCADE'
  },
  monto: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  diferencia: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
}


class AperturaCaja extends Model {

  static associate(models) {
    this.belongsTo(models.User, { as: 'user', });
    this.belongsTo(models.Caja, { as: 'caja', });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: APERTURA_CAJA_TABLE,
      modelName: 'AperturaCaja',
      timestamps: false
    }
  }
}

module.exports = { AperturaCaja, AperturaCajaSchema, APERTURA_CAJA_TABLE };
