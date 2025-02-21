import { useState } from 'react';

// Definición de tipos para el valor de retorno del hook


export const useToggle = (initialState: boolean = false) => {
  const [isVisible, setIsVisible] = useState<boolean>(initialState);

  // Función para alternar
  const toggleVisibility = () => setIsVisible(prevState => !prevState);

  // Funciones para establecer valores específicos
  const showContent = () => setIsVisible(true);
  const hideContent = () => setIsVisible(false);

  return {
    isVisible,
    toggleVisibility,
    showContent,
    hideContent
  }
};