const { Model, DataTypes, Sequelize } = require('sequelize');

const   PRODUCTO_TABLE = 'productos';

const ProductoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  cntStock: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  precio:{
    allowNull: false,
    type: DataTypes.INTEGER
  }

}

class Producto extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTO_TABLE,
      modelName: 'producto',
      timestamps: false
    }
  }
}


module.exports = { PRODUCTO_TABLE, ProductoSchema, Producto };
