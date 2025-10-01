import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Cobranza_info } from '../../../components/DataTable'

export default function useFetchCobranzas() { // 👈 Nombre mejorado

    const [cobranzas, setCobranzas] = useState<Cobranza_info[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); // 👈 Añadir estado de carga
    const [error, setError] = useState<string | null>(null); // 👈 Añadir estado de error

    useEffect(() => {
        const cargarData = async () => {
            try {
              const response = await axios('http://10.10.1.4:3000/cobranza');
                const data: Cobranza_info[] = response.data;

                setCobranzas(data);
                setError(null); // Limpiar errores si tuvo éxito

            } catch (err) {
                // ⚙️ Manejo de errores
                console.error("Error al cargar la cobranza:", err);
                setError('No se pudieron cargar los datos de cobranza.'); 
                setCobranzas([]); // Asegurar que los datos estén vacíos en caso de error

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

    }, []); // 🚀 Array de dependencias vacío para ejecutar solo en el montaje

    // 📦 Devolver todos los estados necesarios
    return { cobranzas, isLoading, error }; 
}