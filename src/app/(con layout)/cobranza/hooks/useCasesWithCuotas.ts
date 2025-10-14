import React, { useEffect, useState } from 'react'
import { ContactProps } from '../contactos/types/types';
import { useAllCobranzaInfo } from '../react_query_hooks/useCobranza';
import { useCases } from '../react_query_hooks/useCases';

export function useGetCasesWithCuotas() { // 👈 Nombre mejorado

  const [cases, setCases] = useState<ContactProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 👈 Añadir estado de carga
  const [error, setError] = useState<string | null>(null); // 👈 Añadir estado de error
  const {query: {data: deudas}} = useAllCobranzaInfo()
  const {query: {data: casos}} = useCases()

    useEffect(() => {
        const cargarData = async () => {
          try {
            if (casos && Array.isArray(casos) && deudas) {
                    casos.map(caso => {
                       const deuda = deudas.filter(deuda => deuda.accion === caso.accion)

                    if(deuda) {
                        caso.cuotasActuales = deuda[0].cant_cuotas_vencidas
                      caso.nombre = deuda[0].nombre
                      }
                    })
                    setCases(casos);
                          }
              setError(null); // Limpiar errores si tuvo éxito
            } catch (err) {
                // ⚙️ Manejo de errores
                console.error("Error al cargar la cobranza:", err);
                setError('No se pudieron cargar los datos de cobranza.'); 

            } finally {
                // 🏁 Se ejecuta siempre, para indicar que la carga terminó
                  setIsLoading(false);
            }
        };

        cargarData();

    }, [casos, deudas]); // 🚀 Array de dependencias vacío para ejecutar solo en el montaje
    // 📦 Devolver todos los estados necesarios

    return {cases,  isLoadingCases: isLoading }; 
}