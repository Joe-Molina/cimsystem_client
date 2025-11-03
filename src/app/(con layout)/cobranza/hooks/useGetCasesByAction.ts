import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ContactProps } from '../contactos/types/types';
import { useCases } from '../react_query_hooks/useCases';

export function useGetCasesByAction({ accion }: { accion: string }) { // 👈 Nombre mejorado

  const [cases, setCases] = useState<ContactProps[]>([]);
  // const [casesHistory, setCasesHistory] = useState<ContactProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 👈 Añadir estado de carga
  const [error, setError] = useState<string | null>(null); // 👈 Añadir estado de error
  const {casesHistory: {data}} = useCases()

  useEffect(() => {
    const cargarData = async () => {
      try {
        const casos = data!.toReversed()
        const cases = casos.filter(caso => caso.accion == accion)
        
        setCases(cases);
        setError(null); // Limpiar errores si tuvo éxito

      } catch (err) {
        // ⚙️ Manejo de errores
        console.error("Error al cargar la cobranza:", err);
        setError('No se pudieron cargar los datos de cobranza.');
        setCases([]); // Asegurar que los datos estén vacíos en caso de error

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

  }, [data]); // 
  return { cases,  isLoading, error };
}