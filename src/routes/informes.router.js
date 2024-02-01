const express = require('express');
const router = express.Router();
const InformeServicio = require('../services/informes.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getInformeSchema,queryZ} = require('../schemas/informe.schema');

const servicio = new InformeServicio();



router.get('/Z',
validatorHandler(queryZ,'query'),
async (req,res,next)=>{
 try{
  const informes = await servicio.Z(req.query);
  res.json(informes);
 }catch(error){next(error);}

 });

 router.get('/Consolidado',
 validatorHandler(queryZ,'query'),
 async (req,res,next)=>{
  try{
   const informes = await servicio.consolidado(req.query);
   res.json(informes);
  }catch(error){next(error);}

  });



module.exports = router;
