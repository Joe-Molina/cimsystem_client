import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { familiares } from "@/types";
import Image from "next/image"
// import { useEffect, useState } from "react";

interface AlertDialogProps {
  familiar: familiares;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PhotoFamiliar: React.FC<AlertDialogProps> = ({ familiar }) => {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex flex-col justify-center items-center w-40 z-10">
          <Image priority src={`http://10.10.1.2:8080/images_socios/${familiar.ced_fam}.jpg`} alt="familiar" width={200} height={200} className="h-32 w-32 rounded-lg hover:scale-105 transition z-20" />
          <p className="text-[12px] text-center text-zinc-500">{familiar.nom_fam}</p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent >
        <div className="flex">
          <Image priority src={`http://10.10.1.2:8080/images_socios/${familiar.ced_fam}.jpg`} alt="familiar" width={100} height={100} className="rounded-sm h-52 w-52  transition " />
          <div className="flex-row flex-wrap px-4">
            <p>Accion: {familiar.accion}</p>
            <p>Cedula: {familiar.ced_fam}</p>
            {familiar.cel_fam && <p>Celular: {familiar.cel_fam}</p>}
            <p>edo civil: {familiar.edo_civil == true ? "Soltero/a" : "Casado/a"}</p>
            <p>Email: {familiar.email_fam}</p>
            <p>Fecha nacimiento: {familiar.fec_fam.slice(0, 10)}</p>
            <p>Carnet: {familiar.nfcId}</p>
            <p>Sexo: {familiar.sexo_fam == 1 ? "Masculino" : "Femenino"}</p>
            <p>Parentesco: {familiar.par_fam}</p>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Volver</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}