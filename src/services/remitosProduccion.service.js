const boom = require('@hapi/boom');
const MaterialService = require('./materiales.service');
const {models} = require('../libs/sequelize');
class RemitosProduccionService{

  constructor(){

  }

  // create
   async Crear(data){
    const newremito = await models.RemitoProduccion.create(data);
    return newremito;
    }
    async additem(data){
      const newitem = await models.ProduccionProducto.create(data);
      return newitem;
    }
  // actualiza remito de produccion
  async Actualizar(id,changes){
    const model = await this.BuscarporID(id);
    const rta = await model.update(changes);
    return rta;
    }
  //borra ntps por medio del id
  async Borrar(id){
    const model = await this.BuscarporID(id);
     await model.destroy();
    return { rta: true};
  }

  async BuscarporID(id){
    const remito = await models.RemitoProduccion.findByPk(id,{
      include: ['items']
    });

    if(!remito){
      throw boom.notFound('Remito de compra no encontrado');
    }

    return remito;

  }
  async BuscarporFecha(fecha){
    return [];
  }
  async Buscar(){

    const remitos = await models.RemitoProduccion.findAll();
    return remitos;
  }

}

module.exports = RemitosProduccionService;
