const boom = require('@hapi/boom');
const ProductoService = require('./producto.service');
const NotaPedidoService = require('./notasDePedidos.service');
const {models} = require('../libs/sequelize');
const sequelize = require('../libs/sequelize');

class RemitosCompraService{

  constructor(){
     this.servicio = new ProductoService();
     this.servicioPedido = new NotaPedidoService();
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
  // falta buscar por fecha
  async BuscarporFecha(data){

    const x = new Date(data.fecha);
    const ntp = await models.RemitoCompra.findAll(
    {
      where: {
        created_at: x
      }
    }
    ,
    {
      include: [
        {association:'customer'}
      ]
    }
    );
    if(!ntp){ throw boom.notFound('No hay pedidos');}
    return ntp;

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

  const nta = await this.servicioPedido.BuscarporID(data.notaid)
  if(!nta){throw boom.notFound('Nota de pedido no existente');}
  const compra = await this.Crear(data.compra);
  if(!compra){ throw boom.notFound('No se creo compra de pedido');}

  const items= data.items;
  if(!items){ throw boom.notFound('No hay lista de productos');}

  const recorreArray =  arr => arr.forEach(item => {
    const producto = {
      ...item,
      compraId: compra.id
    }
    const rta =  this.additem(producto);
     if(!rta){ throw boom.notFound('producto no agregado');}

     const rta2 = this.SumarProducto(producto.productoId, {cnt: producto.cnt});

     });


   await recorreArray(items);
// cambia el estado a true para la nota de pedido recibida en produccion
   await this.servicioPedido.Actualizar(compra.notaid, {estado: true});
  return {rta: true};
}


}

module.exports = RemitosCompraService;
