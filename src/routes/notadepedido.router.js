
const express = require('express');
const router = express.Router();
const NotaPedidoService = require('../services/notasDePedidos.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createNotaPedido,
  getNotaDePedido,
  updateNotaPedido,
  filtrarFechaRecepcion,
  addItemSchema} = require('../schemas/notapedido.schema');

const servicio = new NotaPedidoService();

//cliente solicita lista de formularios: NTP
router.get('/',async(req,res,next)=>{
  try{
    const notasdepedidos = await servicio.Buscar();
  res.json(notasdepedidos);
  }catch(error){next(error);}

});
router.get('/Estado',async(req,res,next)=>{
  try{
    const notasdepedidos = await servicio.BuscarporEstado(true);
  res.json(notasdepedidos);
  }catch(error){next(error);}

});
// filtrar formularios: NTP por fecha
router.get('/FiltrarPorFecha/:fecha',
validatorHandler(filtrarFechaRecepcion,'params'),
async (req,res,next)=>{
  try{const {fecha} = req.params;
  const notasdepedidos = await servicio.BuscarporFecha(fecha);
  res.json(notasdepedidos);
  //devolver lista de notas de pedidos filtradas por fecha
}catch(error){next(error);}
  });
//cliente solicita formulario: NTP por id
router.get('/:id',
validatorHandler(getNotaDePedido,'params'),
async(req,res,next)=>{
  try{
    const { id } = req.params;
  const ntp = await servicio.BuscarporID(id);
  res.json(ntp);
  }catch(error){next(error);}
});
//cliente agrega formulario: NTP
router.post('/',
validatorHandler(createNotaPedido,'body'),
async (req,res,next)=>{
  try{
  const body = req.body;
  const ntp = await servicio.Crear(body);
  res.json(ntp);
  }catch(error){next(error);}

});
router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await servicio.additem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

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
