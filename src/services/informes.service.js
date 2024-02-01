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

  async consolidarProductos(notas){
    let list=[];
    notas.forEach( nota => {

      nota.items.forEach( async item => {

          let i =0;
          while(i<list.length && item.id!=list[i].id){i++};

          if(i<list.length ){
            list[i].NotaProducto.precio += item.NotaProducto.precio;
            list[i].NotaProducto.cnt += item.NotaProducto.cnt;
          }else{
            list.push(item);
          }

      });

    });


    return list;
  }
  async consolidado(query){
    const notasFiltradas= await this.filtrarNotas(query);
    console.log(notasFiltradas);
    const consolidado= await this.consolidarProductos(notasFiltradas);
    if(consolidado.length<1){throw boom.notFound("No hay consolidado");}

    return consolidado;
  }

}

module.exports = InformesService;
