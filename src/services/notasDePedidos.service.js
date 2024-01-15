const boom = require('@hapi/boom');
const ProductoService = require('./producto.service');
const { Op } = require('sequelize');

const { models } = require('../libs/sequelize');
class NotaPedidoService {
  async create(ntp) {
    const rta = await models.NotaPedido.create(ntp);
    if (!rta) {
      throw boom.notFound('Nota de Pedido not found');
    }

    return rta;
  }
  async createTotal(ntp) {
    const rta = await models.NotaPedido.create({ userId: ntp.userId,cajaId: ntp.cajaId,  clienteId: ntp.clienteId});
    if (!rta) {
      throw boom.notFound('Nota de Pedido not found');
    }
    rta.productos.forEach(async product => {
       await models.NotaProducto.create({...product, notaId: rta.id});
      });

      rta.cobros.forEach(async cobro => {
        await models.Cobro.create({...cobro, notaId: rta.id});
       });


    return rta;
  }
  async addItem(data) {
    const rta = await models.NotaProducto.create(data);
    if (!rta) {
      throw boom.notFound('Nota de Pedido not found');
    }

    return rta;
  }

  async subItem(data) {
    const notaProducto = await models.NotaProducto.findOne({
      where: {
        notaId: data.notaId,
        productoId: data.productoId,
      },
    });

    if (!notaProducto) {
      throw boom.notFound('Producto no encontrado');
    }

    const rta = await notaProducto.destroy();
    if (!rta) {
      throw boom.notFound('Nota de Pedido not found');
    }

    return notaProducto;
  }
  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    if (!rta) {
      throw boom.notFound('Nota de Pedido no actualizada');
    }

    return rta;
  }
  async delete(id) {
    const ntp = await this.findOne(id);
    const rta = await ntp.destroy();
    if (!rta) {
      throw boom.notFound('Nota de Pedido no eliminada');
    }

    return ntp;
  }
  async find(query) {

      const whereConditions = {};

      const {fechaDesde, fechaHasta}=query;
      if (fechaDesde && fechaHasta) {
        whereConditions.createdAt = {
          [Op.gte]: fechaDesde,
          [Op.lte]: fechaHasta,
        };
      }


      const {cajaId}=query;
      if (cajaId) {
        whereConditions.cajaId = cajaId;
      }
      const include=[];
      const {perfil}= query;
      if (perfil) {
        include.push({ association: 'user', include: ['customer']});
      }

try{
  const notasPedido = await models.NotaPedido.findAll();

  if(!notasPedido){throw boom.notFound("Nota de Pedido not found");}
  return notasPedido;
}catch(err){console.log("--------> "+err); return {};}




  }
  async findOne(id) {
    const ntp = await models.NotaPedido.findByPk(id, {
      include: [
        {
          association: 'user',
          include: ['customer'],
        },
        'items',
      ],
    });

    if (!ntp) {
      throw boom.notFound('Nota de pedido no encontrada');
    }

    return ntp;
  }
  async BuscarporEstado(estado) {
    const ntp = await models.NotaPedido.findAll({
      where: {
        estado: estado,
      },
      include: [{ association: 'customer' }],
    });
    if (!ntp) {
      throw boom.notFound('No hay pedidos');
    }
    return ntp;
  }

  async BuscarporFecha(query) {
    const { fechamin, fechamax } = query;
    console.log(fechamin);
    const ntp = await models.NotaPedido.findAll({
      where: {
        created_at: {
          [Op.gte]: fechamin,
          [Op.lte]: fechamax,
        },
      },
      include: [{ association: 'customer' }],
    });
    if (!ntp) {
      throw boom.notFound('No hay pedidos');
    }
    return ntp;
  }


}

module.exports = NotaPedidoService;
