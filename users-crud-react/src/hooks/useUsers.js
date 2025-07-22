import { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api/users.api';

// Nuestro custom hook useUsers
const useUsers = () => {
  // Estado para almacenar la lista de usuarios
  const [users, setUsers] = useState([]);
  // Estado para manejar si estamos cargando datos
  const [isLoading, setIsLoading] = useState(false);
  // Estado para manejar cualquier error que pueda ocurrir
  const [error, setError] = useState(null);

  // Función para obtener todos los usuarios de la API
  const fetchUsers = async () => {
    setIsLoading(true); // Indicamos que estamos cargando
    setError(null);     // Limpiamos cualquier error previo
    try {
      const data = await getUsers(); // Llamamos a nuestra función API
      setUsers(data); // Actualizamos el estado con los usuarios obtenidos
    } catch (err) {
      console.error("Error fetching users in hook:", err);
      setError("No se pudieron cargar los usuarios. Intenta de nuevo más tarde."); // Establecemos un mensaje de error amigable
    } finally {
      setIsLoading(false); // Siempre indicamos que hemos terminado de cargar
    }
  };

  // Función para añadir un nuevo usuario
  const addUser = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const newUser = await createUser(userData); // Creamos el usuario
      setUsers(prevUsers => [...prevUsers, newUser]); // Añadimos el nuevo usuario al estado existente
      return newUser; // Retornamos el usuario creado por si el componente lo necesita
    } catch (err) {
      console.error("Error adding user in hook:", err);
      setError("No se pudo crear el usuario. Revisa los datos e intenta de nuevo.");
      throw err; // Re-lanzamos el error para que el componente pueda manejarlo
    } finally {
      setIsLoading(false);
    }
  };

  // Función para actualizar un usuario existente
  const updateExistingUser = async (id, userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedUser = await updateUser(id, userData); // Actualizamos el usuario
      setUsers(prevUsers => prevUsers.map(user => user.id === id ? updatedUser : user)); // Actualizamos el usuario en la lista
      return updatedUser;
    } catch (err) {
      console.error("Error updating user in hook:", err);
      setError("No se pudo actualizar el usuario. Intenta de nuevo.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para eliminar un usuario
  const deleteExistingUser = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteUser(id); // Eliminamos el usuario
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id)); // Filtramos el usuario eliminado de la lista
      return true; // Indicamos éxito
    } catch (err) {
      console.error("Error deleting user in hook:", err);
      setError("No se pudo eliminar el usuario. Intenta de nuevo.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Usamos useEffect para cargar los usuarios al montar el componente que use este hook
  // El array vacío [] como segundo argumento asegura que se ejecute solo una vez al inicio
  useEffect(() => {
    fetchUsers();
  }, []);

  // Retornamos los estados y funciones para que los componentes puedan usarlos
  return {
    users,
    isLoading,
    error,
    fetchUsers, // Puedes usarla para recargar la lista si es necesario
    addUser,
    updateExistingUser,
    deleteExistingUser
  };
};

export default useUsers;