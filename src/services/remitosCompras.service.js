const boom = require('@hapi/boom');
const ProductoService = require('./producto.service');
const {models} = require('../libs/sequelize');

class RemitosCompraService{

  constructor(){
     this.servicio = new ProductoService();
  }
  async Crear(rmtc){
    const newrmtc = await models.RemitoCompra.create(rmtc);
    return newrmtc;
  }
  async additem(data){
    const newitem = await models.CompraProducto.create(data);
    return newitem;
  }
  async mostrar(){
    const rmtcs = await models.CompraProducto.findAll();
    return rmtcs;
  }
  async additem(data){
    const newitem = await models.CompraProducto.create(data);
    return newitem;
  }
  async Actualizar(id,changes){
     const model = await this.BuscarporID(id);
    const rta = await model.update(changes);
    return rta;
    }
  async Borrar(id){
    const rmtc = await this.BuscarporID(id);
    await rmtc.destroy();
    return { rta: true };
  }
  async Buscar(){
    const rmtcs = await models.RemitoCompra.findAll();
    return rmtcs;
   }
  async BuscarporID(id){
    const rmtc = await models.RemitoCompra.findByPk(id,
      {
        include: [
          {
            association: 'customer'
          },
          'items'
        ]
      });

    if(!rmtc){
      throw boom.notFound('Nota de pedido no encontrada');
    }

    return rmtc;

  }
  async BuscarporFecha(fecha){
    const rmtcs = await models.RemitoCompra.findCreateFind(fecha);
    return rmtcs;

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

module.exports = RemitosCompraService;
