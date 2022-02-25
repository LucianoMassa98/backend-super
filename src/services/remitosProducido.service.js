const boom = require('@hapi/boom');
const ProductoServicio = require('./producto.service');
const {models} = require('../libs/sequelize');
class RemitosProducidoService{

  constructor(){

  }

  // create
   async Crear(data){
    const newproducido = await models.RemitoProducido.create(data);
    return newproducido;
  }
  async additem(data){
    const newitem = await models.ProducidoProducto.create(data);
    return newitem;
  }
  // actualiza remito de produccion
  async Actualizar(id,changes){

    const rta = await this.BuscarporID(id);
    const newremito = await rta.update(changes);

    return newremito;
    }
  //borra ntps por medio del id
  async Borrar(id){
   const remito = await this.BuscarporID(id);
   await remito.destroy();
   return {rta: true};
  }

  async BuscarporID(id){
    const remito = await models.RemitoProducido.findByPk(id,{
      include: ['items']
    });

    if(!remito){
      throw boom.notFound('Remito de producidos no encontrado');
    }

    return remito;

  }
  async BuscarporFecha(fecha){
    return [];
  }
  async Buscar(){

    const remitos = await models.RemitoProducido.findAll();
    return remitos;
  }

}

module.exports = RemitosProducidoService;
