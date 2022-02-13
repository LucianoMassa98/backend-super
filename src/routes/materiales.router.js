const express = require('express');
const router = express.Router();
const ProductoServicio = require('../services/producto.service');
const servicio = new ProductoServicio();


// ------------------- EndPoint Get ------------------------
//cliente solicita lista de productos
router.get('/Lista',async (req,res)=>{

  const productos = await servicio.BuscarporTipo('MTP');
  res.json(productos);

 });
// cliente busca producto por id
router.get('/BuscarPorID/:id',async(req, res)=>{
  const { id } = req.params;
   const producto = await servicio.BuscarUno(id);
   res.json(producto);
});



  // --------------------- Endopoint post ----------------------
//cliente agrega un producto nuevo a la lista "productos"
router.post('/Agregar',async(req,res)=>{
  const body = req.body;
  const newproduct = await servicio.Crear(body,'MTP');
  // guardar producto en stock verificando que antes no exista
  res.status(201).json(newproduct);
  });




// --------------------- Endopoints Patch ----------------------
//cliente actualizacion parcial
router.patch('/ModificaParcial/:id',async(req,res)=>{
  try{
  const {id} = req.params;
  const body =  req.body;
  const producto = await servicio.Actualizar(id,body,'MTP');
  res.json(producto);
  }catch(error){
    res.json({
      message: error.message
    });
  }
});

// --------------------- Endopoints Delete ----------------------
//cliente borra producto de la lista por id
router.delete('/BorrarProducto/:id',async(req,res)=>{
  const {id} = req.params;
  const band = await servicio.Borrar(id,'MTP');
  res.json(band);
});




/*
Exportando el Modulo
 */
module.exports = router;

