/* eslint-disable @typescript-eslint/no-explicit-any */
export const verificarEstadoActividad = (fechaInicio: any, fechaFin: any) => {
  // Comprobación de tipo de datos para las fechas
  if (!(fechaInicio instanceof Date) || !(fechaFin instanceof Date)) {
    fechaInicio = new Date(fechaInicio)
    fechaFin = new Date(fechaFin)

  }
  // Nombres de variables más descriptivos
  const fechaDeInicio = fechaInicio.getTime();
  const fechaDeFin = fechaFin.getTime();

  // Comparación concisa usando AND lógico (&&)
  const resultado = fechaDeInicio < Date.now() && fechaDeFin > Date.now();
  return resultado
};