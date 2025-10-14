import React, { useEffect, useState } from 'react'
import { getContacts, updateContact, updateContactAvailable, updateContactCall, updateResponse, updateResponseCall } from '../contactos/[gestor]/utils/getContactAxios';
import { ContactActions, ContactProps } from '../contactos/types/types';
import { toast } from 'sonner';
import { format } from '@formkit/tempo';
import { useAllCobranzaInfo } from '../react_query_hooks/useCobranza';
import { useCases } from '../react_query_hooks/useCases';
// import { useCases } from '../../../react_query_hooks/useCases';
// import useFetchCaseWithCuotas from './useCasesWithCuotas';


export function useFilterCasesByGestor(gestorId: number) { // 👈 Nombre mejorado

  const [contactsPrimary, setContactsPrimary] = useState<ContactProps[]>([]);
  const [contacts, setContacts] = useState<ContactProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 👈 Añadir estado de carga
  const [error, setError] = useState<string | null>(null); // 👈 Añadir estado de error
    const {query: {data: deudas}} = useAllCobranzaInfo()
    const {query: {data: casos}} = useCases()
     
    useEffect(() => {
        const cargarData = async () => {
            try {
              if (casos && Array.isArray(casos) && deudas) {

                const casosFiltrados = casos.filter(caso => caso.userId === gestorId)

                casosFiltrados.map(caso => {
                  const deuda = deudas.filter(deuda => deuda.accion === caso.accion)

                  if (deuda) {
                    caso.cuotasActuales = deuda[0].cant_cuotas_vencidas
                    caso.nombre = deuda[0].nombre
                  }
                })
                setContacts(casosFiltrados);
                setContactsPrimary(casosFiltrados);
                          }
              setError(null); // Limpiar errores si tuvo éxito

            } catch (err) {
                // ⚙️ Manejo de errores
                console.error("Error al cargar la cobranza:", err);
                setError('No se pudieron cargar los datos de cobranza.'); 
                setContactsPrimary([]); // Asegurar que los datos estén vacíos en caso de error
            } finally {
                // 🏁 Se ejecuta siempre, para indicar que la carga terminó
                setIsLoading(false); 
            }
        };
        cargarData();

    }, [deudas, casos]); // 🚀 Array de dependencias vacío para ejecutar solo en el montaje

  const actualizarContacto = async (id: number) => {
    console.log('apretado')
    const update = await updateContact(id)

    if(update){
      toast(`contacto actualizado`, {
        description: format(new Date(), "full"),
      })
    }

    setContactsPrimary(
      prevContacts => {
        return prevContacts.map(contact => {
          if (contact.id == update.id) {
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

    if (update) {
      toast(`contacto actualizado`, {
        description: format(new Date(), "full"),
      })
    }

    setContactsPrimary(
      prevContacts => {
        return prevContacts.map(contact => {
          if (contact.id == update.id) {
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

  const actualizarContactoCall = async (id: number) => {
    console.log('apretado')
    const update = await updateContactCall(id)

    if (update) {
      toast(`contacto actualizado`, {
        description: format(new Date(), "full"),
      })
    }

    setContactsPrimary(
      prevContacts => {
        return prevContacts.map(contact => {
          if (contact.id == update.id) {
            return {
              ...contact,
              contactCall: true,
            }
          }
          return contact
        })
      }

    )
  }

  const actualizarResponseCall = async (id: number) => {
    console.log('apretado')
    const update = await updateResponseCall(id)

    if (update) {
      toast(`contacto actualizado`, {
        description: format(new Date(), "full"),
      })
    }

    setContactsPrimary(
      prevContacts => {
        return prevContacts.map(contact => {
          if (contact.id == update.id) {
            return {
              ...contact,
              responseCall: true
            }
          }
          return contact
        })
      }

    )
  }

  const actualizarContactAvailable = async (id: number) => {
    console.log('apretado')
    const update = await updateContactAvailable(id)

    if (update) {
      toast(`contacto actualizado`, {
        description: format(new Date(), "full"),
      })
    }

    setContactsPrimary(
      prevContacts => {
        return prevContacts.map(contact => {
          if (contact.id == update.id) {
            return {
              ...contact,
              contactAvailable: true
            }
          }
          return contact
        })
      }

    )
  }

  

  const FILTER_KEYS = {
    ALL: 'all',
    IS_CONTACT: 'isContact',
    IS_NOT_CONTACT: 'isNotContact',
    IS_CONTACT_CALL: 'isContactCall',
    IS_NOT_CONTACT_CALL: 'isNotContactCall',
    CASE_ASIGNED: 'caseAsigned',
    NON_AVAILABLE: 'nonAvailable',
    PAYMENT: 'payment'
  };

  const [activeFilterKey, setActiveFilterKey] = useState(FILTER_KEYS.ALL);

  const filterFunctions = {
    [FILTER_KEYS.ALL]: (contacts: ContactProps[]) => contacts, // Devuelve todos los contactos
    [FILTER_KEYS.IS_CONTACT]: (contacts: ContactProps[]) =>
      contacts.filter((contact: ContactProps) => contact.contact === true && contact.contactCall == false && contact.response == false && contact.responseCall == false && contact.caseStatus == false), // Contactos donde 'contact' es verdadero
    [FILTER_KEYS.IS_NOT_CONTACT]: (contacts: ContactProps[]) =>
      contacts.filter((contact: ContactProps) => contact.contact === false && contact.contactCall === false && contact.contactAvailable == false && contact.caseStatus == false),
    [FILTER_KEYS.IS_CONTACT_CALL]:(contacts: ContactProps[]) =>
      contacts.filter((contact: ContactProps) => contact.contactCall === true && contact.contactAvailable == false && contact.responseCall == false && contact.response == false), 
    [FILTER_KEYS.IS_NOT_CONTACT_CALL]: (contacts: ContactProps[]) =>
      contacts.filter((contact: ContactProps) => contact.contactCall === false), 
    [FILTER_KEYS.CASE_ASIGNED]: (contacts: ContactProps[]) =>
      contacts.filter((contact: ContactProps) => contact.contactAvailable == false && (contact.response === true || contact.responseCall === true || contact.caseStatus)), 
    [FILTER_KEYS.NON_AVAILABLE]: (contacts: ContactProps[]) =>
      contacts.filter((contact: ContactProps) => contact.contactAvailable === true ), 
    // [FILTER_KEYS.PAYMENT]: (contacts: ContactProps[]) =>   
      // contacts.filter((contact: ContactProps) => {
      //   const compareCoutes = data!.filter((cobranza) => cobranza.accion == contact.accion)
      //   contact.cuotasIniciales 
      // })
    //  , 
  };

  const changeFilter = (key: string) => {
    if (filterFunctions.hasOwnProperty(key)) {
      setActiveFilterKey(key);
    } else {
      console.error(`Clave de filtro desconocida: ${key}`);
    }
  };

  useEffect(() => {
    // 1. Obtiene la función de filtrado basada en la clave activa.
    const currentFilterFunction = filterFunctions[activeFilterKey];

    // 2. Aplica el filtro y actualiza el estado 'contacts'.
    if (currentFilterFunction) {
      const newContacts = currentFilterFunction(contactsPrimary);
      setContacts(newContacts);
    }
  }, [activeFilterKey, contactsPrimary]); 

  const contactActions: ContactActions = {
    actualizarContacto,
    actualizarResponse,
    actualizarContactoCall,
    actualizarResponseCall,
    actualizarContactAvailable
  }

    // 📦 Devolver todos los estados necesarios
    return {  changeFilter, FILTER_KEYS, key: activeFilterKey, contacts: contacts,  isLoadingContact:isLoading, error, contactActions }; 
}