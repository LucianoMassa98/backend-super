const boom = require('@hapi/boom');
const ProductoService = require('./producto.service');
const { Op } = require('sequelize');

const { models } = require('../libs/sequelize');
class NotaPedidoService {
  async create(ntp) {
    const veri = this.verificarNTP(ntp);
    if (veri) {
      const rta = await models.NotaPedido.create({
        userId: ntp.userId,
        cajaId: ntp.cajaId,
        clienteId: ntp.clienteId,
      });
      if (!rta) {
        throw boom.notFound('Nota de Pedido not found');
      }
      ntp.productos.forEach(async (product) => {
        await models.NotaProducto.create({ ...product, notaId: rta.id });
      });

      ntp.cobros.forEach(async (cobro) => {
        await models.Cobro.create({ ...cobro, notaId: rta.id });
      });
      return rta;
    } else {
      throw boom.notFound(
        'Los cobros no coinciden con el importe total de la Nota'
      );
    }
  }
  verificarNTP(ntp) {
    let sumP = 0;
    ntp.productos.forEach((product) => {
      sumP += product.cnt * product.precio;
    });
    let sumC = 0;
    ntp.cobros.forEach((cobro) => {
      sumC += cobro.monto;
    });
    if (sumP == sumC) {
      return true;
    } else {
      return false;
    }
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

    const { fechaDesde, fechaHasta } = query;
    if (fechaDesde && fechaHasta) {
      let dateDesde = new Date(fechaDesde);
      let dateHasta = new Date(fechaHasta);
      dateHasta.setHours(parseInt(23, 10)); // parseInt convierte la cadena a un número
      dateHasta.setMinutes(parseInt(59, 10));

      whereConditions.createdAt = {
        [Op.gte]: dateDesde,
        [Op.lte]: dateHasta,
      };
    }

    // todas las notas de una caja en particular
    const { cajaId } = query;
    if (cajaId) {
      whereConditions.cajaId = cajaId;
    }
    // todas las notas de un user en particular
    const { userId } = query;
    if (userId) {
      whereConditions.userId = userId;
    }

    const include = [];
    const { user } = query;
    if (user) {
      include.push({ association: 'user', include: ['customer'] });
    }

    const { cliente } = query;
    if (cliente) {
      include.push({ association: 'cliente', include: ['customer'] });
    }
    const { cobros } = query;
    if (cobros) {
      include.push({ association: 'cobros', include: ['cuenta'] });
    }
    const { items } = query;
    if (items) {
      include.push('items');
    }

    const notasPedido = await models.NotaPedido.findAll({
      where: whereConditions,
      include,
    });

    if (!notasPedido) {
      throw boom.notFound('Nota de Pedido not found');
    }
    return notasPedido;
  }

  async findOne(id) {
    const ntp = await models.NotaPedido.findByPk(id, {
      include: [
        {
          association: 'user',
          include: ['customer'],
        },
        'items',
        'cobros',
      ],
    });

    if (!ntp) {
      throw boom.notFound('Nota de pedido no encontrada');
    }

    return ntp;
  }
}

module.exports = NotaPedidoService;
