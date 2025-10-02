const Product = require('../models/Product');

class ProductService {
  // Crear producto
  async createProduct(productData) {
    const product = new Product(productData);
    return await product.save();
  }

  // Obtener todos los productos
  async getAllProducts() {
    return await Product.find().sort({ createdAt: -1 });
  }

  // Obtener producto por ID
  async getProductById(id) {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }

  // Actualizar producto
  async updateProduct(id, updateData) {
    const product = await Product.findByIdAndUpdate(id, updateData, { 
      new: true, 
      runValidators: true 
    });
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }

  // Eliminar producto
  async deleteProduct(id) {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }

  // Verificar stock disponible
  async checkStock(productId, quantity) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product.stock >= quantity;
  }

  // Reducir stock
  async reduceStock(productId, quantity) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    if (product.stock < quantity) {
      throw new Error(`Stock insuficiente para ${product.nombre}`);
    }
    product.stock -= quantity;
    return await product.save();
  }

  // Aumentar stock (para cancelaciones)
  async increaseStock(productId, quantity) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    product.stock += quantity;
    return await product.save();
  }
}

module.exports = new ProductService();