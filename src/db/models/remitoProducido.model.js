const { Model, DataTypes, Sequelize } = require('sequelize');
const { GALPON_TABLE}=require('./galpon.model');
const   REMITOPRODUCIDO_TABLE = 'remitosproducidos';

const RemitoProducidoSchema = {
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

class RemitoProducido extends Model {
  static associate(models) {
    this.belongsTo(models.Galpon, { as: 'galpon', });
    this.belongsToMany(models.producto, {
      as: 'items',
      through: models.ProducidoProducto,
      foreignKey: 'producidoId',
      otherKey: 'productoId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: REMITOPRODUCIDO_TABLE,
      modelName: 'RemitoProducido',
      timestamps: false
    }
  }
}


module.exports = { REMITOPRODUCIDO_TABLE, RemitoProducidoSchema, RemitoProducido };
