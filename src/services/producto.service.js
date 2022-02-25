
const boom = require('@hapi/boom');
//const pool = require('../libs/postgres.pool');
const {models} =require('../libs/sequelize');

class ProductoServicio{

  constructor(){

  }

  //create
 async Crear(producto){
   const newproduct = await models.producto.create(producto);
    return newproduct;
  }
  //findOne
  async BuscarporID(id){

    const producto =  await models.producto.findByPk(id);
    if(!producto){
      throw boom.notFound('producto no existente');
    }
      return producto;

  }
  //find
  async Buscar(){
    /*
    conectarse con un pool
    const query = 'SELECT * FROM tasks';
    const rta = await this.pool.query(query);
    return rta.rows;*/

    // consulta utilizando orm sequelize
    const rta = await models.producto.findAll({
      include: ['category']
    });
    return rta;
  }
  //update
  async Actualizar(id,changes){

    const producto =  await this.BuscarporID(id);
    const rta = await producto.update(changes);
      return rta;
  }
  //delete
  async Borrar(id){
    const producto = await this.BuscarporID(id);
    await producto.destroy();
    return id;
  }
 // sumar a la cantidad de los productos
   async Sumar(id,data){
    const producto = await this.BuscarporID(id);
    const changes={cnt:producto.cnt + data.cnt };
    await this.Actualizar(id,changes);
    return {rta: true};

  }
  async Restar(id, data){
    const producto = await this.BuscarporID(id);
    const changes={cnt:producto.cnt - data.cnt };
    await this.Actualizar(id,changes);
    return {rta: true};
  }


}

module.exports = ProductoServicio;
