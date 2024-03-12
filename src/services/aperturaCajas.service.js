const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const CuentaService = require('./cuentas.service');
const { Op } = require('sequelize');
const service = new CuentaService();

class AperturaCajasService {
  async create(data) {
    const rta = await models.AperturaCaja.create(data);
    if(!rta){throw boom.notFound("AperturaCaja not found");}
    const cuenta = await service.findOne(1);
    const  rta2 = await service.update(cuenta.id, {debe: cuenta.debe + data.monto});
    if(!rta2){ throw boom.notFound("No se pudo sumar");}
    return rta;
  }
  async find(query) {

    let options = { };

    const { fechaDesde, fechaHasta } = query;
    if (fechaDesde && fechaHasta) {

      let dateDesde = new Date(fechaDesde);
      let dateHasta = new Date(fechaHasta);
      dateHasta.setHours(parseInt(23, 10)); // parseInt convierte la cadena a un número
      dateHasta.setMinutes(parseInt(59, 10));


      options.where= {
        createdAt:{[Op.gte]: dateDesde,
          [Op.lte]: dateHasta}

      };
    }

    const rta = await models.AperturaCaja.findAll(options);
    if(!rta){throw boom.notFound("AperturaCaja not found");}

    return rta;
  }
  async findOne(id) {
    const user = await models.AperturaCaja.findByPk(id);
    if (!user) {
      throw boom.notFound('AperturaCaja not found');
    }
    return user;
  }
  async findLast(cajaId) {
    const AperturaCajas = await models.AperturaCaja.findAll({
      where: {
        cajaId: cajaId
      },
      order: [['createdAt', 'DESC']],
      limit: 1
    });

    if (!AperturaCajas) {
      throw boom.notFound('AperturaCaja not found');
    }
    return AperturaCajas[AperturaCajas.length-1];
  }
  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    if(!rta){throw boom.notFound("CierreCaja no actualizado");}

    return rta;
  }
  async delete(id) {
    const model = await this.findOne(id);
    const rta= await model.destroy();
    if(!rta){throw boom.notFound("AperturaCaja no eliminado");}
    const cuenta = await service.findOne(data.cuentaId);
    const  rta2 = await service.update(cuenta.id, {debe: cuenta.debe - data.monto});
    if(!rta2){ throw boom.notFound("No se pudo restar");}

    return model;
  }

}

module.exports = AperturaCajasService;
