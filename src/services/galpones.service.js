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
    return this.formularios.find(item => item.id === id);
  }

  async Actualizar(id,changes){
    const index =  this.galpones.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Galpon no encontrado');
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
