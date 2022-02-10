
class ProductoServicio{

  constructor(){
    this.productos = [];
    this.Generador();

  }
  Generador(){
    this.productos = [
      {
        id: '1.1',
        cantidad: 'producto 1',
        precio: 100
      },
      {
        id: '1.2',
        cantidad: 'producto 2',
        precio: 1500
      },
      {
        id: '1.3',
        cantidad: 'producto 3',
        precio: 360
      },
      {
        id: '1.4',
        cantidad: 'producto 4',
        precio: 550
      },
      {
        id: '1.5',
        cantidad: 'producto 5',
        precio: 200
      }
    ];
  }
  //create
  Crear(){}
  //edit
  Editar(){}
  //find
  Buscar(){
    return this.productos;
  }
  //findOne
  BuscarUno(id){

    return this.productos.find(item => item.id === id);
  }
  //update
  Actualizar(){}
  //delete
  Borrar(){}

}

module.exports = ProductoServicio;
