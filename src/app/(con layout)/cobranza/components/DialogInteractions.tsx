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

export function DialogInteractions({ accion }: { accion: string }) {

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
        <Button className="w-full text-start" variant="outline">Registrar interaccion</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar contacto</DialogTitle>
          <DialogDescription>
            Deseas registrar un nuevo contacto con esta accion?
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