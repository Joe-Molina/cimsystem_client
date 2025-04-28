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
import { Cobranza_info, enviarWs } from "./DataTable";

export function DialogWhatsApp({ accion, data }: { accion: string, data: Cobranza_info }) {

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
        <Button className="w-full text-start" variant="outline" onClick={enviarWs.bind(null, data)}>Contactar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar mensaje</DialogTitle>
          <DialogDescription>
            el mensaje fue recibido?
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex gap-2">
          <DialogClose asChild className="w-full" >
            <Button >no</Button>
          </DialogClose>
          <DialogClose asChild className="w-full">
            <Button type="submit" onClick={handleSubmit}>si</Button>
          </DialogClose >
        </div>
      </DialogContent>
    </Dialog>
  )
}