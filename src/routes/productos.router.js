const express = require('express');
const router = express.Router();
const ProductoServicio = require('../services/producto.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductoSchema, updateProductoSchema, getProductoSchema} = require('../schemas/producto.schema');

const servicio = new ProductoServicio();


// ------------------- EndPoint Get ------------------------
//cliente solicita lista de productos
router.get('/Lista',async (req,res,next)=>{

 // const productos = await servicio.BuscarporTipo('PRD');
 try{
  const productos = await servicio.Buscar();
  res.json(productos);
 }catch(error){next(error);}


 });
// cliente busca producto por id
router.get('/BuscarPorID/:id',
validatorHandler(getProductoSchema, 'params'),
  async(req, res,next)=>{
  try{

    const { id } = req.params;
    const producto = await servicio.BuscarporID(id);
    res.json(producto);

  }catch(error){
    next(error);
  }

});

  // --------------------- Endopoint post ----------------------
//cliente agrega un producto nuevo a la lista "productos"
router.post('/Crear',
validatorHandler(createProductoSchema,'body'),
  async(req,res,next)=>{
  try{
    const body = req.body;
    const newproduct = await servicio.Crear(body);
    // cliente retorna producto de ser creado
    res.json(newproduct);

  }catch(error){ next(error);}

  });



// --------------------- Endopoints Patch ----------------------
//cliente actualizacion parcial
router.patch('/Modificar/:id',
validatorHandler(updateProductoSchema,'body'),
  async(req,res,next)=>{
  try{
  const {id} = req.params;
  const body =  req.body;
  const producto = await servicio.Actualizar(id,body);
  res.json(producto);
  }catch(error){
    next(error);
  }
});
router.patch('/Sumar/:id',
validatorHandler(updateProductoSchema,'body'),
  async(req,res,next)=>{
  try{
  const {id} = req.params;
  const body =  req.body;
  const producto = await servicio.Sumar(id,body);
  res.json(producto);
  }catch(error){
    next(error);
  }
});
router.patch('/Restar/:id',
validatorHandler(updateProductoSchema,'body'),
  async(req,res,next)=>{
  try{
  const {id} = req.params;
  const body =  req.body;
  const producto = await servicio.Restar(id,body);
  res.json(producto);
  }catch(error){
    next(error);
  }
});

// --------------------- Endopoints Delete ----------------------
//cliente borra producto de la lista por id
router.delete('/Borrar/:id',
  validatorHandler(getProductoSchema,'params'),
async(req,res,next)=>{
  try{
  const {id} = req.params;
  const band = await servicio.Borrar(id);
  res.json(band);
}catch(error){
  next(error);
}
});

/*
Exportando el Modulo
 */
module.exports = router;
