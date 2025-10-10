import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from "axios";
import { toast } from "sonner";
import { DialogClose } from "@radix-ui/react-dialog";
import { Cobranza_info, enviarWs } from "../../../components/DataTable";

export function DialogWhatsApp({ accion, data,  }: { accion: string, data: Cobranza_info}) {

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://10.10.1.4:3002/interactions/create', { accion: accion, interaction_TypeId: 1 })
      toast('contacto registrado con exito')
      return console.log(response)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Dialog>
      <DialogTrigger asChild >
        <Button className="w-26 text-start" variant="outline" onClick={enviarWs.bind(null, data)}>Enviar Mensaje</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar Contacto</DialogTitle>
          <DialogDescription>
            Enviaste el Mensaje de Cobranza
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex gap-2">
          <DialogClose asChild className="w-full" >
            <Button >no</Button>
          </DialogClose>
          <DialogClose asChild className="w-full">
            <Button type="submit">si</Button>
          </DialogClose >
        </div>
      </DialogContent>
    </Dialog>
  )
}