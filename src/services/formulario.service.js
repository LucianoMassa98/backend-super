
class formularioService{

  constructor(){
      this.formularios =[];
      this.generador(area);
  }
  generador(){

    this.formularios = [
      {
      codigo: 'COD-00001',
      emision: '11/02/2022',
      recepcion: '20/02/2022',
      emisor: '1.1.5',
      receptor: ['1.1.6.1','1.1.6.1'],
      mensaje:{
              estado: 'NDP-00001',
              pagos: {
                efectivo:0,
                cuenta_corriente: 120,
                debito: 150
              },
              lp: [
                {
                  idproducto: '1.2.1',
                  cnt: 12,
                  pc: 150
                },{
                  idproducto: '1.2.2',
                  cnt: 10,
                  pc: 40
                },
                {
                  idproducto: '1.2.3',
                  cnt: 9,
                  pc: 70
                }]

             }
      },
      {
      codigo: 'COD-00002',
      emision: '11/02/2022',
      recepcion: '20/02/2022',
      emisor: '1.1.5',
      receptor: ['1.1.6.1','1.1.6.1'],
      mensaje:{
        estado: 'RMT-00001',
        lp: [
          {
            idproducto: '1.2.1',
            cnt: 12,
            pv: 150
          },{
            idproducto: '1.2.2',
            cnt: 10,
            pv: 40
          },
          {
            idproducto: '1.2.3',
            cnt: 9,
            pv: 70
          }]
       }
      },
      {
        codigo: 'COD-0003',
      emision: '11/02/2022',
      recepcion: '20/02/2022',
      emisor: '1.1.5',
      receptor: '1.1.6.1',
      mensaje:{
        estado: 'FTA-00001',
        pagos: {
          efectivo:0,
          cuenta_corriente: 120,
          debito: 150
        }
       }
      }

    ];


  }

   //create
   async Crear(oldformulario,estado){

    const codigooperacion = 'CDO-'+ (this.formularios.length()+1);
    const cantidad;
    switch(estado){
      case 'NTP': { cantidad = this.CntNTP(); break;}
      case 'RMT': { cantidad = this.CntRMT(); break;}
      case 'FTA': { cantidad = this.CntFTA(); break;}
    }
    cantidad++;
    const nuevoestado = estado + '-'+ cantidad.toString();
    const change = { mensaje:{estado: nuevoestado} };
    const newformulario= {
      id: codigooperacion,
      ...oldformulario,
      ...change
    }
    return newformulario;
  }
  async CntNTP(){
    return 1;
  }
  async CntRMT(){
    return 1;
  }
  async CntFTA(){
    return 1;
  }
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
  async Buscar(){
    return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(this.formularios);
    },5000);
  });}
  async BuscarUno(id){
    return this.formularios.find(item => item.id === id);
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
}


module.exports = {formularioService}
