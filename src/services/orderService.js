const Order = require('../models/Order');
const productService = require('./productService');
const mongoose = require('mongoose');

class OrderService {
  // Crear pedido
  async createOrder(usuarioId, orderItems) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      let total = 0;
      const detalle = [];

      // Verificar stock y calcular totales
      for (const item of orderItems) {
        const product = await productService.getProductById(item.productoId);
        
        if (product.stock < item.cantidad) {
          throw new Error(`Stock insuficiente para ${product.nombre}`);
        }

        const subtotal = item.cantidad * product.precio;
        total += subtotal;

        detalle.push({
          productoId: item.productoId,
          cantidad: item.cantidad,
          precioUnitario: product.precio,
          subtotal
        });

        // Reducir stock
        await productService.reduceStock(item.productoId, item.cantidad);
      }

      // Crear pedido
      const order = new Order({
        usuarioId,
        total,
        detalle
      });

      await order.save({ session });
      await session.commitTransaction();

      return await this.getOrderById(order._id);
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  // Obtener todos los pedidos
  async getAllOrders() {
    return await Order.find()
      .populate('usuarioId', 'nombre email')
      .populate('detalle.productoId', 'nombre precio')
      .sort({ createdAt: -1 });
  }

  // Obtener pedido por ID
  async getOrderById(id) {
    const order = await Order.findById(id)
      .populate('usuarioId', 'nombre email')
      .populate('detalle.productoId', 'nombre precio');
    
    if (!order) {
      throw new Error('Pedido no encontrado');
    }
    return order;
  }

  // Cancelar pedido
  async cancelOrder(id) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const order = await Order.findById(id);
      if (!order) {
        throw new Error('Pedido no encontrado');
      }

      if (order.estado === 'cancelado') {
        throw new Error('El pedido ya está cancelado');
      }

      // Devolver stock
      for (const item of order.detalle) {
        await productService.increaseStock(item.productoId, item.cantidad);
      }

      // Cambiar estado
      order.estado = 'cancelado';
      await order.save({ session });

      await session.commitTransaction();
      return await this.getOrderById(id);
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

module.exports = new OrderService();