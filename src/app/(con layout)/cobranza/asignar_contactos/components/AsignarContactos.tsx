'use client'
import React, { useEffect, useState } from 'react'
import { Cobranza_info } from '../../components/DataTable'
import { dividirArrayEnPartes } from '../utils/dividirArray';
import { crearCaso } from '../utils/createContactAxios';
// import { crearContacto } from '../utils/createContactAxios';

export function AsignarContactos({socios}: {socios:Cobranza_info[]}) {

  const [deudas, setdeudas] = useState<Cobranza_info[]>([]);

  const [rango_cuotas, setRango_cuotas] = useState({desde: 0, hasta: 70})

  const buscarDesde = (num: number) =>   setRango_cuotas({
      ...rango_cuotas,
      desde: num,
    });

      const buscarHasta = (num: number) =>   setRango_cuotas({
      ...rango_cuotas,
      hasta: num,
    });

  useEffect(() => {setdeudas(socios)}, [])

  useEffect(() => {console.log(rango_cuotas); filtrarPorCuotas(rango_cuotas.desde, rango_cuotas.hasta)}, [rango_cuotas])

  const filtrarPorCuotas = (desde: number, hasta: number) => {

      const newDeuda = socios.filter(deuda => {
        return deuda.cant_cuotas_vencidas >= desde && deuda.cant_cuotas_vencidas <= hasta
      })

      setdeudas(newDeuda)
  }

const contactos_divididos: Cobranza_info[][] = dividirArrayEnPartes(deudas, 3)
const contactos_divididos_en_2: Cobranza_info[][] = dividirArrayEnPartes(deudas, 2)

const asignarContactos = async (contactos_divididos: Cobranza_info[][]) => {
    // 1. Definir los arrays de promesas (la ejecución comienza aquí)
    const promesas0 = contactos_divididos[0].map(deuda => crearCaso({user: 2, accion: deuda.accion, cuotasIniciales: deuda.cant_cuotas_vencidas}));
    const promesas1 = contactos_divididos[1].map(deuda => crearCaso({user: 3, accion: deuda.accion, cuotasIniciales: deuda.cant_cuotas_vencidas}));
    const promesas2 = contactos_divididos[2].map(deuda => crearCaso({user: 4, accion: deuda.accion, cuotasIniciales: deuda.cant_cuotas_vencidas}));

    // 2. Esperar a que TODOS los grupos terminen al mismo tiempo
    await Promise.all([
        ...promesas0, // Combina todos los arrays de promesas en uno solo
        ...promesas1,
        ...promesas2,
    ]);
    
    // 3. El log debe reflejar que todos terminaron
    console.log("Todos los contactos de los 3 grupos han sido creados.");
  };

const asignarContactosDosPersonas = async (contactos_divididos: Cobranza_info[][]) => {
    // 1. Definir los arrays de promesas (la ejecución comienza aquí)
    const promesas0 = contactos_divididos[0].map(deuda => crearCaso({user: 2, accion: deuda.accion, cuotasIniciales: deuda.cant_cuotas_vencidas}));
    const promesas1 = contactos_divididos[1].map(deuda => crearCaso({user: 3, accion: deuda.accion, cuotasIniciales: deuda.cant_cuotas_vencidas}));

    // 2. Esperar a que TODOS los grupos terminen al mismo tiempo
    await Promise.all([
        ...promesas0, // Combina todos los arrays de promesas en uno solo
        ...promesas1,
    ]);
    
    // 3. El log debe reflejar que todos terminaron
    console.log("Todos los contactos de los 2 grupos han sido creados.");
  };

  return (
      <div className='bg-white shadow-md rounded-md p-5 h-full w-full'>
        <div>
        <p>cant deudores: {deudas.length}</p>
        <p>buscando cuotas desde: {rango_cuotas.desde} - {rango_cuotas.hasta}</p>

       <div className='border flex'>
        <p>seleccionar cuotas desde:</p>
         <input type="number" name="desde" id="" onChange={(e) => buscarDesde(Number(e.target.value))}/>
       </div>
       <div  className='border flex'>
        <p>seleccionar cuotas hasta:</p>
        <input type="number" name="hasta" id="" onChange={(e) => buscarHasta(Number(e.target.value))}/>
       </div>
        </div>

        <div>
          <p>acciones para "gestor 1" : {contactos_divididos[0] && contactos_divididos[0].length}</p>
          <p>acciones para "gestor 2" : {contactos_divididos[1] && contactos_divididos[1].length}</p>
          <p>acciones para "gestor 3" : {contactos_divididos[2] && contactos_divididos[2].length}</p>  
        </div>

        <button className='bg-slate-400 rounded-sm px-2' onClick={() => asignarContactos(contactos_divididos)}>
          asignar contactos
        </button>


        
        <div>
          <p>acciones para "gestor 1" : {contactos_divididos_en_2[0] && contactos_divididos_en_2[0].length}</p>
          <p>acciones para "gestor 2" : {contactos_divididos_en_2[1] && contactos_divididos_en_2[1].length}</p>
        </div>
                <button className='bg-slate-400 rounded-sm px-2' onClick={() => asignarContactosDosPersonas(contactos_divididos)}>
          asignar contactos a solo 2 personas
        </button>
      </div>
  )
}
