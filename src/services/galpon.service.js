const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class GalponService {

  constructor() {}

  async find() {
    const rta = await models.Galpon.findAll();
    return rta;
  }

  async findOne(id) {
    const galpon = await models.Galpon.findByPk(id);
    if (!galpon) {
      throw boom.notFound('customer not found');
    }
    return galpon;
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

  async Sumar(id, data){

    const galpon = await this.findOne(id);

    const changes={enProduccion: galpon.enProduccion + data.enProduccion};
    const rta = await this.update(id,changes);
    return rta;
  }
  async Restar(id, changes){

    const galpon = await this.findOne(id);

    const cnt = galpon.enProduccion - changes.enProduccion;
    const rta = await this.update(id,{enProduccion: cnt});
    return rta;
  }

}

module.exports = GalponService;
