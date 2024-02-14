const boom = require('@hapi/boom');
const fs = require('fs');

const { models } = require('../libs/sequelize');
const { DOUBLE } = require('sequelize');
//const productos = require('./productosNoCargados.js');
const { options } = require('joi');

class ProductoServicio {

  async generar(){
/*
   await productos.forEach(async item=>{
      try{
       const rta= await this.create( {
        codigo: item.codigo,
        codBarra: item.codBarra,
        nombre: item.nombre,
        descripcion:"dd",
        precio: item.precio,
        impuesto: item.impuesto,
        marca: "mm",
        rubro:"rr"
        });

      }catch(err){
          console.log(err);
        }

    });
*/
    return true;

  }
  async create(data) {
    const rta = await models.Producto.create(data);
    if (!rta) {
      throw boom.notFound('Producto not found');
    }

    return rta;
  }
  //findOne
  async findOne(id) {
    const producto = await models.Producto.findByPk(id);
    if (!producto) {
      throw boom.notFound('producto no existente');
    }
    return producto;
  }

  async findOne2(query) {


    let options = { where:{}}
    const {codBarra, codigo, id, nombre, descripcion, marca, rubro}=query;

    if(id){options.where={id:id}}
    if (codBarra) {
      options.where = {
        ...options.where,
        codBarra: codBarra,
      };
    }

    if (codigo) {
      options.where = {
        ...options.where,
        codigo: codigo,
      };
    }

    if (nombre) {
      options.where = {
        ...options.where,
        nombre: nombre,
      };
    }

    if (descripcion) {
      options.where = {
        ...options.where,
        descripcion: descripcion,
      };
    }

    if (rubro) {
      options.where = {
        ...options.where,
        rubro: rubro,
      };
    }

    if (marca) {
      options.where = {
        ...options.where,
        marca: marca,
      };
    }

    const producto = await models.Producto.findOne(options);
      if (!producto) {
        throw boom.notFound('producto no existente');
      }
      return producto;

  }
  async findBarra(codBarra) {

    const producto = await models.Producto.findOne({where:{codBarra: codBarra }});
    if (!producto) {
      throw boom.notFound('producto no existente');
    }
    return producto;
  }
  async findCodigo(codigo) {

    const producto = await models.Producto.findOne({where:{codigo: codigo }});
    if (!producto) {
      throw boom.notFound('producto no existente');
    }
    return producto;
  }

  async findProducto(texto) {

    const dat = texto.split('-');

    if (dat.Length == 1)
    {
        // buscar primero por codigo barra
        try{

          const Producto = await this.findBarra(texto);
          return Producto;
        }catch(err){
          const Producto = await this.findCodigo(texto);
          return Producto;
        }
    }
    else
    {  const listProductos = await this.find();
        if (dat.Length == 3) {

            let Producto = listProductos.FirstOrDefault(p => p.nombre == dat[0] && p.descripcion == dat[1] && p.marca == dat[2]);
            if (!Producto) { return Producto; }

            Producto = listProductos.FirstOrDefault(p => p.marca == dat[0] && p.nombre== dat[1] && p.descripcion== dat[2]);
            if (!Producto) { return Producto; }

        }
        else if(dat.Length == 4) {

            let Producto = listProductos.FirstOrDefault(p => p.rubro == dat[0] && p.nombre == dat[1] && p.descripcion == dat[2] && p.marca == dat[3]);
            if (!Producto) { return Producto; }

             Producto = listProductos.FirstOrDefault(p => p.rubro == dat[0] && p.marca == dat[1] && p.nombre== dat[2] && p.descripcion== dat[3]);
            if (!Producto) { return Producto; }

        }
    }
    return null;

  }
  async find() {
    const rta = await models.Producto.findAll();
    if (!rta) {
      throw boom.notFound('Productos not found');
    }

    return rta;
  }
  async obtenerCodigo() {

    const ultimoElemento = await models.Producto.findOne({
      order: [['id', 'DESC']],
    });

    if (!ultimoElemento) {
      return {codigo:1};
    }
    return {codigo:ultimoElemento.codigo+1};
  }
  async findMarcas() {
    const rta = await this.find();
    const miArray = [];
    rta.forEach((producto) => {
      if (miArray.indexOf(producto.marca) == -1) {
        miArray.push(producto.marca);
      }
    });
    return miArray;
  }
  async findRubros() {
    const rta = await this.find();
    const miArray = [];
    rta.forEach((producto) => {
      if (miArray.indexOf(producto.rubro) == -1) {
        miArray.push(producto.rubro);
      }
    });
    return miArray;
  }
  async update(id, changes) {
    const producto = await this.findOne(id);
    const rta = await producto.update(changes);
    if (!rta) {
      throw boom.notFound('Producto no actualizado');
    }

    return rta;
  }

  async delete(id) {
    const producto = await this.findOne(id);
    const rta = await producto.destroy();
    if (!rta) {
      throw boom.notFound('Producto no eliminado');
    }

    return producto;
  }
  async subaPrecio(query) {
    const { marca, rubro, porcentaje } = query;
    let options = {};

    if (marca) {
      options.where = {
        marca: marca,
      };
    }

    if (rubro) {
      options.where = {
        rubro: rubro,
      };
    }

    const rta = await models.Producto.findAll(options);
    if (!rta) {
      throw boom.notFound('No ha ningun producto con esas caracteristicas');
    }

    rta.forEach(async (product) => {
      await product.update({
        precio: (product.precio * porcentaje) / 100 + product.precio,
      });
    });

    return true;
  }

  async importarProductos(nombreArchivo) {
    fs.readFile(nombreArchivo, 'utf8', async (err, data) => {
      if (err) {
        console.error(`Error al leer el archivo: ${err.message}`);
        return;
      }

      const lines = data.trim().split('\n');
      const productos= [];

    await lines.forEach((linea) => {

       const match= linea.split(';');

        if(match.length==6){
          productos.push({
            codigo: parseInt( match[0].trim()),
            codBarra: match[1].trim().replace(/\s/g, ''),
            nombre: match[2].trim(),
            impuesto: parseFloat(match[3].trim().replace(',', '.')),
            precio: parseFloat(match[4].trim().replace(',', '.'))

          });
        }
      });
        let i =1;
     await productos.forEach(async item=>{
        try{
          if(item.codBarra)


          await this.create(
          {
            codigo: item.codigo,
            codBarra: item.codBarra.trim() !== '' ? item.codBarra.trim() : (i++).toString(),
            nombre: item.nombre,
            descripcion:"dd",
            precio: !isNaN(item.precio) ? parseFloat(item.precio) : 0,
            impuesto: item.impuesto,
            marca: "mm",
            rubro:"rr"
            }
          );}catch(err){

            console.log(item);
          }

      });


    });
  }

  async exportarProductos(){
    const productos = await this.find();
    let texto="";
     productos.forEach( item =>{
      texto+=item.nombre+">"+
            item.descripcion+">"+
            item.rubro+">"+
            item.marca+">"+
            item.precio+">"+
            item.impuesto+"/n";
     });
return texto;
  }
}

module.exports = ProductoServicio;
