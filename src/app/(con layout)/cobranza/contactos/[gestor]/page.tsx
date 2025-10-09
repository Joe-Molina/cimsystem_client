"use client"
import React from 'react'
import { ContactTable } from './components/ContactTable'
import { useParams } from 'next/navigation'; // <-- Correcto, para App Router
import useFetchContacts from './hooks/useFetchContacts'
import { Toaster } from '@/components/ui/sonner';
import { updateCuotas } from '../../asignar_contactos/utils/createContactAxios';

const ButtonFilter = ({
  filterKey,              // El valor que este botón representa (ej: 'isContact')
  activeFilterKey,        // El valor del filtro actualmente seleccionado (el estado)
  changeFilter,           // La función para cambiar el filtro
  children                // Usamos 'children' para el contenido del botón
}: {
  filterKey: string;
  activeFilterKey: string;
  changeFilter: (key: string) => void;
  children: React.ReactNode;
}) => {
  // 1. Ya no necesitas el console.log aquí.

  // 2. Comparamos filterKey con activeFilterKey para determinar si está activo.
  const isActive = filterKey === activeFilterKey;
  
  // 3. La clase ahora usa una sintaxis de template string más limpia.
  const buttonClasses = `px-4 py-2 rounded transition-colors ${
    isActive ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  }`;

  return (
    <button 
      onClick={() => changeFilter(filterKey)} // Usamos filterKey para actualizar
      className={buttonClasses}
      aria-pressed={isActive} // Mejora la accesibilidad (A11Y)
      type="button" // Especifica el tipo para evitar envíos de formulario
    >
      {children} {/* El texto del botón viene de children (lo hace reutilizable) */}
    </button>
  );
};

export default function Page() { // NO es async y NO recibe 'params'

    // 1. OBTENER el parámetro gestor usando useParams (HOOK de Cliente)
    // Asumimos que la ruta es, por ejemplo, app/clientes/[gestor]/page.tsx
    const params = useParams<{ gestor: string }>();
    const gestorIdString = params.gestor; 
    
    // Convertimos el ID a número de inmediato para usarlo en la lógica de filtrado
    const gestorId = Number(gestorIdString); 

    const {isLoadingContact,contactActions,contacts,changeFilter, FILTER_KEYS, key} = useFetchContacts(gestorId)

        if(!isLoadingContact){
          const casesWithPromisePayment = contacts.filter((caso) => caso.PromisePayment)
    
          console.log('promesas de pago: '+ casesWithPromisePayment.length)
    
                const casesWithPromiseNonPayment = contacts.filter((caso)=> caso.PromiseNonPayment)
    
          console.log('promesas de impago: '+ casesWithPromiseNonPayment.length)
        }
    return (
        <div className='bg-slate-100 h-[calc(100%-40px)] md:p-7 sm:p-1'>
            <Toaster/>
            <div className='bg-white shadow-md rounded-md p-5 h-full w-full '>
                {/* Mostramos el ID del gestor obtenido */}
                <h1 className='text-xl'>Gestor: {gestorIdString == "2" ? "Maryelin": '' } {gestorIdString == "3" ? "Gianfranco": '' } {gestorIdString == "4" ? "Daniela": '' }</h1>
                <span>{contacts.length}</span>
                <div className='flex items-center mb-3 bg-slate-100 p-2 rounded-md'>
                  <div className='flex gap-3 w-full overflow-auto'>
                    <ButtonFilter filterKey={FILTER_KEYS.ALL} changeFilter={changeFilter}  activeFilterKey={key}>Todo</ButtonFilter>
                    <ButtonFilter filterKey={FILTER_KEYS.IS_NOT_CONTACT} changeFilter={changeFilter} activeFilterKey={key} >Sin Contactar</ButtonFilter>
                    <ButtonFilter filterKey={FILTER_KEYS.IS_CONTACT} changeFilter={changeFilter} activeFilterKey={key} >Mensaje Enviado</ButtonFilter>
                    <ButtonFilter filterKey={FILTER_KEYS.IS_CONTACT_CALL} changeFilter={changeFilter} activeFilterKey={key} >Llamada realizada</ButtonFilter>
                    <ButtonFilter filterKey={FILTER_KEYS.CASE_ASIGNED} changeFilter={changeFilter} activeFilterKey={key} >Casos asignados</ButtonFilter>
                    <ButtonFilter filterKey={FILTER_KEYS.NON_AVAILABLE} changeFilter={changeFilter} activeFilterKey={key} >Imposible contactar</ButtonFilter>
                  </div>
                </div>
                <ContactTable contactActions={contactActions} contacts={contacts} isLoadingContact={isLoadingContact}/>
            </div>
        </div>
    )
}