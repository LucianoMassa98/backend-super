const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class GalponService {

  constructor() {}

  async find() {
    const rta = await models.Galpon.findAll();
    return rta;
  }

  async findOne(id) {
    const user = await models.Galpon.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  async create(data) {

    const newgalpon = await models.Galpon.create(data);
    return newgalpon;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = GalponService;
