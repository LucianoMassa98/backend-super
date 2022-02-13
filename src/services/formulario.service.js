
class formularioService{

  constructor(tipo){
      this.formularios =[];
      this.generador(tipo);
  }
  CodigoNewFormulario(){return this.formularios.length()+1;}
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
    const id =  this.CodigoNewFormulario();
    const numero = this.CntFormulariosTotal();
    const changes= {
      id: id,
      mensaje: {
        numero
      }
    }
    const newformulario = {
      ...formulario,
      ...changes
    }
    this.formularios.push(newformulario);
    return newformulario;
  }
  //
  async Actualizar(id,changes){
    const index =  this.formularios.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Formulario no encontrado');
    }else{
      const formulario = this.formularios[index];
      this.formularios[index] ={
        ...formulario,
        ...changes
      };

      return this.formularios[index];
    }
  }
  //
  async Buscar(){
    return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(this.formularios);
    },5000);
  });}
  //
  async BuscarUno(id){
    return this.formularios.find(item => item.id === id);
  }
  //
  async BuscarporTipo(tipo){
    return this.formularios.map(item => item.tipo === tipo);
  }
  //
  async BuscarporFecha(fecha){
    return this.formularios.map(item => item.emision === fecha);
  }
  async Borrar(id){
    const index =  this.formularios.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Formulario no encontrado');
    }else{
      this.formularios.splice(index,1);
      return {message: true}
    }
  }

  async CntFormulariosTotal(){
     return this.formularios.length();
    }
  async CntPorTipo(estado){
    return this.BuscarxEstado(estado).length();
  }

}


module.exports = {formularioService}
