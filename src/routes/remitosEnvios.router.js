const express = require('express');
const router = express.Router();
const RemitosEnvioService =require('../services/remitosEnvios.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createRemitoProduccion,getRemitoProduccion,addItemEnvioSchema} = require('../schemas/remitoproduccion.schema');

const servicio = new RemitosEnvioService();

//cliente solicita lista de formularios: RMT
router.get('/',async(req,res,next)=>{
  try{
    const remitosenvios = await servicio.Buscar();
  res.json(remitosenvios);
  }catch(error){next(error);}

});
// filtrar formularios: RMT por fecha
router.get('/FiltrarPorFecha/:fecha',
validatorHandler(getRemitoProduccion,'params'),
async (req,res,next)=>{
  try{const {fecha} = req.params;
  const remitosenvios = await servicio.BuscarporFecha(fecha);
  res.json(remitosenvios);
  //devolver lista de notas de pedidos filtradas por fecha
}catch(error){next(error);}
  });
//cliente solicita formulario: RMT por id
router.get('/:id',
validatorHandler(getRemitoProduccion,'params'),
async(req,res,next)=>{
  try{
    const { id } = req.params;
  const rmtE = await servicio.BuscarporID(id);
  res.json(rmtE);
  }catch(error){next(error);}
});
//cliente agrega formulario: RMT
router.post('/',
validatorHandler(createRemitoProduccion,'body'),
async (req,res,next)=>{
  try{
  const body = req.body;
  const rmtE = await servicio.Crear(body);
  res.json(rmtE);
  }catch(error){next(error);}

});
router.post('/agregar',
validatorHandler(addItemEnvioSchema,'body'),
async (req,res,next)=>{
  try{
  const body = req.body;
  const rmtE = await servicio.additem(body);
  res.json(rmtE);
  }catch(error){next(error);}

});
router.post('/Finalizar',
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await servicio.Finalizar(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
