# Gestión de Usuarios (CRUD Fullstack)

Este proyecto es una aplicación web **completa (fullstack)** diseñada para la **gestión de usuarios**, implementando las cuatro operaciones fundamentales: **Crear (Create), Leer (Read), Actualizar (Update) y Eliminar (Delete - CRUD)**.

**🎯 Objetivo Principal:**
El objetivo principal de esta aplicación es demostrar la construcción de un sistema CRUD robusto y modular, conectando un frontend desarrollado con **React.js** a un backend personalizado construido con **Node.js y Express.js**. Además, busca fortalecer habilidades clave en el desarrollo web moderno.

**💻 Tecnologías Utilizadas:**

* **Frontend**:
    * **React.js**: Biblioteca principal para la construcción de la interfaz de usuario.
    * **Vite.js**: Herramienta de construcción rápida para el entorno de desarrollo.
    * **`react-hook-form`**: Para un manejo eficiente y validación de formularios.
    * **Axios**: Cliente HTTP basado en promesas para la comunicación con la API.
    * **CSS Puro**: Estilizado personalizado para un diseño limpio y moderno.
    * **Componentes Reutilizables y `children`**: Utilización de componentes modales genéricos para mejorar la experiencia de usuario.

* **Backend (API Personalizada)**:
    * **Node.js**: Entorno de ejecución para JavaScript del lado del servidor.
    * **Express.js**: Framework web minimalista y flexible para construir la API RESTful.
    * **CORS**: Configuración para permitir la comunicación segura entre el frontend y el backend desde diferentes orígenes.
    * **Base de Datos en Memoria (Inicial)**: Para simplificar el desarrollo inicial, los datos de usuarios se gestionan temporalmente en memoria del servidor.

**⚙️ Proceso de Desarrollo:**
El proyecto se desarrolló siguiendo una metodología paso a paso, enfocándose en la modularidad y las buenas prácticas:

1.  **Inicialización de Proyectos**: Se crearon dos proyectos separados: uno para el frontend (React con Vite) y otro para el backend (Node.js con Express.js).
2.  **Desarrollo del Backend (API)**: Se construyó una API RESTful con Express.js para manejar las operaciones CRUD de usuarios, incluyendo la configuración de CORS y un sistema de almacenamiento de datos en memoria.
3.  **Conexión Frontend-Backend**: Se configuró Axios en el frontend para comunicarse con la API personalizada, asegurando una interacción fluida y sin problemas de CORS.
4.  **Gestión de Estado y Lógica de API**: Se implementó un `Custom Hook` (`useUsers`) en React para encapsular toda la lógica de obtención, creación, actualización y eliminación de usuarios, separando la lógica de negocio de los componentes de UI.
5.  **Desarrollo de Interfaz de Usuario**: Se crearon componentes como `UsersPage` (para la lista de usuarios) y `UserForm` (para la creación/edición de usuarios), utilizando CSS puro para el estilizado.
6.  **Formularios con `react-hook-form`**: Se integró `react-hook-form` para gestionar los formularios de usuario, incluyendo validaciones y reinicio.
7.  **Mejoras de Experiencia de Usuario (UX) con Modales**: Se desarrolló un componente `Modal` reutilizable (`Modal.jsx`) utilizando la propiedad `children` para mostrar el formulario de usuario, confirmar eliminaciones y notificar éxitos o errores de manera interactiva y visualmente atractiva.

---

### **Cómo Ejecutar el Proyecto Localmente:**

**1. Clonar el Repositorio:**
```bash
git clone <URL_DE_TU_REPOSITORIO_GITHUB>
cd users-crud-fullstack-app # O el nombre de tu repositorio
```

**2. Configurar y Ejecutar el Backend:**
```bash
cd users-crud-backend
npm install
npm start # La API se ejecutará en http://localhost:3000
```

**3. Configurar y Ejecutar el Frontend:**
* Abre una nueva terminal.
```bash
cd ../users-crud-react
npm install
npm run dev # La aplicación React se ejecutará en http://localhost:5173
```

**4. Acceder a la Aplicación:**
Abre tu navegador y visita `http://localhost:5173/`.

---

**¡Disfruta probando la aplicación!**