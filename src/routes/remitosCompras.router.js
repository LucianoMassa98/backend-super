const express = require('express');
const router = express.Router();
const RemitosCompraService =require('../services/remitosCompras.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createRemito,getRemito,filtrarFechaRemito} = require('../schemas/remito.schema');

const servicio = new RemitosCompraService();

//cliente solicita lista de formularios: RMT
router.get('/lista',async(req,res,next)=>{
  try{
    const remitoscompras = await servicio.Buscar();
  res.json(remitoscompras);
  }catch(error){next(error);}

});
// filtrar formularios: RMT por fecha
router.get('/FiltrarPorFecha/:fecha',
validatorHandler(filtrarFechaRemito,'params'),
async (req,res,next)=>{
  try{const {fecha} = req.params;
  const remitoscompras = await servicio.BuscarporFecha(fecha);
  res.json(remitoscompras);
  //devolver lista de notas de pedidos filtradas por fecha
}catch(error){next(error);}
  });
//cliente solicita formulario: RMT por id
router.get('/BuscarporID/:id',
validatorHandler(getRemito,'params'),
async(req,res,next)=>{
  try{
    const { id } = req.params;
  const rmtC = await servicio.BuscarporID(id);
  res.json(rmtC);
  }catch(error){next(error);}
});
//cliente agrega formulario: RMT
router.post('/Crear',
validatorHandler(createRemito,'body'),
async (req,res,next)=>{
  try{
  const body = req.body;
  const rmtC = await servicio.Crear(body);
  res.json(rmtC);
  }catch(error){next(error);}

});


module.exports = router;