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

    consolidado.forEach(async element => {
      const cuenta = await service2.findOne(element.cuentaId);
      element={...element, nombre: cuenta.nombre};
    });
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

      nota.cobros.forEach( cobro => {
          const ind = this.buscarIndexCobro(cobro.cuentaId, listCobros);
          console.log("----> Aquí");
          console.log(cobro.monto);
            if(ind==-1){

              listCobros.push({cuentaId: cobro.cuentaId, monto: cobro.monto});
            }else{
              listCobros[ind].monto +=cobro.monto;
            }

      });

    });

    return listCobros;
  }

  async buscarIndexCobro(cuentaId, listCobros){
    let i =0;
    while(i<listCobros.length && cuentaId!=listCobros[i].cuentaId){i++};
    if(i<listCobros.length ){
      return i;
    }else{
      return -1;
    }

  }
}

module.exports = InformesService;
