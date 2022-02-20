const { Model, DataTypes, Sequelize } = require('sequelize');

const   REMITOCOMPRA_TABLE = 'remitosdecompras';

const RemitoCompraSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class RemitoCompra extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: REMITOCOMPRA_TABLE,
      modelName: 'remitocompra',
      timestamps: false
    }
  }
}


module.exports = { REMITOCOMPRA_TABLE, RemitoCompraSchema, RemitoCompra };
