"use client"
import React, { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import { getContacts, updateContact, updateResponse } from './utils/getContactAxios'
import { ContactTable } from './components/ContactTable'
import { useParams } from 'next/navigation'; // <-- Correcto, para App Router

// Mantenemos la interfaz
export interface ContactProps {
    id: number
    createdAt: Date
    userId: number
    accion: string
    contact: boolean
    contact_createdAt?: Date
    response: boolean
    response_createdAt?: Date
}


export default function Page() { // NO es async y NO recibe 'params'

    // 1. OBTENER el parámetro gestor usando useParams (HOOK de Cliente)
    // Asumimos que la ruta es, por ejemplo, app/clientes/[gestor]/page.tsx
    const params = useParams<{ gestor: string }>();
    const gestorIdString = params.gestor; 
    
    // Convertimos el ID a número de inmediato para usarlo en la lógica de filtrado
    const gestorId = Number(gestorIdString); 


    const [contacs, setContacs] = useState<ContactProps[]>([])

    // 2. La lógica de filtrado usa el gestorId obtenido del hook
    const ContactosAsignados = async () => {
        // Manejo de caso donde el ID no es válido o está ausente (debería ser raro si es ruta dinámica)
        if (isNaN(gestorId)) {
            console.error("ID de gestor no válido:", gestorIdString);
            return;
        }

        try {
            const contactosResponse = await getContacts();
            
            // Asumiendo que getContacts() retorna el array directamente o tiene una propiedad 'data'
            const contactos = contactosResponse.data || contactosResponse; 
            
            if (contactos && Array.isArray(contactos)) {
                // Filtramos por el ID numérico
                const gestorContacts = contactos.filter((contacto: ContactProps) => 
                    contacto.userId === gestorId
                );
                setContacs(gestorContacts);
            }
        } catch (error) {
            console.error("Error fetching contacts:", error);
            // Manejar error de forma visible para el usuario si es necesario
        }
    }

    const actualizarContacto = async (id: number) => {
      console.log('apretado')
        const update = await updateContact(id)

        setContacs(
          prevContacts => {
            return prevContacts.map(contact => {
              if(contact.id == update.id) {
                return {
                  ...contact,
                  contact: true
                }
              }
              return contact
            })
          }

        )
    }

        const actualizarResponse = async (id: number) => {
      console.log('apretado')
        const update = await updateResponse(id)

        setContacs(
          prevContacts => {
            return prevContacts.map(contact => {
              if(contact.id == update.id) {
                return {
                  ...contact,
                  response: true
                }
              }
              return contact
            })
          }

        )
    }

    // 3. Ejecutamos la función asíncrona al montar
    useEffect(() => {
        ContactosAsignados()
    }, [gestorIdString]) // Dependencia: re-ejecutar si el gestor cambia (navegación en la misma página)

    return (
        <div className='bg-slate-100 h-full p-7'>
            <Toaster />
            <div className='bg-white shadow-md rounded-md p-5 h-full w-full'>
                {/* Mostramos el ID del gestor obtenido */}
                <h1 className='text-xl'>Gestor ID: {gestorIdString == "2" ? "Maryeling": '' } {gestorIdString == "3" ? "Gianfranco": '' } {gestorIdString == "4" ? "Daniela": '' }</h1>
                {contacs && <ContactTable contacts={contacs} actualizarContacto={actualizarContacto} actualizarResponse={actualizarResponse}/>}
            </div>
        </div>
    )
}