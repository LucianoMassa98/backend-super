const boom = require('@hapi/boom');
const ProductoServicio = require('./producto.service');
const {models} = require('../libs/sequelize');
class RemitosEnvioService{

  constructor(){

  }

  // create
   async Crear(data){
    const newremito = await models.RemitoEnvio.create(data);
    return newremito;
  }
  async additem(data){
    const newitem = await models.EnvioProducto.create(data);
    return newitem;
  }
  async Actualizar(id,changes){
    const remito = await this.BuscarporID(id);
    const newremito = await remito.update(changes);
    return newremito;
    }
  //borra ntps por medio del id
  async Borrar(id){
    const model = await this.BuscarporID(id);
    await model.destroy();
  }

  async BuscarporID(id){
    const remito = await models.RemitoEnvio.findByPk(id,{include:['items']});
    if(!remito){
      throw boom.notFound('Remito de envio no encontrado');
    }
    return remito;

  }

  async BuscarporFecha(fecha){
    return [];
  }
  async Buscar(){

    const remitos = await models.RemitoEnvio.findAll();
    return remitos;
  }

}

module.exports = RemitosEnvioService;
