# Sistema de Gestión Simple para Pequeñas empresas (SGSP)

Sistema web para pequeñas empresas como tiendas, ferreterías, farmacias y restaurantes.

## Características

- ✅ Autenticación JWT
- ✅ CRUD de productos con control de stock
- ✅ Gestión de pedidos
- ✅ Cancelación de pedidos con devolución de stock
- ✅ Clean Architecture
- ✅ MongoDB con Mongoose

## Instalación

1. Clona el repositorio
2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno en `.env`:
```
PORT=3000
MONGODB_URI=mongodb+srv://tu_usuario:tu_password@cluster0.mongodb.net/sgsp_db
JWT_SECRET=tu_jwt_secret_muy_seguro_aqui
NODE_ENV=development
```

4. Inicia el servidor:
```bash
npm run dev
```

## Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Productos
- `POST /api/products` - Crear producto
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener producto por ID
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

### Pedidos
- `POST /api/orders` - Crear pedido
- `GET /api/orders` - Obtener todos los pedidos
- `GET /api/orders/:id` - Obtener pedido por ID
- `PUT /api/orders/:id/cancel` - Cancelar pedido

## Ejemplos de uso

### Registrar usuario
```json
POST /api/auth/register
{
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "password": "123456",
  "rol": "admin"
}
```

### Crear producto
```json
POST /api/products
{
  "nombre": "Laptop HP",
  "descripcion": "Laptop HP 15 pulgadas",
  "precio": 800.00,
  "stock": 10,
  "categoria": "Electrónicos"
}
```

### Crear pedido
```json
POST /api/orders
{
  "items": [
    {
      "productoId": "64f8a1b2c3d4e5f6a7b8c9d0",
      "cantidad": 2
    }
  ]
}
```

## Despliegue

### Render (Backend)
1. Conecta tu repositorio de GitHub
2. Configura las variables de entorno
3. Despliega

### MongoDB Atlas
1. Crea un cluster gratuito
2. Configura la conexión en las variables de entorno
3. Agrega tu IP a la whitelist