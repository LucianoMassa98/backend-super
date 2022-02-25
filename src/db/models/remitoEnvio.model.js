const { Model, DataTypes, Sequelize } = require('sequelize');
const { GALPON_TABLE}=require('./galpon.model');
const   REMITOENVIO_TABLE = 'remitosenvios';

const RemitoEnvioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  galponId: {
    field: 'galpon_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: GALPON_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class RemitoEnvio extends Model {
  static associate(models) {
    this.belongsTo(models.Galpon, { as: 'galpon', });
    this.belongsToMany(models.producto, {
      as: 'items',
      through: models.EnvioProducto,
      foreignKey: 'envioId',
      otherKey: 'productoId'
    });

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: REMITOENVIO_TABLE,
      modelName: 'RemitoEnvio',
      timestamps: false
    }
  }
}


module.exports = { REMITOENVIO_TABLE, RemitoEnvioSchema, RemitoEnvio };
