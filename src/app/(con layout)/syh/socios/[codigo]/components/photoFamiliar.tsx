import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { familiarSYH } from "@/types";
import Image from "next/image"
import { useState } from "react";
// import { useEffect, useState } from "react";

interface AlertDialogProps {
  familiar: familiarSYH;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PhotoFamiliar: React.FC<AlertDialogProps> = ({ familiar }) => {

  const url = `http://10.10.1.2:8080/images_socios/${familiar.cedula}.jpg`

  const [imgSrc, setImgSrc] = useState(url)

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex flex-col justify-start items-center w-40 z-10">
          <Image priority src={imgSrc} onError={() => { setImgSrc("/perfil.png") }} alt="familiar" width={200} height={200} className="h-32 w-32 rounded-lg hover:scale-105 transition z-20" />
          <p className="text-[12px] text-center text-zinc-500">{familiar.nombre}</p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent >
        <div className="flex">
          <Image priority src={imgSrc} onError={() => { setImgSrc("/perfil.png") }} alt="familiar" width={100} height={100} className="rounded-sm h-52 w-52  transition " />
          <div className="flex-row flex-wrap px-4">
            <div className="flex gap-1">
              <p className="text-sm text-zinc-800">Accion:</p>
              <p className="text-sm text-zinc-500">{familiar.codigo_socios}</p>

            </div>
            <div className="flex gap-1">
              <p className="text-sm text-zinc-800">Cedula:</p>
              <p className="text-sm text-zinc-500"> {familiar.cedula}</p>
            </div>
            <div className="flex gap-1">
              <p className="text-sm text-zinc-800">Email:</p>
              <p className="text-sm text-zinc-500">{familiar.email}</p>
            </div>
            <div className="flex gap-1">
              <p className="text-sm text-zinc-800">Fecha nacimiento: </p>
              <p className="text-sm text-zinc-500">{familiar.fechanac.slice(0, 10)}</p>
            </div>
            <div className="flex gap-1">
              <p className="text-sm text-zinc-800">Carnet: </p>
              <p className="text-sm text-zinc-500">{familiar.carnet}</p>
            </div>
            <div className="flex gap-1">
              <p className="text-sm text-zinc-800">Sexo:</p>
              <p className="text-sm text-zinc-500">{familiar.sexo == "1" ? "Masculino" : "Femenino"}</p>
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Volver</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}