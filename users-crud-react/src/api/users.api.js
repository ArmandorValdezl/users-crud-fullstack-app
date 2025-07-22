import axios from 'axios';


// Usamos una variable de entorno que Vercel configurará para nosotros.
// En desarrollo local, usará 'http://localhost:3000/api/v1'.
// En producción (Vercel), usará la URL que le pasemos a VITE_API_URL.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
// 1. Creamos una instancia de Axios
// Esto es útil porque podemos configurar una base URL y otros parámetros por defecto.
const usersApi = axios.create({
  baseURL: API_BASE_URL, // Nuestra propia API corre en el puerto 3000
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 2. Definimos las funciones para cada operación CRUD
// Encapsulamos la lógica de la API en funciones claras.

export const getUsers = async () => {
  try {
    const response = await usersApi.get('/users');
    return response.data; // Retorna la lista de usuarios
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error; // Propagamos el error para que quien llame a esta función lo maneje
  }
};

export const getUserById = async (id) => {
  try {
    const response = await usersApi.get(`/users/${id}`);
    return response.data; // Retorna un usuario específico
  } catch (error) {
    console.error(`Error al obtener usuario con ID ${id}:`, error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await usersApi.post('/users', userData);
    return response.data; // Retorna el usuario creado
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await usersApi.put(`/users/${id}`, userData);
    return response.data; // Retorna el usuario actualizado
  } catch (error) {
    console.error(`Error al actualizar usuario con ID ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await usersApi.delete(`/users/${id}`);
    return true; // Retorna true si la eliminación fue exitosa
  } catch (error) {
    console.error(`Error al eliminar usuario con ID ${id}:`, error);
    throw error;
  }
};