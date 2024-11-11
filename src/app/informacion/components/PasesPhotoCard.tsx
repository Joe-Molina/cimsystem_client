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

interface sectionInfoPasesProps {
  titulo: string
  info: string
}


const SectionInfoPases: React.FC<sectionInfoPasesProps> = ({ titulo, info }) => {

  return (
    <div className="flex gap-1">
      <p className="text-sm text-zinc-800">{titulo}</p>
      <p className="text-sm text-zinc-500">{info}</p>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PhotoPase: React.FC<AlertDialogProps> = ({ pase }) => {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex flex-col items-center justify-between w-40 z-10">
          <Image priority src={`http://10.10.1.2:8080/images_socios/${pase.cedula}.jpg`} alt="familiar" width={200} height={200} className="h-32 w-32 rounded-lg hover:scale-105 transition z-20" />
          <p className="text-[12px] text-zinc-500">{pase.nombre}</p>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent >
        <div className="flex">
          <Image priority src={`http://10.10.1.2:8080/images_socios/${pase.cedula}.jpg`} alt="familiar" width={100} height={100} className="rounded-sm h-52 w-52  transition " />
          <div className="flex-row flex-wrap px-4">
            <SectionInfoPases info={pase.accion} titulo={'Accion:'} />
            <SectionInfoPases info={pase.cedula} titulo={'Cedula:'} />
            <SectionInfoPases info={pase.celular} titulo={'Celular:'} />
            <SectionInfoPases info={pase.email} titulo={'E_mail:'} />
            <SectionInfoPases info={pase.fecha_venc} titulo={'Fecha vencimiento:'} />
            <SectionInfoPases info={pase.nfcId} titulo={'Carnet:'} />
            <SectionInfoPases info={pase.cargo} titulo={'Cargo:'} />
          </div>

        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Volver</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}