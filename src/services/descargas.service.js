const boom = require('@hapi/boom');
const {models} =require('../libs/sequelize');




class DescargasService {

  async logo(ip){
    const caja = await models.Caja.findOne({where:{ip:ip}});
    if(!caja){throw boom.notFound("Caja no encontrada");}

    const nombres = caja.nombre.split('-');
    console.log("entro");
    console.log(nombres);
    if(nombres[0]==" El Lote" || nombres[1]==" El Lote"){

      return true;
    }else{
      return false;
    }

  }

}

module.exports = DescargasService;
