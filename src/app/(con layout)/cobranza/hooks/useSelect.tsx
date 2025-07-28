import { useState } from 'react';

// Definimos un tipo para las opciones del select
type SelectOption = string;

// Custom hook para manejar el estado de un select
const useSelect = (initialValue: SelectOption = '') => {
  const [selectedOption, setSelectedOption] = useState<SelectOption>(initialValue);
  const [factura, setFactura] = useState<string>();

  // Función para manejar el cambio en el select
  // eslint-disable-next-line @typescript-eslint/no-explicit-any


  return {
    selectedOption,
    setSelectedOption,
    factura,
    setFactura
  };
};

export default useSelect;