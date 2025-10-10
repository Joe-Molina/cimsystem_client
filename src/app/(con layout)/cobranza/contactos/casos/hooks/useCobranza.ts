import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Cobranza_info } from '../../../components/DataTable'
import { ContactProps } from '../../types/types';
import { useAllCobranzaInfo } from '../../../react_query_hooks/useCobranza';

export default function useFetchCobranza({ accion }: { accion: string }) { // 👈 Nombre mejorado

  const [cobranza, setCobranza] = useState<Cobranza_info>();
  const [cobranzas, setCobranzas] = useState<Cobranza_info[]>();
  const [isLoadingCobranza, setIsLoading] = useState<boolean>(true); // 👈 Añadir estado de carga
  const [error, setError] = useState<string | null>(null); // 👈 Añadir estado de error

  const { query: { data } } = useAllCobranzaInfo()

  
  useEffect(() => {
    const cargarData = async () => {
      try {

        if(data){
          const getCobranza = data!.filter((data) => data.accion == accion)
  
          setCobranza(getCobranza[0]);
          setCobranzas(data);
          setError(null); // Limpiar errores si tuvo éxito
        }

      } catch (err) {
        // ⚙️ Manejo de errores
        console.error("Error al cargar la cobranza:", err);
        setError('No se pudieron cargar los datos de cobranza.');
        // setCobranza(); // Asegurar que los datos estén vacíos en caso de error

      } finally {
        // 🏁 Se ejecuta siempre, para indicar que la carga terminó
        setIsLoading(false);
      }
    };
    cargarData();
    // 🗑️ Función de limpieza de useEffect (opcional pero recomendable)
    // para prevenir posibles warnings si el componente se desmonta 
    // antes de que la promesa de Axios se resuelva.
    // En este caso, Axios no tiene un método de 'cancelación' nativo
    // para una petición simple, pero el concepto es importante.

  }, [data]); // 🚀 Array de dependencias vacío para ejecutar solo en el montaje

  // 📦 Devolver todos los estados necesarios
  return { cobranzas, cobranza, isLoadingCobranza, error };
}