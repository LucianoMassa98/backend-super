
const express = require('express');
const router = express.Router();
const formularioService = require('../services/formulario.service');
const servicio = new formularioService('RMT');

//cliente solicita lista de formularios: RMT
router.get('/lista',async(req,res,next)=>{
  try{
    const notasdepedidos = await servicio.Buscar();
  res.json(notasdepedidos);
  }catch(error){next(error);}

});
// filtrar formularios: RMT por fecha
router.get('/FiltrarPorFecha',async (req,res,next)=>{
  try{const {fecha} = req.params;
  const notasdepedidos = await servicio.BuscarporFecha(fecha);
  res.json(notasdepedidos);
  //devolver lista de notas de pedidos filtradas por fecha
}catch(error){next(error);}
  });
//cliente solicita formulario: RMT por id
router.get('/:id', async(req,res,next)=>{
  try{
    const { id } = req.params;
  const ntp = await servicio.BuscarporID(id);
  res.json(ntp);
  }catch(error){next(error);}
});
//cliente agrega formulario: RMT
router.post('/agregar',async (req,res,next)=>{
  try{
  const body = req.body;
  const ntp = await servicio.Crear(body);
  res.json(ntp);
  }catch(error){next(error);}

});


module.exports = router;
