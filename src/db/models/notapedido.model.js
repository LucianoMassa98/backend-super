const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');
const { CAJA_TABLE } = require('./caja.model');
const { CLIENTE_TABLE } = require('./cliente.model');

const NOTAPEDIDO_TABLE = 'notapedidos';

const NotapedidoSchema = {
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
  clienteId: {
    field: 'cliente_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CLIENTE_TABLE,
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
  fiscal: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  }
}


class NotaPedido extends Model {

  static associate(models) {
    this.belongsTo(models.User, { as: 'user', });
    this.belongsTo(models.Cliente, { as: 'cliente', });

    this.hasMany(models.Cobro, { as: 'cobros', foreignKey: 'notaId' });

    this.belongsToMany(models.Producto, {
      as: 'items',
      through: models.NotaProducto,
      foreignKey: 'notaId',
      otherKey: 'productoId'
    });





  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: NOTAPEDIDO_TABLE,
      modelName: 'NotaPedido',
      timestamps: false
    }
  }
}

module.exports = { NotaPedido, NotapedidoSchema, NOTAPEDIDO_TABLE };
