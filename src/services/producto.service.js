const boom = require('@hapi/boom');
const fs = require('fs');

const { models } = require('../libs/sequelize');

const { Op } = require('sequelize');

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
  async findOne(query) {
    let options = { where:{}}
    const {codBarra, codigo, id}=query;

    if(id){options.where={id:id}}
    if (codBarra) {
      options.where = {
        codBarra: codBarra,
      };
    }

    if (codigo) {
      options.where = {
        codigo: codigo,
      };
    }



    const producto = await models.Producto.findOne(options);
      if (!producto) {
        throw boom.notFound('producto no existente');
      }
      return producto;

  }

  async find(query) {
    const {limit, offset, texto} = query;

    let options = {
      where:{},
      offset
    };

    if(limit){
      options.limit=limit;
    }

    if(texto){ options.where={ nombre:{[Op.iLike]: `%${texto}%` }}}

    const rta = await models.Producto.findAll(options);
    if (!rta) {
      throw boom.notFound('Productos not found');
    }
    await rta.sort(function(a, b) {
      var nombreA = a.nombre.toUpperCase(); // Convertir nombres a mayúsculas
      var nombreB = b.nombre.toUpperCase(); // Convertir nombres a mayúsculas
      if (nombreA < nombreB) {
          return -1;
      }
      if (nombreA > nombreB) {
          return 1;
      }
      return 0;
  });

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

    const producto = await this.findOne({id:id});
      const rta = await producto.update(changes);
    if (!rta) {
      throw boom.notFound('Producto no actualizado');
    }
    return rta;

  }

  async delete(id) {
    const producto = await this.findOne({id:id});
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

  async importarProductos() {
    const nombreArchivo = './STOCK.txt'
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
