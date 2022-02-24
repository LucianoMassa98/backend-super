const { Model, DataTypes, Sequelize } = require('sequelize');
const { GALPON_TABLE}=require('./galpon.model');
const   REMITOPRODUCCION_TABLE = 'remitosdeproduccion';

const RemitoProduccionSchema = {
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

class RemitoProduccion extends Model {
  static associate(models) {
    this.belongsTo(models.Galpon, { as: 'galpon', });
    this.belongsToMany(models.producto, {
      as: 'items',
      through: models.ProduccionProducto,
      foreignKey: 'produccionId',
      otherKey: 'productoId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: REMITOPRODUCCION_TABLE,
      modelName: 'RemitoProduccion',
      timestamps: false
    }
  }
}


module.exports = { REMITOPRODUCCION_TABLE, RemitoProduccionSchema, RemitoProduccion };