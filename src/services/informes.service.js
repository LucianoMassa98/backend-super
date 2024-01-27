const boom = require('@hapi/boom');

const NotaPedidoService = require('./notasDePedidos.service');
const service = new NotaPedidoService();
const CuentasService = require('./cuentas.service');
const service2 = new CuentasService();
class InformesService {


  async Z(query) {

    const notasFiltradas= await this.filtrarNotas(query);

    const consolidado= await this.consolidarCobros(notasFiltradas);
    if(consolidado.length<1){throw boom.notFound("No hay consolidado");}


    for(let i =0; i<consolidado.length;i++){
      const cuenta = await service2.findOne(consolidado[i].cuentaId);
      consolidado[i]={...consolidado[i], nombre: cuenta.nombre};
    }
    return consolidado;
  }

  async filtrarNotas(query){
    const rta = await service.find({...query, cobros: true, items:true});
    if(!rta){throw boom.notFound("No hay Ventas realizadas");}
    return rta;
  }
  async consolidarCobros(notas){
    let listCobros=[];
    notas.forEach( nota => {

      nota.cobros.forEach( async cobro => {

          let i =0;
          while(i<listCobros.length && cobro.cuentaId!=listCobros[i].cuentaId){i++};
          if(i<listCobros.length ){
            listCobros[i].monto +=cobro.monto;
          }else{
            listCobros.push({cuentaId: cobro.cuentaId, monto: cobro.monto});

          }

      });

    });


    return listCobros;
  }

  async buscarIndexCobro(cuentaId, listCobros){


  }
}

module.exports = InformesService;
