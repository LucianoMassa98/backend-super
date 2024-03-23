const {Model,DataTypes, Sequelize} = require('sequelize');

const {CUSTOMER_TABLE}=require('../models/customer.model');

const CLIENTE_TABLE = 'clientes';
const ClienteSchema  = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId:{
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'

  },
  IVA:{
    allowNull: false,
    type: DataTypes.STRING
  },
  cuit:{
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

class Cliente extends Model{
  // crear metodos estaticos
  static associate(models){

    //this.hasMany(models.NotaPedido, {as: 'ventas', foreignKey: 'clienteId'});

    this.belongsTo(models.Customer, {as: 'customer'});


  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName:  CLIENTE_TABLE,
      modelName: 'Cliente',
      timestamps: false
    }
  }
}
module.exports = {
  CLIENTE_TABLE,
  ClienteSchema,
  Cliente
}
