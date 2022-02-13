const express = require('express');
const router = express.Router();
const galponeService = require('../services/galpones.service');
const servicio = new galponeService();

// lista de galpones
router.get('/',async (req,res)=>{

  const listagalpones = await servicio.Buscar();
  res.json(listagalpones);

});

// obtener query galpones
router.get('/',async(req,res)=>{
  const {limit , offset} = req.query;
  if(limit && offset){
    res.json(
      {
     //envio de json
    }
      );
  }else{
    res.send('no hay parametros');
  }
});
//galpon por id
router.get('/:id',async(req,res)=>{
const {id} = req.params;
//enviar galpon
const galpon = await servicio.BuscarUno(id);
res.json(galpon);

});

//agregar a galponID el materialID
router.post('/',async(req,res)=>{
  const body = req.body;
});

//cliente actualizacion parcial
router.patch('/ModificaParcial/:id',async(req,res)=>{
  try{
  const {id} = req.params;
  const body =  req.body;
  const producto = await servicio.Actualizar(id,body);
  res.json(producto);
  }catch(error){
    res.json({
      message: error.message
    });
  }
});



module.exports = router;
