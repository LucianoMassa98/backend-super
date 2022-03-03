const boom = require('@hapi/boom');
const ProductoService = require('./producto.service');
const GalponService = require('./galpon.service');

const {models} = require('../libs/sequelize');
const {Op} = require('sequelize');
class RemitosProduccionService{

  constructor(){
    this.servicio = new ProductoService();
    this.servicioGalpon = new GalponService();

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
      include: [{association: 'galpon'},'items']
    });

    if(!remito){
      throw boom.notFound('Remito de compra no encontrado');
    }

    return remito;

  }
  async BuscarporFecha(query){

    const {fechamin ,fechamax} = query;
    console.log(fechamin);
    const ntp = await models.RemitoProduccion.findAll(
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

    const remitos = await models.RemitoProduccion.findAll();
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


  const produccion = await this.Crear(data.produccion);
  if(!produccion){ throw boom.notFound('No se creo produccion de pedido');}

  const items= data.items;
  if(!items){ throw boom.notFound('No hay lista de productos');}
let sum = 0;
  const recorreArray =  arr => arr.forEach(item => {
    const producto = {
      ...item,
      produccionId: produccion.id
    }
    const rta =  this.additem(producto);
     if(!rta){ throw boom.notFound('producto no agregado');}
     const rta2 = this.RestarProducto(producto.productoId, {cnt: producto.cnt});

     if(producto.productoId  === 3){}else{sum = sum + producto.cnt;}

      console.log(sum);
     });
   await recorreArray(items);
   this.servicioGalpon.Sumar(produccion.galponId,{enProduccion: sum});

  return {rta: true};
}

}

module.exports = RemitosProduccionService;
