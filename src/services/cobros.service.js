const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const CuentaService = require('./cuentas.service');
const service = new CuentaService();
class CobroService {



  async find() {
    const rta = await models.Cobro.findAll();
    if(!rta){throw boom.notFound("Cobros not found");}

    return rta;
  }

  async findOne(id) {
    const user = await models.Cobro.findByPk(id);
    if (!user) {
      throw boom.notFound('Cobro not found');
    }
    return user;
  }

  async create(data) {
    const newCobro = await models.Cobro.create(data);
    if(!newCobro){throw boom.notFound("Cobros not found");}

    const cuenta = await service.findOne(data.cuentaId);
    const  rta = await service.update(cuenta.id, {debe: cuenta.debe + data.monto});
    if(!rta){ throw boom.notFound("No se pudo sumar");}
    return rta;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);


    if(!rta){throw boom.notFound("Cobros no actualizado");}

    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
   const rta= await model.destroy();
   if(!rta){throw boom.notFound("Cobros no eliminado");}
   const cuenta = await service.findOne(model.cuentaId);
   const  rta2 = await service.update(cuenta.id, {debe: cuenta.debe - model.monto});
   if(!rta2){ throw boom.notFound("No se pudo restar");}

    return model;
  }

}

module.exports = CobroService;
