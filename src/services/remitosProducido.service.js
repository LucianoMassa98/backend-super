const boom = require('@hapi/boom');
const ProductoService = require('./producto.service');
const GalponService = require('./galpon.service');
const {models} = require('../libs/sequelize');
const {Op} = require('sequelize');
class RemitosProducidoService{

  constructor(){
    this.servicio = new ProductoService();
    this.servicioGalpon = new GalponService();

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
      include: [{association: 'galpon'},'items']
    });

    if(!remito){
      throw boom.notFound('Remito de producidos no encontrado');
    }

    return remito;

  }
  async BuscarporFecha(query){

    const {fechamin ,fechamax} = query;
    console.log(fechamin);
    const ntp = await models.RemitoProducido.findAll(
    {
      where: {
        created_at: {
          [Op.gte]: fechamin,
          [Op.lte]: fechamax
        }
      },
      include: [
        {association: 'galpon'}
      ]

    }


    );
    if(!ntp){ throw boom.notFound('No hay pedidos');}
    return ntp;

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


  const producido = await this.Crear(data.producido);
  if(!producido){ throw boom.notFound('No se creo producido de pedido');}

  const items= data.items;
  if(!items){ throw boom.notFound('No hay lista de productos');}
  let sum = 0;
  const recorreArray =  arr => arr.forEach(item => {
    const producto = {
      ...item,
      producidoId: producido.id
    }
    const rta =  this.additem(producto);
     if(!rta){ throw boom.notFound('producto no agregado');}
     const rta2 = this.SumarProducto(producto.productoId, {cnt: producto.cnt});
     if(producto.nombre != "maiz"){sum = sum + producto.cnt;}

     });
   await recorreArray(items);
   await this.servicioGalpon.Restar(producido.galponId,{enProduccion: sum});

  return {rta: true};
}


}

module.exports = RemitosProducidoService;
