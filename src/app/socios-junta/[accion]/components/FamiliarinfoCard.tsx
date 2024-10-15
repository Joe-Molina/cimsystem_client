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

  // const [statusPhoto, setStatusPhoto] = useState(false)

  // useEffect(() => {

  //   async function call() {
  //     const tumama = await fetch(`http://10.10.1.2:8080/images_socios/${familiar.ced_fam}.jpg`)

  //     if (tumama) {
  //       setStatusPhoto(true)
  //     } else {
  //       setStatusPhoto(false)
  //     }

  //     console.log(tumama)
  //   }
  //   call()

  // }, [familiar.ced_fam])


  // console.log(statusPhoto)

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="w-52">
          <div className="h-52 w-52 min-h-52 max-w-52 overflow-hidden rounded-sm ">
            <Image priority src={`http://10.10.1.2:8080/images_socios/${familiar.ced_fam}.jpg`} alt="familiar" width={200} height={200} className="z-10 rounded-sm h-52 w-52 hover:scale-110 transition " />
          </div>
          <p className=" overflow-hidden">{familiar.nom_fam}</p>
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