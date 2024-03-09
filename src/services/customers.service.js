const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {

  async find() {
    const rta = await models.Customer.findAll();
    if(!rta){throw boom.notFound("Customer not found");}

    return rta;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  async create(data) {
    const rta = await models.Customer.create(data);
    if(!rta){throw boom.notFound("Customer not found");}

    return rta;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    if(!rta){throw boom.notFound("Customer no actualizado");}

    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
   const rta= await model.destroy();
    if(!rta){throw boom.notFound("Customer no eliminado");}

    return model;
  }

}

module.exports = CustomerService;
