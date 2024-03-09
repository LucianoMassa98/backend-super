const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CuentaService {

  async generar(){
    const cuentas = [
      {codigo: "1.1.1", nombre:"Efectivo"},
      {codigo: "1.1.2", nombre:"Mercado Pago"},
      {codigo: "1.1.3", nombre:"Cuenta Corriente"},
      {codigo: "1.1.4", nombre:"Debito"},
      {codigo: "1.1.5", nombre:"Credito"},
    ];

    await cuentas.forEach(async (item) => {
        await this.create(item);
     });

    return true;
  }

  async find() {
    const rta = await models.Cuenta.findAll();
    if(!rta){throw boom.notFound("Cuenta not found");}

    return rta;
  }

  async findOne(id) {
    const user = await models.Cuenta.findByPk(id);
    if (!user) {
      throw boom.notFound('Cuenta not found');
    }
    return user;
  }

  async create(data) {

    const rta = await models.Cuenta.create(data);
    if(!rta){throw boom.notFound("cuenta not found");}

    return rta;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    if(!rta){throw boom.notFound("cuenta not found");}

    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    const rta=await model.destroy();
    if(!rta){throw boom.notFound("cuenta not found");}

    return model;
  }


}

module.exports = CuentaService;
