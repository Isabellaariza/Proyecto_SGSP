const orderService = require('../services/orderService');

class OrderController {
  // Crear pedido
  async createOrder(req, res) {
    try {
      const { items } = req.body;
      const order = await orderService.createOrder(req.user._id, items);
      res.status(201).json({
        success: true,
        message: 'Pedido creado exitosamente',
        data: order
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Obtener todos los pedidos
  async getAllOrders(req, res) {
    try {
      const orders = await orderService.getAllOrders();
      res.json({
        success: true,
        data: orders
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Obtener pedido por ID
  async getOrderById(req, res) {
    try {
      const order = await orderService.getOrderById(req.params.id);
      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  // Cancelar pedido
  async cancelOrder(req, res) {
    try {
      const order = await orderService.cancelOrder(req.params.id);
      res.json({
        success: true,
        message: 'Pedido cancelado exitosamente',
        data: order
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new OrderController();