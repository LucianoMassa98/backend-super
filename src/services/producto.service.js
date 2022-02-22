
const boom = require('@hapi/boom');
//const pool = require('../libs/postgres.pool');
const {models} =require('../libs/sequelize');

class ProductoServicio{

  constructor(){
    this.productos = [];
    this.Generador();
    /*
    this.pool = pool;
    this.pool.on('error',(err) => console.error(err));
    */
  }
  Generador(){
    this.productos = [
      {
        id: '1.1',

        nombre: 'Producto 1',
        precio: 110
      },
      {
        id: '1.2',
        nombre: 'producto 2',
        precio: 150

      },
      {
        id: '1.3',
        nombre: 'producto 3',
        precio: 360
      },
      {
        id: '1.4',
        nombre: 'producto 4',
        precio: 550
      },
      {
        id: '1.5',
        nombre: 'producto 5',
        precio: 200
      }
    ];
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
   //agregar cantidad de materiales
   async Agregar(listaProduccion){
    // agregar a base de datos
  }

  async Restar(listaProduccion){
    // restar a base de datos
  }

}

module.exports = ProductoServicio;
