const express = require('express');
const router = express.Router();
const MaterialService = require('../services//materiales.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductoSchema, updateProductoSchema, getProductoSchema} = require('../schemas/producto.schema');

const servicio = new MaterialService();


// ------------------- EndPoint Get ------------------------
//cliente solicita lista de productos
router.get('/Lista',async (req,res,next)=>{

  try{

    const materiales = await servicio.Buscar();
    res.json(materiales);
  }catch(error){ next(error);}

 });
// cliente busca producto por id
router.get('/BuscarPorID/:id',
validatorHandler(getProductoSchema,'params'),
async(req, res,next)=>{
  try{
    const { id } = req.params;
   const material = await servicio.BuscarporID(id);
   res.json(material);
  }catch(error){ next(error);}

});

  // --------------------- Endopoint post ----------------------
//cliente agrega un producto nuevo a la lista "productos"
router.post('/Crear',
validatorHandler(createProductoSchema,'body'),
async(req,res,next)=>{
  try{
    const body = req.body;
  const newmaterial = await servicio.Crear(body);
  res.status(201).json(newmaterial);
  }catch(error){next(error);}

  });




// --------------------- Endopoints Patch ----------------------
//cliente actualizacion parcial
router.patch('/ModificaParcial/:id',
validatorHandler(getProductoSchema,'params'),
validatorHandler(updateProductoSchema,'body'),
async(req,res,next)=>{

  try{
  const {id} = req.params;
  const body =  req.body;
  const material = await servicio.Actualizar(id,body);
  res.json(material);
  }catch(error){
   next(error);
  }
});

// --------------------- Endopoints Delete ----------------------
//cliente borra producto de la lista por id
router.delete('/BorrarProducto/:id',
validatorHandler(getProductoSchema,'params'),
async(req,res,next)=>{
  try{
    const {id} = req.params;
  const band = await servicio.Borrar(id);
  res.json(band);
  }catch(error){next(error);}

});


/*
Exportando el Modulo
 */
module.exports = router;

