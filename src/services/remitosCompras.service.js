const boom = require('@hapi/boom');
const ProductoService = require('./producto.service');
const {models} = require('../libs/sequelize');

class RemitosCompraService{

  constructor(){

  }

  async Crear(rmtc){
    const newrmtc = await models.RemitoCompra.create(rmtc);
    return newrmtc;
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
            association: 'customer',
            include: ['user']
          }
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



}

module.exports = RemitosCompraService;
