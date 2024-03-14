const boom = require('@hapi/boom');
const axios = require('axios');
const { Op } = require('sequelize');
const { config } = require('./../config/config');

const { models } = require('../libs/sequelize');
class NotaPedidoService {
  async create(ntp) {
    console.log(ntp);
    const veri = this.verificarNTP(ntp);
    if (veri) {
      let data = {
        userId: ntp.userId,
        cajaId: ntp.cajaId,
        clienteId: ntp.clienteId,
      };
      if (ntp.fiscal) {
        data = { ...data, fiscal: true };
      }
      const rta = await models.NotaPedido.create(data);
      if (!rta) {
        throw boom.notFound('Nota de Pedido not found');
      }
      await ntp.productos.forEach(async (product) => {
        await models.NotaProducto.create({ ...product, notaId: rta.id });
      });

      await ntp.cobros.forEach(async (cobro) => {
        await models.Cobro.create({ ...cobro, notaId: rta.id });
      });

      if (rta.fiscal) {
        setTimeout(async() => {
          await this.createFacturaB(rta.id);
        }, 4000);

      }
      return rta;
    } else {
      throw boom.notFound(
        'Los cobros no coinciden con el importe total de la Nota'
      );
    }
  }
  verificarNTP(ntp) {
    let sumP = 0;
    ntp.productos.forEach((product) => {
      sumP += product.cnt * product.precio;
    });
    let sumC = 0;
    ntp.cobros.forEach((cobro) => {
      sumC += cobro.monto;
    });
    if (Math.ceil(sumP) == Math.ceil(sumC)) {
      return true;
    } else {
      return false;
    }
  }
  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    if (!rta) {
      throw boom.notFound('Nota de Pedido no actualizada');
    }

    return rta;
  }
  async delete(id) {
    const ntp = await this.findOne(id);
    const rta = await ntp.destroy();
    if (!rta) {
      throw boom.notFound('Nota de Pedido no eliminada');
    }

    return ntp;
  }
  async find(query) {
    const whereConditions = {};

    const { fechaDesde, fechaHasta } = query;
    if (fechaDesde && fechaHasta) {
      let dateDesde = new Date(fechaDesde);
      let dateHasta = new Date(fechaHasta);
      dateHasta.setHours(parseInt(23, 10)); // parseInt convierte la cadena a un número
      dateHasta.setMinutes(parseInt(59, 10));

      whereConditions.createdAt = {
        [Op.gte]: dateDesde,
        [Op.lte]: dateHasta,
      };
    }

    // todas las notas de una caja en particular
    const { cajaId } = query;
    if (cajaId) {
      whereConditions.cajaId = cajaId;
    }
    // todas las notas de un user en particular
    const { userId } = query;
    if (userId) {
      whereConditions.userId = userId;
    }

    const include = [];
    const { user } = query;
    if (user) {
      include.push({ association: 'user', include: ['customer'] });
    }

    const { cliente } = query;
    if (cliente) {
      include.push({ association: 'cliente', include: ['customer'] });
    }
    const { cobros } = query;
    if (cobros) {
      include.push({ association: 'cobros', include: ['cuenta'] });
    }
    const { items } = query;
    if (items) {
      include.push('items');
    }

    const notasPedido = await models.NotaPedido.findAll({
      where: whereConditions,
      include,
    });

    if (!notasPedido) {
      throw boom.notFound('Nota de Pedido not found');
    }
    return notasPedido;
  }

  async findOne(id) {
    const ntp = await models.NotaPedido.findByPk(id, {
      include: [
        {
          association: 'user',
          include: ['customer'],
        },
        {
          association: 'cliente',
          include: ['customer'],
        },
        'items',
        'cobros',
      ],
    });

    if (!ntp) {
      throw boom.notFound('Nota de pedido no encontrada');
    }

    return ntp;
  }

  async createFacturaB(notaId) {

    const ntp = await this.findOne(notaId);

    let detalle = [];
    ntp.items.forEach((element) => {
      detalle.push({
        cantidad: element.NotaProducto.cnt,
        afecta_stock: 'N',
        actualiza_precio: 'N',
        bonificacion_porcentaje: 0,
        producto: {
          descripcion: element.nombre + element.descripcion,
          codigo: element.codigo,
          lista_precios: 'standard',
          leyenda: '',
          unidad_bulto: 1,
          alicuota: element.impuesto,
          actualiza_precio: 'N',
          rg5329: 'N',
          precio_unitario_sin_iva: element.NotaProducto.precio-(element.impuesto*element.NotaProducto.precio/100),
        },
      });
    });

    let cliente={};
    if(ntp.clienteId==1){
      cliente= {
        documento_tipo: 'OTRO',
        condicion_iva: 'CF',
        domicilio: '',
        condicion_pago: '201',
        documento_nro: '0',
        razon_social: '',
        provincia: '2',
        email:'',
        envia_por_mail: 'N',
        rg5329: 'N',
      };
    }else{
      cliente= {
        documento_tipo: 'DNI',
        condicion_iva: 'CF',
        domicilio: ntp.cliente.customer.direccion,
        condicion_pago: '201',
        documento_nro: '111132333',
        razon_social: ntp.cliente.customer.nombre + " "+ntp.cliente.customer.apellido,
        provincia: '2',
        email: ntp.cliente.customer.email,
        envia_por_mail: 'N',
        rg5329: 'N',
      };
    }

    let data = {
      apitoken: config.apiToken,
      apikey: config.apiKey,
      usertoken: config.userToken,
      comprobante: {
        rubro: 'Sevicios web',
        percepciones_iva: 0,
        tipo: 'FACTURA B',
        numero: ntp.id,
        bonificacion: 0,
        operacion: 'V',
        detalle: detalle,
        fecha: await ntp.emision(),
        vencimiento: await ntp.vencimiento(),
        rubro_grupo_contable: 'Productos',
        total: await ntp.calcularTotal(),
        cotizacion: 1,
        moneda: 'PES',
        punto_venta: ntp.cajaId,
        tributos: [],
        impuestos_internos: '0',
        impuestos_internos_base: '0',
        impuestos_internos_alicuota: '0',
      }
    };

    data = {
      ...data,
      cliente
    }


    await this.utlizarAxios('POST',data,'https://www.tusfacturas.app/app/api/v2/facturacion/nuevo_encola');
  }

  async utlizarAxios(method, data, URL) {
    // Opciones de la solicitud
    const options = {
      method: method,
      url: URL, // Cambia esto por la URL del servidor destino
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    // Realiza la solicitud
    axios(options)
      .then((response) => {
        console.log('Respuesta del servidor:', response.data);
        return response;
      })
      .catch((error) => {
        console.error('Error al enviar la solicitud:', error);
        return response;
      });
  }
}

module.exports = NotaPedidoService;
