const boom = require('@hapi/boom');
class galponeService{

  constructor(){
    this.galpones = [];
    this.Generador();
  }

  async Generador(){

    this.galpones = [
      {
        id: 'produccion',
        mp: [
          {
            cod: '1.1.6.1',
            cnt: 1000
          }
        ]
      },
      {
        id: 'azul',
        mp: [
          {
            cod: '1.1.6.1',
            cnt: 500
          }
        ]
     },
     {
      id: 'amarillo',
      mp: [
        {
          cod: '1.1.6.1',
          cnt: 400
        }
      ]
   },
   {
    id: 'rojo',
    mp: [
      {
        cod: '1.1.6.1',
        cnt: 600
      }
    ]
 },
 {
  id: 'verde',
  mp: [
    {
      cod: '1.1.6.1',
      cnt: 300
    }
  ]
}



    ];
  }
  async Buscar(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(this.galpones);
      },5000);
    });
  }
  async BuscarUno(id){
    const galpon =  this.formularios.find(item => item.id === id);

    if(!galpon){ throw boom.notFound('galpon no encontrado');}

    return galpon;
  }

  async Actualizar(id,changes){
    const index =  this.galpones.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Galpon no encontrado');
    }else{
      const galpon = this.galpones[index];
      this.galpones[index] ={
        ...galpon,
        ...changes
      };

      return this.formularios[index];
    }
  }



}
module.exports = galponeService;
