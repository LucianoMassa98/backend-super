const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');
const { NOTAPEDIDO_TABLE } = require('./notapedido.model');



const   REMITOCOMPRA_TABLE = 'remitosdecompras';

const RemitoCompraSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
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
  notaId: {
    field: 'nota_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: NOTAPEDIDO_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  }
}

class RemitoCompra extends Model {
  static associate(models) {
    this.belongsTo(models.Notapedido, { as: 'notapedido' });
    this.belongsTo(models.Customer, { as: 'customer' });
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


module.exports = { REMITOCOMPRA_TABLE, RemitoCompraSchema, RemitoCompra };
