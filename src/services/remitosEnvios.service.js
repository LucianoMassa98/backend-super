const boom = require('@hapi/boom');
const ProductoService = require('./producto.service');
const {models} = require('../libs/sequelize');
class RemitosEnvioService{

  constructor(){
    this.servicio = new ProductoService();
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
  // resta cnt de la tabla Prodcutos
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

module.exports = RemitosEnvioService;
