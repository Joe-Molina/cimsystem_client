/**
 * Copia un texto dado al portapapeles utilizando el método legacy document.execCommand('copy').
 * @param {string} text El texto que se desea copiar.
 * @returns {boolean} 'true' si la copia fue exitosa, 'false' si falló.
 */
export function copiarTextoLegacy(text: string) {
  // 1. Crear un elemento de texto temporal (<textarea>)
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // 2. Ocultar el textarea de la vista del usuario
  // Esto es crucial para que no afecte el layout de la página.
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  textArea.style.top = '0';

  // 3. Añadir el textarea al DOM (necesario para poder seleccionarlo)
  document.body.appendChild(textArea);
  
  // 4. Seleccionar el texto dentro del textarea
  textArea.focus();
  textArea.select(); 

  let success = false;
  try {
    // 5. Ejecutar el comando de copia
    // document.execCommand() devolverá 'true' si la copia fue exitosa.
    success = document.execCommand('copy');
    if (success) {
      console.log('Texto copiado con éxito usando document.execCommand.');
    } else {
      console.warn('document.execCommand falló. Es posible que el navegador lo haya bloqueado.');
    }
  } catch (err) {
    console.error('Error al intentar copiar:', err);
  } finally {
    // 6. Remover el textarea del DOM
    document.body.removeChild(textArea);
  }

  return success;
}