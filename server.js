const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
require('dotenv').config();

const app = express();

// Debug - verificar variables de entorno
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'CONFIGURADO' : 'NO CONFIGURADO');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'CONFIGURADO' : 'NO CONFIGURADO');

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/products', require('./src/routes/products'));
app.use('/api/orders', require('./src/routes/orders'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API SGSP funcionando correctamente' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});