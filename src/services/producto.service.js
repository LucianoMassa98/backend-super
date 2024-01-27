const boom = require('@hapi/boom');
const fs = require('fs');

//const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');
const { DOUBLE } = require('sequelize');

class ProductoServicio {
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

  async GenerarArchivoJsonProductos(nombreArchivo) {
    fs.readFile(nombreArchivo, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error al leer el archivo: ${err.message}`);
        return;
      }

      const lines = data.split('\n');
      const productos= [];

      lines.forEach((linea) => {

       const match= linea.split('-');
       // const match = linea.match(regex);
        if(match.length==3){
          productos.push({
            codigo: match[0],
            codBarra: match[1].trim().replace(/^0+/, ''),
            nombre: match[2].trim().slice(0, -2),
          });
        }
      });

      productos.forEach(async item=>{
        try{await this.create(
          {codigo: parseInt(item.codigo),
            codBarra: item.codBarra,
            nombre: item.nombre,
            descripcion:"nn",
            precio: 1,
            impuesto: 1,
            marca: "nn",
            rubro:"nn"
            }
          );}catch(err){console.log("error en item:"); console.log(item);}

      });


    });
  }

  async CargarProductos(){
    const productos = await this.GenerarArchivoJsonProductos("./STOCK.txt");

  }
}

module.exports = ProductoServicio;
