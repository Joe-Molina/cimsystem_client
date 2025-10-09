// import { create } from 'zustand';

// // Estado inicial del store
// const initialState = {
//   data: null, // Los datos de la API
//   loading: false, // Indica si la solicitud está en curso
//   error: null, // Cualquier error que pueda ocurrir
// };

// // Crea el store de Zustand
// const useFetchStore = create((set) => ({
//   ...initialState, // Inicializa con el estado base

//   // Función para iniciar la carga (setting loading to true)
//   startLoading: () => set({ loading: true, error: null }),

//   // Función para manejar el éxito (setting data and loading to false)
//   fetchSuccess: (data) => set({
//     data: data,
//     loading: false,
//     error: null
//   }),

//   // Función para manejar el error (setting error and loading to false)
//   fetchError: (error) => set({
//     error: error.message || 'An unknown error occurred',
//     loading: false,
//     data: null
//   }),

//   // Función para resetear el estado
//   resetState: () => set(initialState),
// }));

// export default useFetchStore;