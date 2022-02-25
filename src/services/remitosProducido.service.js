const boom = require('@hapi/boom');
const ProductoService = require('./producto.service');
const {models} = require('../libs/sequelize');
class RemitosProducidoService{

  constructor(){
    this.servicio = new ProductoService();
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
  async RestarProducto(id, data){
    const rta = await this.servicio.Restar(id, data);
    return rta;
}
async SumarProducto(id, data){
  const rta = await this.servicio.Sumar(id, data);
  return rta;
}
  async Finalizar(data){

    const nota = await this.create(data.nota);

    if(!nota){ throw boom.notFound('No se creo nota de pedido');}

      const array = [data.items];
    /*
    for(int i = 0; i<data.items.length(); i++){
    const additem = await this.additem(data.items[i]);
    if(!additem){ throw boom.conflict('producto no insetado');}
    const rta = awiat this.RestarProducto();
   if(rta===false){ throw boom.conflict('producto no insertado);}
    }
  */

  return {rta: true};
  }


}

module.exports = RemitosProducidoService;
