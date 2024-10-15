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
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AlertDialogDemo: React.FC<AlertDialogProps> = ({ url }) => {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="h-52 w-52 min-h-52 max-w-52 overflow-hidden rounded-full border-2 border-zinc-700">
          <Image priority src={url} alt="socio" width={200} height={200} className="rounded-full h-52 w-52 hover:scale-110 transition  overflow-hidden" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Image priority src={url} alt="socio" width={200} height={200} className="rounded-sm h-full w-full  transition " />
        <AlertDialogFooter>
          <AlertDialogCancel>Volver</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}