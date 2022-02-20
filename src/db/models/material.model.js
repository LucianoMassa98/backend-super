const { Model, DataTypes, Sequelize } = require('sequelize');

const   MATERIAL_TABLE = 'materiales';

const MaterialSchema = {
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
  cntProduccion: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  precio:{
    allowNull: false,
    type: DataTypes.INTEGER
  }
}

class Material extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MATERIAL_TABLE,
      modelName: 'material',
      timestamps: false
    }
  }
}


module.exports = { MATERIAL_TABLE, MaterialSchema, Material };
