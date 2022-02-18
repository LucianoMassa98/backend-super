
const boom = require('@hapi/boom');
class ProductoServicio{

  constructor(){
    this.productos = [];
    this.Generador();


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
// falta generar codigo
const ide = this.GenerarCodigo();
const newproduct = {
  id: ide,
  ...producto
};
    // guardar en memoria principal
    this.productos.push(newproduct);
    // falta guardar en base de datos

    return newproduct;

  }

  //findOne
  async BuscarporID(id){

    const producto =  this.productos.find(item => item.id === id);
    // si no exoste el producto
    if(!producto){
      throw boom.notFound('producto no existente');
    }
    // si todo esta  bien, retorno el producto
      return producto;

  }
  //find
  async Buscar(){

    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(this.productos);
      },5000);
    });
  }
  async GenerarCodigo(){
    return '1.6';
  }
  //update
  async Actualizar(id,changes){

    const index =  this.productos.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('producto not found');
    }else{
      // guardar en memoria principal
      const producto = this.productos[index];
      this.productos[index] ={
        ...producto,
        ...changes
      };


      // falta actualizar en base de datos

      return this.productos[index];
    }
  }
  //delete
  async Borrar(id){

    const index =  this.productos.findIndex(item => item.id === id);


    if(index === -1){
      throw boom.notFound('Producto no encontrado');
    }else{
      //Borrar en memoria principal
      this.productos.splice(index,1);
      //falta borrar en base de datos
      return {message: true}
    }
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
