const express = require('express');
const router = express.Router();
const InformeServicio = require('../services/informes.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getInformeSchema} = require('../schemas/informe.schema');

const servicio = new InformeServicio();



router.get('/Z',
validatorHandler(getInformeSchema,'query'),
async (req,res,next)=>{
 try{
  const informes = await servicio.X(req.query);
  res.json(informes);
 }catch(error){next(error);}

 });





module.exports = router;
