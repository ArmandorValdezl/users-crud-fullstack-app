import React from 'react';
import '../styles/Modal.css'; // Crearemos este archivo de estilos a continuación

// Componente Modal que usa la prop 'children'
// Recibe:
// - isOpen: booleano para controlar la visibilidad del modal
// - onClose: función para cerrar el modal
// - children: el contenido que se renderizará dentro del modal
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null; // Si no está abierto, no renderiza nada
  }

  // Detiene la propagación del evento para que el clic dentro del contenido no cierre el modal
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // Overlay (fondo oscuro) que cierra el modal al hacer clic fuera del contenido
    <div className="modal-overlay" onClick={onClose}>
      {/* Contenido del modal, hace click fuera no cierra */}
      <div className="modal-content" onClick={handleContentClick}>
        <button className="modal-close-button" onClick={onClose}>
          &times; {/* Símbolo de "x" para cerrar */}
        </button>
        {children} {/* Aquí se renderizará cualquier cosa que le pasemos como hijo */}
      </div>
    </div>
  );
};

export default Modal;