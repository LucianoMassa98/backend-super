const boom = require('@hapi/boom');
const ProductoService = require('./producto.service');
const {Op} = require('sequelize');

const {models} = require('../libs/sequelize');
class NotaPedidoService{


   async create(ntp){
    const rta = await models.NotaPedido.create(ntp);
    if(!rta){throw boom.notFound("Nota de Pedido not found");}

    return rta;
  }
  async addItem(data){
    const rta = await models.NotaProducto.create(data);
    if(!rta){throw boom.notFound("Nota de Pedido not found");}

    return rta;
  }

  async subItem(data){
    const notaProducto = await  models.NotaProducto.findOne({
      where:{
        notaId: data.notaId,
        productoId: data.productoId
      }
    });

    if(!notaProducto){throw boom.notFound("Producto no encontrado");}

   const rta= await notaProducto.destroy();
    if(!rta){throw boom.notFound("Nota de Pedido not found");}

    return notaProducto;
  }
  async update(id,changes){
     const model = await this.findOne(id);
    const rta = await model.update(changes);
    if(!rta){throw boom.notFound("Nota de Pedido no actualizada");}

    return rta;
    }
  async delete(id){
    const ntp = await this.findOne(id);
const rta=    await ntp.destroy();
    if(!rta){throw boom.notFound("Nota de Pedido no eliminada");}

    return ntp
  }
  async find(){

    const rta = await models.NotaPedido.findAll({
      include: [
        { association: 'user',
        include: ['customer']},

      ]
    });
    if(!rta){throw boom.notFound("Nota de Pedido not found");}

    return rta;
   }
  async findOne(id){
    const ntp = await models.NotaPedido.findByPk(id,
      {
        include: [
          {
            association: 'user',
            include: ['customer']
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
    const ntp = await models.NotaPedido.findAll({
      where: {
        estado: estado
      },
      include: [{association:'customer'}]
    });
    if(!ntp){ throw boom.notFound('No hay pedidos');}
    return ntp;
  }

  async BuscarporFecha(query){

    const {fechamin ,fechamax} = query;
    console.log(fechamin);
    const ntp = await models.NotaPedido.findAll(
    {
      where: {
        created_at: {
          [Op.gte]: fechamin,
          [Op.lte]: fechamax
        }
      },
      include: [
        {association: 'customer'}
      ]

    }


    );
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



}

module.exports = NotaPedidoService;
