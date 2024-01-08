
const boom = require('@hapi/boom');
//const pool = require('../libs/postgres.pool');
const { models }= require('../libs/sequelize');

class ProductoServicio{

 async create(data){

  const rta = await models.Producto.create(data);
   if(!rta){throw boom.notFound("Producto not found");}

    return rta;
  }
  //findOne
  async findOne(id){

    const producto =  await models.Producto.findByPk(id);
    if(!producto){
      throw boom.notFound('producto no existente');
    }
      return producto;

  }

  async find(){


    const rta = await models.Producto.findAll();
    if(!rta){throw boom.notFound("Productos not found");}

    return rta;
  }

  async update(id,changes){

    const producto =  await this.findOne(id);
    const rta = await producto.update(changes);
    if(!rta){throw boom.notFound("Producto no actualizado");}

      return rta;
  }

  async delete(id){
    const producto = await this.findOne(id);
    const rta= await producto.destroy();
    if(!rta){throw boom.notFound("Producto no eliminado");}

    return producto;
  }



}

module.exports = ProductoServicio;
