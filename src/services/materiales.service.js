
const boom = require('@hapi/boom');
//const sequelize = require('../libs/sequelize');
const {models} =require('../libs/sequelize');
class MaterialService{

  constructor(){
    this.materiales= [];
    this.Generador();


  }
  Generador(){    this.materiales = [
      {
        id: '1.1',
        nombre: 'Carton Grande',
        precio: 110
      },
      {
        id: '1.2',
        nombre: 'Carton Chico',
        precio: 150

      },
      {
        id: '1.3',
        nombre: 'Maiz',
        precio: 360
      }
    ];
  }
  //create
   async Crear(material){

    const newmaterial = this.models.material.create(material);
    return newmaterial;
  }
  //findOne
  async BuscarporID(id){
    const material = await models.material.findByPk(id);
    if(!material){ throw boom.notFound('material no encontrado');}
    return material;
  }
  //find
  async Buscar(){

    /*
    const [data, metadata] = await sequelize.query('SELECT * FROM tasks');
    return {data,metadata};
    */

    const material = await models.material.findAll();
    return material;

  }

  //update
  async Actualizar(id,changes){

    const material = await this.BuscarporID(id);
    const rta = await material.update(changes);
    return rta;
  }
  //delete
  async Borrar(id){

    const material = await this.BuscarporID(id);
    await material.destroy();
    return id;
  }

  //agregar cantidad de materiales ya existentes
  async Agregar(listaMateriales){
    // agregar a base de datos
  }
//restar cantidad de materiales ya existentes
  async Restar(listaMateriales){
    // restar a base de datos
  }

}

module.exports = MaterialService;
