const boom = require('@hapi/boom');

const ProductoServicio = require('../services/producto.service');
const servicio = new ProductoServicio();

const CuentaService = require('../services/cuentas.service');
const servicio2 = new CuentaService();

const ClienteService = require('../services/clientes.service');
const servicio3 = new ClienteService();

const CustomerService = require('../services/customers.service');
const servicio4 = new CustomerService();

class GeneradorServicio {

  async iniciar(){



    const customer = await servicio4.create({
      nombre: "cajero",
      apellido: "cajero",
      celular: 9876544321,
      direccion: "algun lugar 1234",
      email: "cajero@example.com"
    });
    const cuentas = await servicio2.generar();

    const cliente = await servicio3.create({customerId: customer.id});

    const productos = await servicio.generar();

    return true;
  }

}

module.exports = GeneradorServicio;
