import React, { useState } from 'react'; // Importa useState
import useUsers from '../hooks/useUsers'; // Importamos nuestro custom hook
import UserForm from '../components/UserForm'; // Importa UserForm
import Modal from '../components/Modal'; // ¡Importamos nuestro nuevo componente Modal!
import '../styles/UserPage.css'; // ¡Importamos nuestros nuevos estilos de CSS puro!
import '../styles/UserForm.css'; // Importa los estilos del formulario
import { formatDateForDisplay } from '../utils/dateUtils'; // Importa la función


const UsersPage = () => {
  const { users, isLoading, error, addUser, updateExistingUser, deleteExistingUser } = useUsers();

  // Estado para controlar si el formulario está visible
  const [isFormOpen, setIsFormOpen] = useState(false);
  // Estado para guardar el usuario que vamos a editar (null si es para crear)
  const [userToEdit, setUserToEdit] = useState(null);

  // NUEVOS ESTADOS para el modal de confirmación de eliminación
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null); // Para guardar el ID del usuario a eliminar
  const [messageModal, setMessageModal] = useState({ isOpen: false, type: '', message: '' });

  // Función para manejar el envío del formulario (crear o actualizar)
  const handleUserSubmit = async (userData) => {
    try {
      if (userToEdit) {
        await updateExistingUser(userToEdit.id, userData);
        showMessageModal('success', 'Usuario actualizado correctamente.'); // Usar modal de éxito
      } else {
        await addUser(userData);
        showMessageModal('success', 'Usuario creado correctamente.'); // Usar modal de éxito
      }
      setIsFormOpen(false);
      setUserToEdit(null);
    } catch (err) {
      console.error('Error al guardar el usuario en UsersPage:', err);
      showMessageModal('error', 'Ocurrió un error al guardar el usuario. Por favor, intenta de nuevo.'); // Usar modal de error
    }
  };


  // Función para abrir el formulario en modo creación
  const openCreateForm = () => {
    setUserToEdit(null); // Asegura que no hay usuario para editar
    setIsFormOpen(true); // Abre el formulario
  };

  // Función para abrir el formulario en modo edición
  const openEditForm = (user) => {
    setUserToEdit(user); // Establece el usuario a editar
    setIsFormOpen(true); // Abre el formulario
  };

  // Función para cerrar el formulario
  const closeForm = () => {
    setIsFormOpen(false);
    setUserToEdit(null); // Siempre limpiar el usuario a editar al cerrar
  };

  // Función para manejar la eliminación de un usuario
 // Función para abrir el modal de confirmación de eliminación
  const openDeleteConfirmModal = (user) => {
    setUserToDelete(user); // Guarda el usuario completo, no solo el ID
    setIsDeleteConfirmModalOpen(true);
  };

  // Función para cerrar el modal de confirmación de eliminación
  const closeDeleteConfirmModal = () => {
    setIsDeleteConfirmModalOpen(false);
    setUserToDelete(null); // Limpia el usuario a eliminar
  };

  // Función para mostrar un mensaje en el modal (éxito o error)
  const showMessageModal = (type, message) => {
    setMessageModal({ isOpen: true, type, message });
  };

  // Función para cerrar el modal de mensajes
  const closeMessageModal = () => {
    setMessageModal({ isOpen: false, type: '', message: '' });
  };

  // Modifica handleDeleteUser para usar el modal
  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    try {
      await deleteExistingUser(userToDelete.id);
      console.log('Usuario eliminado con éxito:', userToDelete.id);
      showMessageModal('success', 'Usuario eliminado correctamente.'); // Usar modal de éxito
      closeDeleteConfirmModal();
    } catch (err) {
      console.error('Error al eliminar usuario en UsersPage:', err);
      showMessageModal('error', 'Ocurrió un error al eliminar el usuario. Por favor, intenta de nuevo.'); // Usar modal de error
    }
  };



  if (isLoading) {
    return <div className="loading-message">Cargando usuarios...</div>; // Mensaje de carga con clase CSS
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>; // Mensaje de error con clase CSS
  }

  return (
    <div className="users-page-container"> {/* Contenedor principal con clase CSS */}
      <h1 className="page-title">Lista de Usuarios</h1> {/* Título de la página con clase CSS */}

            {/* Botón para abrir el formulario de creación */}
      <button onClick={openCreateForm} className="btn-primary" style={{ marginBottom: '1.5rem' }}>
        + Crear Nuevo Usuario
      </button>

      {/* Renderizado condicional del formulario */}
      <Modal isOpen={isFormOpen} onClose={closeForm}>
        <UserForm
          onSubmit={handleUserSubmit}
          userToEdit={userToEdit}
          onClose={closeForm}
        />
      </Modal>

      {/* NUEVO: Modal de Confirmación para Eliminar */}
      <Modal isOpen={isDeleteConfirmModalOpen} onClose={closeDeleteConfirmModal}>
        <div className="confirmation-modal-content"> {/* Estilos para este contenido */}
          <h3 className="confirmation-title">Confirmar Eliminación</h3>
          {userToDelete && (
            <p className="confirmation-message">
              ¿Estás seguro de que quieres eliminar a <strong>{userToDelete.first_name} {userToDelete.last_name}</strong>? Esta acción no se puede deshacer.
            </p>
          )}
          <div className="form-actions"> {/* Reutilizamos los estilos de botones del formulario */}
            <button className="btn-danger" onClick={handleDeleteUser}>
              Sí, Eliminar
            </button>
            <button className="btn-secondary" onClick={closeDeleteConfirmModal}>
              Cancelar
            </button>
          </div>
        </div>
      </Modal>


      {/* NUEVO: Modal para mensajes de éxito o error */}
      <Modal isOpen={messageModal.isOpen} onClose={closeMessageModal}>
        <div className={`message-modal-content ${messageModal.type}`}> {/* Clase dinámica para tipo de mensaje */}
          {messageModal.type === 'success' ? (
            <img src="/src/assets/checked.png" alt="Éxito" className="message-icon" /> // O un icono SVG/PNG
          ) : (
            <img src="/src/assets/cancel.png" alt="Error" className="message-icon" /> // O un icono SVG/PNG
          )}
          <h3 className="message-title">
            {messageModal.type === 'success' ? '¡Operación Exitosa!' : '¡Error!'}
          </h3>
          <p className="message-text">{messageModal.message}</p>
          <button className="btn-primary" onClick={closeMessageModal}>
            Aceptar
          </button>
        </div>
      </Modal>
      
      {/* Aquí es donde renderizaremos las tarjetas de usuario */}
      <div className="users-grid">
        {users.length === 0 && !isFormOpen ? ( // Solo si no hay usuarios y el form no está abierto
          <p className="no-users-message">No hay usuarios registrados. ¡Crea uno!</p>
        ) : (
          users.map(user => (
            <div key={user.id} className="user-card">
              <h2 className="user-card-title">{user.first_name} {user.last_name}</h2>
              <p>Email: {user.email}</p>
               <p>Cumpleaños: {formatDateForDisplay(user.birthday)}</p>
              {user.image_url && (
                <img src={user.image_url} alt={`${user.first_name}`} className="user-card-image" />
              )}
              <div className="user-card-actions">
                <button 
                  className="btn-primary" 
                  onClick={() => openEditForm(user)} // Conectado a la función de edición
                >
                  Editar
                </button>
                <button 
                  className="btn-danger" 
                  onClick={() => openDeleteConfirmModal(user)}  // Conectado a la función de eliminación
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UsersPage;