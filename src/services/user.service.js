const boom = require('@hapi/boom');

//const getconexion = require('../libs/postgres');
const {models} =require('../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const newuser =await models.User.create(data);

    return newuser;

  }

  async find() {

    /*const client = await getconexion();
    const rta = await client.query('SELECT * FROM tasks');
    return rta.rows;*/

    const rta = await models.User.findAll();
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user){
      boom.notFound('usuario no encontrado');
    }
    return user;
  }

  async update(id, changes) {

    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return {id};
  }
}

module.exports = UserService;
