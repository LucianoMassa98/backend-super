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

     // const regex = /^(\d{5})-(\d{18})\s+-([^\s].*?)\s+$/;
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
       await this.create(
          {codigo: parseInt(item.codigo),
            codBarra: parseFloat(item.codBarra),
            nombre: item.nombre,
            descripcion:"nn",
            precio: 1,
            impuesto: 0,
            marca: "nn",
            rubro:"nn"
            }
          )
      });


    });
  }

  async CargarProductos(){
    const productos = await this.GenerarArchivoJsonProductos("./STOCK.txt");

  }
}

module.exports = ProductoServicio;
