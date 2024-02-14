const { Model, DataTypes, Sequelize } = require('sequelize');

const   PRODUCTO_TABLE = 'Productos';

const ProductoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  codigo: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
  },
  codBarra: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,

  },
  descripcion: {
    allowNull: false,
    type: DataTypes.STRING,

  },
  precio:{
    allowNull: false,
    type: DataTypes.DOUBLE
  },
  impuesto:{
    allowNull: false,
    type: DataTypes.DOUBLE
  },
  rubro: {
    allowNull: false,
    type: DataTypes.STRING
  },
  marca: {
    allowNull: false,
    type: DataTypes.STRING
  },


}

class Producto extends Model {
  static associate(models) {

  }


  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTO_TABLE,
      modelName: 'Producto',
      timestamps: false
    }
  }
}


module.exports = {
  PRODUCTO_TABLE,
  ProductoSchema,
  Producto };
