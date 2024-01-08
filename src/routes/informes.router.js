const express = require('express');
const router = express.Router();
const InformeServicio = require('../services/informes.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getInformeSchema} = require('../schemas/informe.schema');

const servicio = new InformeServicio();



router.get('/',async (req,res,next)=>{

 try{
  const informes = await servicio.Buscar();
  res.json(informes);
 }catch(error){next(error);}


 });


router.get('/:id',
validatorHandler(getInformeSchema, 'params'),
  async(req, res,next)=>{
  try{

    const { id } = req.params;
    const informe = await servicio.BuscarporID(id);
    res.json(informe);

  }catch(error){
    next(error);
  }

});


module.exports = router;
