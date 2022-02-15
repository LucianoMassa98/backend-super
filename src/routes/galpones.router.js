const express = require('express');
const router = express.Router();
const galponeService = require('../services/galpones.service');
const servicio = new galponeService();

// lista de galpones
router.get('/Lista',async (req,res,next)=>{

  try{
    const listagalpones = await servicio.Buscar();
    res.json(listagalpones);

  }catch(error){next(error);}

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
router.get('/Galpon/:id',async(req,res,next)=>{
try{const {id} = req.params;
const galpon = await servicio.BuscarUno(id);
res.json(galpon);
}catch(error){next(error);}
});

//agregar a galponID el materialID
router.post('/Agregar',async(req,res,next)=>{
  try{
    const body = req.body;
    const galpon = await servicio.Crear(body);
    res.json(galpon);
  }catch(error){next(error);}

});

//cliente actualizacion parcial
router.patch('/Modificar/:id',async(req,res,next)=>{
  try{
  const {id} = req.params;
  const body =  req.body;
  const producto = await servicio.Actualizar(id,body);
  res.json(producto);
  }catch(error){
    next(error);
  }
});



module.exports = router;
