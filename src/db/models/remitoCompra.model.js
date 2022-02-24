const { Model, DataTypes, Sequelize } = require('sequelize');
const {CUSTOMER_TABLE}=require('./customer.model');
const REMITOCOMPRA_TABLE = 'RemitosDeCompras';

const RemitoCompraSchema = {
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
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  numero:{
    allowNull: false,
    type: DataTypes.INTEGER
  },
  notaid:{
    allowNull: false,
    type: DataTypes.INTEGER
  }


}


class RemitoCompra extends Model {

  static associate(models) {
    this.belongsTo(models.Customer, { as: 'customer', });
    this.belongsToMany(models.producto, {
      as: 'items',
      through: models.CompraProducto,
      foreignKey: 'compraId',
      otherKey: 'productoId'
    });

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: REMITOCOMPRA_TABLE,
      modelName: 'RemitoCompra',
      timestamps: false
    }
  }
}

module.exports = { RemitoCompra, RemitoCompraSchema, REMITOCOMPRA_TABLE };
