
const boom = require('@hapi/boom');
class formularioService{

  constructor(tipo){
      this.formularios =[];
      this.generador(tipo);
  }
  // genera espacio en la memoria principal del servidor
  generador(tipo){
    this.formularios = [
      {
      id: 1,
      tipo: 'NTP',
      emision: '11/02/2022',
      recepcion: '20/02/2022',
      emisor: '1.1.5',
      receptor: ['1.1.6.1','1.1.6.1'],
      mensaje:{
              numero: 1,
              pagos: {
                efectivo:0,
                cuenta_corriente: 120,
                debito: 150
              },
              lp:[{},{}]
             }
      },
      {
        id: 2,
      tipo: 'GLP',
      emision: '11/02/2022',
      recepcion: '20/02/2022',
      emisor: '1.1.5',
      receptor: ['1.1.6.1'],
      mensaje:{
              lp:[{},{}]
             }
      }

    ];
  }
   //create
   async Crear(formulario){
   //verificar schema de entrada de formulario
    if(!formulario){throw boom.conflict('formulario no aceptado');}
    const id =  this.CodigoNewFormulario();
    const numero = this.CntFormulariosTotal();
    const changes= {
      id: id,
      mensaje: {
        numero:numero
      }
    }
    const newformulario = {
      ...formulario,
      ...changes
    }
    this.formularios.push(newformulario);
    // falta guardar en base de datos
    return newformulario;
  }
  // actualiza formularios
  async Actualizar(id,changes){
    const index =  this.formularios.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Formulario no encontrado');
    }else{
      const formulario = this.formularios[index];
      this.formularios[index] ={
        ...formulario,
        ...changes
      };

      return this.formularios[index];
    }
  }
  // devuelv list completa de formularios de memoria principal
  async Buscar(){
    return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(this.formularios);
    },5000);
  });}
  //busca formulario por id
  async BuscarUno(id){
    const formulario = this.formularios.find(item => item.id === id);

    if(!formulario){
      throw boom.notFound('Formulario not found');
    }

    return formulario;
  }
  //busca formularios por tipos
  async BuscarporTipo(tipo){
    const newformularios =  this.formularios.map(item => item.tipo === tipo);
    if(!newformularios){ throw boom.notFound('formularios no encontrados');}

    return newformularios;
  }
  //busca formularios por fecha
  async BuscarporFecha(fecha){
    const newformularios =  this.formularios.map(item => item.emision === fecha);

    if(newformularios){ throw boom.notFound('formularios no encontrados');}
    return newformularios;

  }
  //borra formularios por medio del id
  async Borrar(id){
    const index =  this.formularios.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Formulario no encontrado');
    }else{
      this.formularios.splice(index,1);
      return {message: true}
    }
  }
  // retorna cantidad de formularios en memoria principal
  async CntFormulariosTotal(){
     return this.formularios.length();
    }
    // falta retornar una cantidad de formularios por cada tipo
  async CntPorTipo(){

  }
   // crea un nuevo codigo por cada formulario
   CodigoNewFormulario(){
    return this.formularios.length()+1;
  }

}


module.exports = formularioService;
