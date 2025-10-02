const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthService {
  // Registrar usuario
  async register(userData) {
    const { nombre, email, password, rol } = userData;
    
    // Verificar si el email ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // Crear usuario
    const user = new User({ nombre, email, password, rol });
    await user.save();

    // Generar token
    const token = this.generateToken(user._id);
    
    return {
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      },
      token
    };
  }

  // Iniciar sesión
  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Credenciales inválidas');
    }

    const token = this.generateToken(user._id);
    
    return {
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      },
      token
    };
  }

  // Generar JWT token
  generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
  }
}

module.exports = new AuthService();