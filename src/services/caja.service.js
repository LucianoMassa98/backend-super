const boom = require('@hapi/boom');

const { models }= require('../libs/sequelize');

class CajaService {


  async create(data) {
    const newCaja = await models.Caja.create(data);
    if(!newCaja){throw boom.notFound("No se pudo crear la caja");}
    return newCaja;
  }

  async find() {
    const Cajas = await models.Caja.findAll();
    if(!Cajas){throw boom.notFound("Cajas not found");}

    return Cajas;
  }

  async findOne(ip) {
    const Caja = await models.Caja.findOne({where:{ip:ip}});
    if(!Caja){ throw boom.notFound('Caja no encontrada');}
    return Caja;
  }

  async update(id, changes) {
    const caja = await this.findOne(id);
    const newCaja = await caja.update(changes);
    if(!newCaja){ throw boom.notFound('Caja no actualizada');}
    return newCaja;
  }

  async delete(id) {
    const caja = await this.findOne(id);
    const newCaja = await caja.delete();
    if(!newCaja){ throw boom.notFound('Caja no eliminada');}
    return caja;
  }

}

module.exports = CajaService;
