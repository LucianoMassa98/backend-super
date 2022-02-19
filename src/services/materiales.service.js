
const boom = require('@hapi/boom');
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
// falta generar codigo
const ide = this.GenerarCodigo();
const newmaterial = {
  id: ide,
  ...material
};
    // guardar en memoria principal
    this.materialespush(newmaterial);
    // falta guardar en base de datos

    return newmaterial;

  }
  //findOne
  async BuscarporID(id){

    const material =  this.materialesfind(item => item.id === id);
    // si no exoste el material
    if(!material){
      throw boom.notFound('material no existente');
    }
    // si todo esta  bien, retorno el material
      return material;

  }
  //find
  async Buscar(){

    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(this.materiales);
      },5000);
    });
  }
  async GenerarCodigo(){
    return '1.6';
  }
  //update
  async Actualizar(id,changes){

    const index =  this.materiales.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('material not found');
    }else{
      // guardar en memoria principal
      const material = this.materiales[index];
      this.materiales[index] ={
        ...material,
        ...changes
      };


      // falta actualizar en base de datos

      return this.materiales[index];
    }
  }
  //delete
  async Borrar(id){
    const index =  this.materialesfindIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Producto no encontrado');
    }else{
      //Borrar en memoria principal
      this.materiales.splice(index,1);
      //falta borrar en base de datos
      return {message: true}
    }
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
