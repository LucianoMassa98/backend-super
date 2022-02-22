const { Model, DataTypes, Sequelize } = require('sequelize');
const {CUSTOMER_TABLE} = require('./customer.model');
const   NOTAPEDIDO_TABLE = 'notapedidos';

const NotapedidoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  emision: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'emision',
    defaultValue: Sequelize.NOW,
  },
  receptorId:{
    field: 'receptor_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  recepcion: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'recepcion'
  }
}

class Notapedido extends Model {
  static associate(models) {
   this.belongsTo(models.Customer,{ as: 'customers'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: NOTAPEDIDO_TABLE,
      modelName: 'Notapedido',
      timestamps: false
    }
  }
}


module.exports = { NOTAPEDIDO_TABLE, NotapedidoSchema, Notapedido };
