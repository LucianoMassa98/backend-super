const express = require('express');
const router = express.Router();
const CajaServicio = require('../services/caja.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createCajaSchema, updateCajaSchema, getCajaSchema} = require('../schemas/caja.schema');

const servicio = new CajaServicio();



router.get('/',async (req,res,next)=>{

 try{
  const Cajas = await servicio.find();
  res.json(Cajas);
 }catch(error){next(error);}


 });


router.get('/:ip',
validatorHandler(getCajaSchema, 'params'),
  async(req, res,next)=>{
  try{

    const { ip } = req.params;
    const producto = await servicio.findOne(ip);
    res.json(producto);

  }catch(error){
    next(error);
  }

});


router.post('/',
validatorHandler(createCajaSchema,'body'),
  async(req,res,next)=>{
  try{
    const body = req.body;
    const newproduct = await servicio.create(body);

    res.json(newproduct);

  }catch(error){ next(error);}

  });



router.patch('/:id',
validatorHandler(updateCajaSchema,'body'),
  async(req,res,next)=>{
  try{
  const {id} = req.params;
  const body =  req.body;
  const producto = await servicio.update(id,body);
  res.json(producto);
  }catch(error){
    next(error);
  }
});



router.delete('/:id',
  validatorHandler(getCajaSchema,'params'),
async(req,res,next)=>{
  try{
  const {id} = req.params;
  const band = await servicio.delete(id);
  res.json(band);
}catch(error){
  next(error);
}
});

module.exports = router;
