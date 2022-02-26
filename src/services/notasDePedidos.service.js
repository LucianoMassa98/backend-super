const boom = require('@hapi/boom');
const ProductoService = require('./producto.service');


const {models} = require('../libs/sequelize');
class NotaPedidoService{

  constructor(){
    this.servicio = new ProductoService();
  }
   async Crear(ntp){
    const newntp = await models.Notapedido.create(ntp);
    return newntp;
  }
  async additem(data){
    const newitem = await models.NotaProducto.create(data);
    return newitem;
  }
  async Actualizar(id,changes){
     const model = await this.BuscarporID(id);
    const rta = await model.update(changes);
    return rta;
    }
  async Borrar(id){
    const ntp = await this.BuscarporID(id);
    await ntp.destroy();
    return { rta: true };
  }
  async Buscar(){
    const ntps = await models.Notapedido.findAll();
    return ntps;
   }
  async BuscarporID(id){
    const ntp = await models.Notapedido.findByPk(id,
      {
        include: [
          {
            association: 'customer',
            include: ['user']
          },
          'items'
        ]
      });

    if(!ntp){
      throw boom.notFound('Nota de pedido no encontrada');
    }

    return ntp;

  }
  async BuscarporEstado(estado){
    const ntp = await models.Notapedido.findAll({
      where: {
        estado: estado
      }
    });
    if(!ntp){ throw boom.notFound('No hay pedidos');}
    return ntp;
  }
  async BuscarporFecha(fecha){
    const ntp = await models.Notapedido.findAll({
      where: {
        created_at: fecha
      }
    });
    if(!ntp){ throw boom.notFound('No hay pedidos');}
    return ntp;

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


  const nota = await this.Crear(data.nota);
  if(!nota){ throw boom.notFound('No se creo nota de pedido');}

  const items= data.items;
  if(!items){ throw boom.notFound('No hay lista de productos');}

  const recorreArray =  arr => arr.forEach(item => {
    const producto = {
      ...item,
      notaId: nota.id
    }
    const rta =  this.additem(producto);
     if(!rta){ throw boom.notFound('producto no agregado');}
     });
   await recorreArray(items);
  return {rta: true};
}

}

module.exports = NotaPedidoService;
