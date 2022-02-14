

class ProductoServicio{

  constructor(){
    this.productos = [];
    this.Generador();

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
 async Crear(data,tipo){
/*
    switch(tipo){
      case 'PRD':
      // escribir archivo productos
      break;
      case 'MTP':
      // escribir archivo materia prima
      break;
      case 'MCD':
      // escribir archivo mercaderia
      break;
    }

    if(this.BuscarporBarra(data.codigo)!={}){
      throw  new Error('Producto ya existente');
    }else{

    }*/
    const ide = await this.GenerarCodigo(tipo);
    const newproduct = {
      id: ide,
      ...data
    };
    this.productos.push(newproduct);
    return newproduct;

  }
  //edit
  async Editar(){}

  //findOne
  async BuscarporID(id){
    return this.productos.find(item => item.id === id);
  }
  async BuscarporBarra(barra){
    return this.productos.find(item => item.codigo === barra);

  }
  //find
  async Buscar(){
    // leer los 3 archivos
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(this.productos);
      },5000);
    });
  }
  async BuscarporTipo(tipo){

    switch(tipo){
      case 'PRD':
      // leer archivo productos
      break;
      case 'MTP':
      // leer archivo materia prima
      break;
      case 'MCD':
      // leer archivo mercaderia
      break;
      case 'STK':
      //leer los 3 archivos
      break;
    }
  }
  async GenerarCodigo(tipo){

    //return (await this.BuscarporTipo(tipo)).length();
    return "1.6";
  }
  //update
  async Actualizar(id,changes,tipo){

    switch(tipo){
      case 'PRD':
      // escribir archivo productos
      break;
      case 'MTP':
      // escribir archivo materia prima
      break;
      case 'MCD':
      // escribir archivo mercaderia
      break;
    }
    const index =  this.productos.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Producto no encontrado');
    }else{
      const producto = this.productos[index];
      this.productos[index] ={
        ...producto,
        ...changes
      };

      return this.productos[index];
    }
  }
  //delete
  async Borrar(id,tipo){
    /*
    switch(tipo){
      case 'PRD':
      // borrar de archivo productos
      break;
      case 'MTP':
      // borrar de  archivo materia prima
      break;
      case 'MCD':
      // Borrar de archivo mercaderia
      break;
    }*/
    const index =  this.productos.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Producto no encontrado');
    }else{
      this.productos.splice(index,1);
      return {message: true}
    }
  }

}

module.exports = ProductoServicio;
