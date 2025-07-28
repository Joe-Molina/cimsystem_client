'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useFormContext } from '../hooks/useForm'
import ArchiveType from './Form/ArchiveType'
import ArchiveOrBanner from './Form/ArchiveOrBanner'
import DurationCard from './Form/DurationCard'
import Dates from './Form/Dates'
import { verificarArchivo } from './Form/services/verificarArchivo'
import { usePostsContext } from '../hooks/usePosts'
import {

  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
} from "@/components/ui/sheet"
import { serviceSubirArchivoACarpeta } from '../services/subirPublicacion'
import { useIpContext } from '../hooks/useIp'


const INITIAL_STATE = {
  id: 0,
  name: "",
  type: "img",
  position: 0,
  duration: 0,
  fecha_inicio: new Date,
  Fecha_Fin: new Date,
}

export function Form() {
  const { postsState } = usePostsContext()
  const data = postsState.Posts
  const { IpState } = useIpContext()

  const [file, setFile] = useState()
  const { formState, setEmptyForm } = useFormContext();
  const { setPost } = usePostsContext()


  const handleClick = async () => {
    console.log(file)
    const datos = await verificarArchivo(data, file, formState, IpState)

    if (datos) {
      setPost(datos)
      setEmptyForm(INITIAL_STATE)
    }
    if (file) {
      await serviceSubirArchivoACarpeta(file, IpState);

    }
  }


  return (
    <SheetContent className=''>
      <SheetHeader>
        <SheetDescription className='text-neutral-900'>Sube una publicacion o un banner.</SheetDescription>
        <div className=' text-neutral-900'>
          <form className='flex flex-col p-5 gap-4' >
            <ArchiveType />
            <ArchiveOrBanner setFile={setFile} />
            <DurationCard />
            <Dates />
          </form>
        </div >
      </SheetHeader>
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit" onClick={() => { handleClick() }}>Subir Imagen</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>


  )
}
