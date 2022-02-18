const express = require('express');
const router = express.Router();
const RemitosProduccionService =require('../services/remitosProduccion.service');
const servicio = new RemitosProduccionService();

//cliente solicita lista de formularios: RMT
router.get('/lista',async(req,res,next)=>{
  try{
    const remitosproduccion = await servicio.Buscar();
  res.json(remitosproduccion);
  }catch(error){next(error);}

});
// filtrar formularios: RMT por fecha
router.get('/FiltrarPorFecha',async (req,res,next)=>{
  try{const {fecha} = req.params;
  const remitosproduccion = await servicio.BuscarporFecha(fecha);
  res.json(remitosproduccion);
  //devolver lista de notas de pedidos filtradas por fecha
}catch(error){next(error);}
  });
//cliente solicita formulario: RMT por id
router.get('/BuscarporID/:id', async(req,res,next)=>{
  try{
    const { id } = req.params;
  const rmtEnP = await servicio.BuscarporID(id);
  res.json(rmtEnP);
  }catch(error){next(error);}
});
//cliente agrega formulario: RMT
router.post('/Crear',async (req,res,next)=>{
  try{
  const body = req.body;
  const rmtEnP = await servicio.Crear(body);
  res.json(rmtEnP);
  }catch(error){next(error);}

});


module.exports = router;
