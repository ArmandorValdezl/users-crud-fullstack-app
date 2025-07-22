// src/utils/dateUtils.js

/**
 * Formatea una fecha de 'YYYY-MM-DD' a 'DD/MM/YYYY'.
 * @param {string} dateString La fecha en formato de string 'YYYY-MM-DD'.
 * @returns {string} La fecha formateada 'DD/MM/YYYY' o un string vacío si es inválida.
 */
export const formatDateForDisplay = (dateString) => {
  if (!dateString) {
    return '';
  }
  try {
    const date = new Date(dateString + 'T00:00:00'); // Añadir T00:00:00 para evitar problemas de zona horaria
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses son 0-indexados
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return dateString; // Si hay error, devuelve el original
  }
};

/**
 * Formatea una fecha de un objeto Date a 'YYYY-MM-DD' para los inputs tipo 'date'.
 * @param {Date} dateObj El objeto Date.
 * @returns {string} La fecha formateada 'YYYY-MM-DD'.
 */
export const formatDateForInput = (dateObj) => {
    if (!dateObj) {
        return '';
    }
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};