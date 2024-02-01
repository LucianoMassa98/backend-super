const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const CuentaService = require('./cuentas.service');
const { Op } = require('sequelize');

const service = new CuentaService();
class MovimientoService {



  async find(query) {

    const options = {
     /* include:[{
        model: models.User, // Modelo Cliente
        as: 'user', // Alias 'cliente'
        include: ['customer'], // Incluir el perfil del cliente
      }]*/
    };

    const { fechaDesde, fechaHasta } = query;
    if (fechaDesde && fechaHasta) {

      let dateDesde = new Date(fechaDesde);
      let dateHasta = new Date(fechaHasta);
      dateHasta.setHours(parseInt(23, 10)); // parseInt convierte la cadena a un número
      dateHasta.setMinutes(parseInt(59, 10));


      options.where.createdAt = {
        [Op.gte]: dateDesde,
        [Op.lte]: dateHasta,
      };
    }

    const rta = await models.Movimiento.findAll(options);
    if(!rta){throw boom.notFound("Movimiento not found");}

    return rta;
  }

  async findOne(id) {
    const user = await models.Movimiento.findByPk(id);
    if (!user) {
      throw boom.notFound('Movimiento not found');
    }
    return user;
  }
  async findLastClose(cajaId) {
    const movimientos = await models.Movimiento.findAll({
      where: {
        cajaId: cajaId,
        ingreso: false
      },
      order: [['createdAt', 'DESC']],
      limit: 1
    });

    if (!movimientos) {
      throw boom.notFound('Movimiento not found');
    }
    return movimientos[movimientos.length-1];
  }
  async findLastOpen(cajaId) {
    const movimientos = await models.Movimiento.findAll({
      where: {
        cajaId: cajaId,
        ingreso: true
      },
      order: [['createdAt', 'DESC']],
      limit: 1
    });

    if (!movimientos) {
      throw boom.notFound('Movimiento not found');
    }
    return movimientos[movimientos.length-1];
  }

  async create(data) {
    const rta = await models.Movimiento.create(data);
    if(!rta){throw boom.notFound("Movimiento not found");}
    const cuenta = await service.findOne(1);
    const {ingreso} =data;
    if(ingreso==false){
      const  rta2 = await service.update(cuenta.id, {haber: cuenta.haber + data.monto});
      if(!rta2){ throw boom.notFound("No se pudo sumar");}
    }else{
      const  rta2 = await service.update(cuenta.id, {debe: cuenta.debe + data.monto});
      if(!rta2){ throw boom.notFound("No se pudo sumar");}
    }

    return rta;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    if(!rta){throw boom.notFound("Movimiento no actualizado");}

    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    const rta= await model.destroy();
    if(!rta){throw boom.notFound("Movimiento no eliminado");}
    const cuenta = await service.findOne(data.cuentaId);
    const  rta2 = await service.update(cuenta.id, {debe: cuenta.debe - data.monto});
    if(!rta2){ throw boom.notFound("No se pudo restar");}

    return model;
  }

}

module.exports = MovimientoService;
