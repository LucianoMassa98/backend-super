const express = require('express');
const router = express.Router();
const port = 3000;
const ProductoServicio = require('../services/producto.service');
const servicio = new ProductoServicio('PDO');


// ------------------- EndPoint Get ------------------------
//cliente solicita lista de productos
router.get('/Lista',async (req,res)=>{

 // const productos = await servicio.BuscarporTipo('PRD');
 const productos = await servicio.Buscar();
  res.json(productos);

 });
// cliente busca producto por id
router.get('/BuscarPorID/:id',async(req, res,next)=>{
  try{

    const { id } = req.params;
    const producto = await servicio.BuscarporID(id);
    res.json(producto);

  }catch(error){
    next(error);
  }

});
// cliente busca producto por barra
router.get('/BuscarPorBarra/:id',async(req, res,next)=>{

  try{
    const { id } = req.params;
    const producto = await servicio.BuscarporBarra(id);
    res.json(producto);
  }catch(error){
    next(error);
  }
});



  // --------------------- Endopoint post ----------------------
//cliente agrega un producto nuevo a la lista "productos"
router.post('/Agregar',async(req,res,next)=>{
  try{
    const body = req.body;
    const newproduct = await servicio.Crear(body);
    // cliente retorna producto de ser creado
    res.json(newproduct);

  }catch(error){ next(error);}

  });



// --------------------- Endopoints Patch ----------------------
//cliente actualizacion parcial
router.patch('/Modificar/:id',async(req,res,next)=>{
  try{
  const {id} = req.params;
  const body =  req.body;
  const producto = await servicio.Actualizar(id,body,'PRD');
  res.json(producto);
  }catch(error){
    next(error);
  }
});

// --------------------- Endopoints Delete ----------------------
//cliente borra producto de la lista por id
router.delete('/Borrar/:id',async(req,res,next)=>{
  try{
  const {id} = req.params;
  const band = await servicio.Borrar(id,'PRD');
  res.json(band);
}catch(error){
  next(error);
}
});




/*
Exportando el Modulo
 */
module.exports = router;
