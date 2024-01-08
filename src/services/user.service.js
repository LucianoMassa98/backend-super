const boom = require('@hapi/boom');

//const getconexion = require('../libs/postgres');
const {models} =require('../libs/sequelize');

class UserService {


  async create(data) {
    const rta =await models.User.create(data);
    if(!rta){throw boom.notFound("User not found");}

    return rta;

  }

  async find() {

    const rta = await models.User.findAll({
      include: 'customer'
    });
    if(!rta){throw boom.notFound("User not found");}

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
    if(!rta){throw boom.notFound("User no actualizado");}

    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    const rta=await user.destroy();
    if(!rta){throw boom.notFound("User no eliminado");}

    return user;
  }

  async login(data){
    const user = await models.User.findOne({where: {
      userName: data.userName,
      password: data.password
    }});

    if(!user){ throw boom.notFound("usuario y/o contraseña incorrectos");}

    return user;
  }
}

module.exports = UserService;
