const express = require('express');
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(auth);

// POST /api/orders
router.post('/', orderController.createOrder);

// GET /api/orders
router.get('/', orderController.getAllOrders);

// GET /api/orders/:id
router.get('/:id', orderController.getOrderById);

// PUT /api/orders/:id/cancel
router.put('/:id/cancel', orderController.cancelOrder);

module.exports = router;