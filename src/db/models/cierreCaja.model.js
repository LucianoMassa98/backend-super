const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { CAJA_TABLE } = require('./caja.model');
const CIERRE_CAJA_TABLE = 'Cierres';

const CierreCajaSchema = {
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


class CierreCaja extends Model {

  static associate(models) {
    this.belongsTo(models.User, { as: 'user', });
    this.belongsTo(models.Caja, { as: 'caja', });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CIERRE_CAJA_TABLE,
      modelName: 'CierreCaja',
      timestamps: false
    }
  }
}

module.exports = { CierreCaja, CierreCajaSchema, CIERRE_CAJA_TABLE };
