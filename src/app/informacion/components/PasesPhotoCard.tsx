import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { pases } from "@/types";
import Image from "next/image"

interface AlertDialogProps {
  pase: pases;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PhotoPase: React.FC<AlertDialogProps> = ({ pase }) => {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex flex-col justify-between w-40">
          <p className="text-sm text-center text-zinc-500">{pase.nombre}</p>
          <Image priority src={`http://10.10.1.2:8080/images_socios/${pase.cedula}.jpg`} alt="familiar" width={200} height={200} className="h-40 w-40 rounded-lg hover:scale-105 transition" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent >
        <div className="flex">
          <Image priority src={`http://10.10.1.2:8080/images_socios/${pase.cedula}.jpg`} alt="familiar" width={100} height={100} className="rounded-sm h-52 w-52  transition " />
          <div className="flex-row flex-wrap px-4">
            <p>Accion: {pase.accion}</p>
            <p>Cedula: {pase.cedula}</p>
            <p>Celular: {pase.celular}</p>
            <p>E_mail: {pase.email}</p>
            <p>Fecha vencimiento: {pase.fecha_venc.slice(0, 10)}</p>
            <p>Carnet: {pase.nfcId}</p>
            <p>Activo: {pase.activo == 1 ? "si" : "no"}</p>
            <p>Carnet: {pase.cargo}</p>

          </div>

        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Volver</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}