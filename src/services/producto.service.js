
const boom = require('@hapi/boom');
class ProductoServicio{

  constructor(tipo){
    this.productos = [];
    this.tipo = tipo;



  }
  Generador(){
    this.productos = [
      {
        id: '1.1',
        codigo:'123213214',
        nombre: 'producto 1',
        precio: 100,
        venta: 150
      },
      {
        id: '1.2',
        codigo:'123213214',
        nombre: 'producto 2',
        precio: 1500,
        venta: 150
      },
      {
        id: '1.3',
        codigo:'123213214',
        nombre: 'producto 3',
        precio: 360,
        venta: 150
      },
      {
        id: '1.4',
        codigo:'123213214',
        nombre: 'producto 4',
        precio: 550,
        venta: 150
      },
      {
        id: '1.5',
        codigo:'123213214',
        nombre: 'producto 5',
        precio: 200,
        venta: 150
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
  switch(this.tipo){
    case 'PRD':
    //falta verificar esquema de creacion de Producto
    if(!producto){}
    //verificar datos de entrada de productos
    if(this.BuscarporBarra(producto.codigo)){
      throw boom.conflict('producto ya existente');
        }
    break;
    case 'MTP':
    //falta verificar esquema de creacion de Materia prima
    if(!producto){}
    //verificar datos de entrada de materia prima
    if(this.BuscarporID(producto.id)){
      throw boom.conflict('producto ya existente');
        }
        // Fatla Guardar en base de datos
    break;
    case 'MCD':
    //falta verificar esquema de creacion de Mercaderia
    if(!producto){}
    //verificar datos de entrada de materia prima
    if(this.BuscarporBarra(producto.id)){
      throw boom.conflict('producto ya existente');
        }
    break;
  }
    // guardar en memoria principal
    this.productos.push(newproduct);
    // guardar en base de datos
    this.Guardar(newproduct);
    return newproduct;

  }
  //edit
  async Editar(){}
  //Guardar en Base de datos producto,material o mercaderia nueva;
  async Guardar(producto){
    switch(this.tipo){
      case 'PRD':
       // Fatla Guardar en base de datos
      break;
      case 'MTP':
      // Fatla Guardar en base de datos
      break;
      case 'MCD':
       // Fatla Guardar en base de datos
      break;
    }
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
  async BuscarporBarra(barra){

    if(tipo!= 'MTP'){
      throw boom.notFound('Producto tipo: Materia Prima');
    }
    const producto= this.productos.find(item => item.codigo === barra);

    if(!producto){
      throw boom.notFound('Producto no encontrado');
    }
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

}

module.exports = ProductoServicio;
