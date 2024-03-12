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
  async iniciar() {
    //create customer y cliente del consumidor final
    const customer = await servicio4.create({
      nombre: 'Consumidor',
      apellido: 'Final',
      celular: 9876544321,
      direccion: 'algun lugar 1234',
      email: 'ConsumidorFinal@example.com',
    });
     await servicio3.create({ customerId: customer.id });
    //create cuentas
    await servicio2.generar();
    //create productos*/
    await servicio.generar();

    return true;
  }
}

module.exports = GeneradorServicio;