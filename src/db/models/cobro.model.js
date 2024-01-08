const {Model,DataTypes, Sequelize} = require('sequelize');

const {NOTAPEDIDO_TABLE}=require('../models/notapedido.model');
const {CUENTA_TABLE}=require('../models/cuenta.model');

const COBRO_TABLE = 'cobros';

const CobroSchema  = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  notaId:{
    field: 'nota_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: NOTAPEDIDO_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  },
  cuentaId:{
    field: 'cuenta_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUENTA_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  },
  monto: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Cobro extends Model{
  // crear metodos estaticos
  static associate(models){

   this.belongsTo(models.Cuenta, {as: 'cuenta'});
   this.belongsTo(models.NotaPedido, {as: 'nota'});
  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName:  COBRO_TABLE,
      modelName: 'Cobro',
      timestamps: false
    }
  }
}
module.exports = {
  COBRO_TABLE,
  CobroSchema,
  Cobro
}
