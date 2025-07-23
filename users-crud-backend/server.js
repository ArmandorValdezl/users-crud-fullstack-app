// Importamos las librerías necesarias
import express from 'express';
import cors from 'cors';

// Crear una instancia de la aplicación Express
const app = express();
// Render proveerá PORT, si no, usa 3000 localmente
const PORT = process.env.PORT || 3000; // El puerto en el que se ejecutará nuestro servidor

// 1. Configurar CORS
// Esto es CRUCIAL para que nuestro frontend de React pueda hacer peticiones.
// 'http://localhost:5173' es la dirección de nuestro frontend de Vite.
// En producción, aquí iría la URL de tu aplicación desplegada (ej. 'https://my-react-app.vercel.app')

app.use(cors()); //Simplemente llamar a cors() sin argumentos es lo más permisivo.

// app.use(cors({
//   origin: [
//     'http://localhost:5173', // Para tu desarrollo local
//     'https://users-crud-fullstack-xw60hwrzz.vercel.app',
//     'users-crud-fullstack-app.vercel.app' // ¡Esta es la URL de tu frontend desplegado en Vercel!
//   ], // Solo permite peticiones desde nuestro frontend
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Métodos HTTP permitidos
//   allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
// }));



// 2. Configurar el middleware para parsear JSON
// Esto permite que nuestro servidor entienda los datos JSON que le enviemos desde el frontend
app.use(express.json());

// 3. Simulación de una "base de datos" en memoria (temporal)
// Esto será un array que almacenará nuestros usuarios por ahora.
let users = [
  {
    id: "1",
    email: "john.doe@example.com",
    password: "password123",
    first_name: "John",
    last_name: "Doe",
    birthday: "1990-05-15",
    image_url: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: "2",
    email: "jane.smith@example.com",
    password: "securepass",
    first_name: "Jane",
    last_name: "Smith",
    birthday: "1988-11-22",
    image_url: "https://randomuser.me/api/portraits/women/2.jpg"
  }
];

// Helper para generar IDs únicos (muy básico, para la demo)
const generateUniqueId = () => Date.now().toString();

// 4. Definir nuestra primera ruta (endpoint)
// Ruta para obtener todos los usuarios
app.get('/api/v1/users', (req, res) => {
  console.log('GET /api/v1/users request received');
  res.json(users); // Responde con la lista completa de usuarios
});

// Ruta para obtener un usuario por ID
app.get('/api/v1/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Ruta para crear un nuevo usuario
app.post('/api/v1/users', (req, res) => {
  const newUser = {
    id: generateUniqueId(), // Genera un ID único
    ...req.body // Copia el resto de los datos enviados en el cuerpo de la petición
  };
  users.push(newUser); // Añade el nuevo usuario a nuestra "base de datos"
  res.status(201).json(newUser); // Responde con el nuevo usuario y estado 201 (Creado)
});

// Ruta para actualizar completamente un usuario (PUT)
app.put('/api/v1/users/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex !== -1) {
    const updatedUser = { id, ...req.body }; // Asegura que el ID no cambie
    users[userIndex] = updatedUser;
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Ruta para actualizar parcialmente un usuario (PATCH)
app.patch('/api/v1/users/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === id);
  
    if (userIndex !== -1) {
      // Combina los datos existentes con los nuevos datos parciales
      const updatedUser = { ...users[userIndex], ...req.body };
      users[userIndex] = updatedUser;
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });

// Ruta para eliminar un usuario
app.delete('/api/v1/users/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = users.length;
  users = users.filter(u => u.id !== id); // Filtra el usuario a eliminar

  if (users.length < initialLength) {
    res.status(204).send(); // Responde con estado 204 (Sin Contenido) si se eliminó
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 API de Usuarios escuchando en http://localhost:${PORT}`);
});