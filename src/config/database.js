const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://isabellaariza7:1234@cluster0.ofsvfqu.mongodb.net/sgsp_db?retryWrites=true&w=majority&appName=Cluster0");
    console.log('MongoDB conectado correctamente');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;