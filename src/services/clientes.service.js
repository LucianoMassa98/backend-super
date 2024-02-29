const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ClienteService {



  async find() {
    try{
      const rta = await models.Cliente.findAll({include:['customer']});
      if(!rta){throw boom.notFound("Clientes not found");}
      return rta;
    }catch(err){ console.log(err);}


  }

  async findOne(id) {
    const user = await models.Cliente.findByPk(id);
    if (!user) {
      throw boom.notFound('Cliente not found');
    }
    return user;
  }

  async create(data) {

    const newCliente = await models.Cliente.create(data);
    if(!newCliente){throw boom.notFound("Clientes not found");}

    return newCliente;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    if(!rta){throw boom.notFound("Clientes no actualizado");}

    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
   const rta= await model.destroy();
    if(!rta){throw boom.notFound("Cliente no eliminado");}

    return model;
  }

}

module.exports = ClienteService;
