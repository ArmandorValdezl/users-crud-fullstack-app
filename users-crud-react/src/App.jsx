import { useState } from 'react'
import './App.css'
import './index.css'; // Asegúrate de que los estilos globales estén importados
import UsersPage from './pages/UsersPage'; // Importamos nuestra página de usuarios
import './styles/UserPage.css'; // ¡Importamos también aquí nuestros estilos globales de tarjeta si queremos que afecte a todo!

function App() {
  return (
    // Aquí es donde puedes aplicar estilos globales a tu aplicación si lo necesitas
    <div className="app-container"> {/* Fondo y fuente generales */}
      <UsersPage /> {/* Renderizamos nuestra página de usuarios */}
    </div>
  );
}

export default App;
