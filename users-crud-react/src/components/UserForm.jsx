import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form'; // Importamos useForm
import '../styles/UserForm.css'; // Importamos los estilos del formulario

// Definimos los campos por defecto para un nuevo usuario
const defaultValues = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  birthday: '',
  image_url: ''
};

// Componente UserForm: reusable para crear y editar
// Recibe props:
// - onSubmit: Función que se ejecutará al enviar el formulario (manejará crear/actualizar)
// - userToEdit: Objeto de usuario si estamos en modo edición (opcional)
// - onClose: Función para cerrar el formulario/modal
const UserForm = ({ onSubmit, userToEdit, onClose }) => {
  // Inicializamos useForm
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: defaultValues // Establecemos los valores por defecto
  });

  // useEffect para rellenar el formulario si estamos editando un usuario
  useEffect(() => {
    if (userToEdit) {
      // Si hay un usuario para editar, rellenamos el formulario con sus datos
      reset(userToEdit); 
    } else {
      // Si no hay usuario para editar (modo creación), reseteamos a valores por defecto
      reset(defaultValues);
    }
  }, [userToEdit, reset]); // Se ejecuta cuando userToEdit cambia

  // Función para manejar el envío del formulario
  const handleFormSubmit = (data) => {
    onSubmit(data); // Pasamos los datos validados al prop onSubmit
    onClose(); // Cerramos el formulario después de enviar (o el modal)
  };

  return (
    <div className="form-container"> {/* Contenedor general del formulario */}
      <h2 className="form-title">{userToEdit ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h2> {/* Título dinámico */}
      <form onSubmit={handleSubmit(handleFormSubmit)}> {/* El formulario */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          {/* Input para email con registro de react-hook-form y validación */}
          <input
            type="email"
            id="email"
            {...register('email', { required: 'El email es requerido', pattern: { value: /^\S+@\S+$/i, message: 'Formato de email inválido' } })}
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>} {/* Mostrar error */}
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: 'La contraseña es requerida', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })}
          />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="first_name">Nombre:</label>
          <input
            type="text"
            id="first_name"
            {...register('first_name', { required: 'El nombre es requerido' })}
          />
          {errors.first_name && <span className="error-message">{errors.first_name.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Apellido:</label>
          <input
            type="text"
            id="last_name"
            {...register('last_name', { required: 'El apellido es requerido' })}
          />
          {errors.last_name && <span className="error-message">{errors.last_name.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="birthday">Cumpleaños:</label>
          <input
            type="date"
            id="birthday"
            {...register('birthday', { required: 'La fecha de cumpleaños es requerida' })}
          />
          {errors.birthday && <span className="error-message">{errors.birthday.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image_url">URL de Imagen (opcional):</label>
          <input
            type="url"
            id="image_url"
            {...register('image_url', { pattern: { value: /^(ftp|http|https):\/\/[^ "]+$/, message: 'URL de imagen inválida' } })}
          />
          {errors.image_url && <span className="error-message">{errors.image_url.message}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {userToEdit ? 'Guardar Cambios' : 'Crear Usuario'}
          </button>
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;