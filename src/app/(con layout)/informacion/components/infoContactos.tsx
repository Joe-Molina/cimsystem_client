
import { Socio } from '@/types'
import React from 'react'

interface sectionInfoContactProps {
  title: string
  info: string
}

interface InfoContactProps {
  socio: Socio
}

const SectionInfoContacts: React.FC<sectionInfoContactProps> = ({ title, info = "Sin Info" }) => {
  return (
    <div className='flex gap-1'>
      <p className='text-sm font-normal text-zinc-800'>{title}</p>
      <p className='text-sm font-normal text-zinc-500'> {info}</p>
    </div>
  )
}


export const InfoContactos: React.FC<InfoContactProps> = ({ socio }) => {
  return (
    <section className="flex gap-2 h-[45vh]">

      <div className="flex flex-row justify-evenly items-start flex-wrap w-full gap-5 border p-3 rounded-lg overflow-y-auto">
        <section className='flex flex-col gap-5 h-60 w-72 text-sm font-medium'>
          <h3>Contactos Socio</h3>
          <SectionInfoContacts title='Celular:' info={socio.celular} />
          <SectionInfoContacts title='Telefonos:' info={socio.telefonos} />
          <SectionInfoContacts title='Email:' info={socio.e_mail} />
        </section>
        <section className='flex flex-col gap-5 h-60 w-72 font-bold'>
          <h3>Contactos del trabajo</h3>
          <SectionInfoContacts title='Telefonos:' info={socio.telefonos_tra} />
        </section>
        <section className='flex flex-col gap-5 h-60 w-72 font-bold'>
          <h3>Contactos del rep. Juridico</h3>
          <SectionInfoContacts title='Celular:' info={socio.cedula_rep} />
          <SectionInfoContacts title='Telefonos:' info={socio.telefonos_rep} />
          <SectionInfoContacts title='Email:' info={socio.e_mail_rep} />
        </section>
      </div>

    </section>
  )
}
