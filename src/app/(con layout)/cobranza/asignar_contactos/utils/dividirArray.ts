import { Cobranza_info } from "../../components/DataTable";

export function dividirArrayEnPartes(array: Cobranza_info[], partes: number) {
  // 1. Calcular el tamaño base de cada sub-array.
  // Math.ceil asegura que siempre tengamos al menos 1 elemento en el resultado
  // si el array original no está vacío.
  const tamanoChunk = Math.ceil(array.length / partes);

  // 2. Usar map para crear los sub-arrays.
  // Creamos un array del tamaño de 'partes' (ej: [0, 1, 2] para 3 partes).
  // Y luego usamos ese índice para calcular dónde cortar.
  return Array.from({ length: partes }, (_, index) => {
    // Calculamos el índice de inicio del corte.
    const inicio = index * tamanoChunk;

    // Usamos slice para cortar el array original.
    // slice(inicio, fin)
    return array.slice(inicio, inicio + tamanoChunk);
  }).filter(chunk => chunk.length > 0); // Filtramos sub-arrays vacíos si los hay (p. ej., si el array original era más pequeño que 'partes')
}