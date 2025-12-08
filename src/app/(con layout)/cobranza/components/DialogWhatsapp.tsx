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
import { Msj } from "./services";

export function DialogWhatsApp({ accion, data }: { accion: string, data: Cobranza_info }) {

  return (
        <Button className="w-full text-start" variant="outline" onClick={()=> Msj.getEstadoDeCuenta(accion)}>Copiar estado de cuenta</Button>
  )
}