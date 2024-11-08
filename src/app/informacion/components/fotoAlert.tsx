import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from "next/image"

interface AlertDialogProps {
  url: string;
  accion: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AlertDialogDemo: React.FC<AlertDialogProps> = ({ url, accion }) => {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex flex-col h-full justify-center items-center rounded-sm ">
          <p className="text-sm text-zinc-500">Accion</p>
          <p className="text-2xl text-zinc-600 font-bold">{accion}</p>
          <Image priority src={url} alt="socio" width={100} height={100} className="rounded-lg h-36 w-36 overflow-hidden" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Image priority src={url} alt="socio" width={200} height={200} className="rounded-sm h-full w-full  transition" />
        <AlertDialogFooter>
          <AlertDialogCancel>Volver</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}