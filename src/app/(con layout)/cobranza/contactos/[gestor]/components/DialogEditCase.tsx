import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { updateCasePromise, updateContact, updateContactAvailable, updateContactCall, updateResponse, updateResponseCall } from "../utils/getContactAxios"
import { toast } from "sonner"


export function DialogEditCase({id}: {id: number}) {
  const [note, setNote] = useState('')
  const [promesa, setPromesa] = useState('1')
useEffect(() => {
  console.log(note)
},[note])


const updateContactReload = async(id: number) => {
  const response = await updateContact(id)
  if (response){
    toast('Mensaje enviado')
  }
}
const updateResponseReload = async(id: number) => {
  const response = await updateResponse(id)

  if (response){
    toast('Respuesta de mensaje actualizada')
  }

}
const updateContactCallReload = async(id: number) => {
  const response = await updateContactCall(id)
  if (response){
    toast('Socio llamado')
  }
}
const updateResponseCallReload = async(id: number) => {
  const response = await updateResponseCall(id)
  if (response){
    toast('Llamada atendida')
  }
}
const updateContactAvailableReload = async(id: number) => {
    const response = await updateContactAvailable(id)
    if (response){
      toast('Actualizado a contacto no disponible')
    }
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-32 flex">Actualizar</Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Actualizar Historial del caso</DialogTitle>
            <DialogDescription>
              Registra promesas de pago o impago por parte del socio acompañandolo de una nota
            </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 max-w-full">
              <Button className="text-xs w-full" onClick={() => updateContactReload(id)} >Registrar mensaje enviado</Button>
              <Button className="text-xs w-full" onClick={() => updateResponseReload(id)} >Registrar mensaje Contestado</Button>
          </div>
          <div>
            <div className="flex gap-2 max-w-full">
              <Button className="text-xs w-full" onClick={() => updateContactCallReload(id)} >Registrar llamada</Button>
              <Button className="text-xs w-full" onClick={() => updateResponseCallReload(id)} >Registrar llamada Contestada</Button>
          </div>
          </div>
          <Button className="text-xs w-full" onClick={() => updateContactAvailableReload(id)} >Registrar contacto no disponible</Button>
          {/* <DialogWhatsApp accion={contact.accion} data={cobranza} actualizarContacto={contactActions.actualizarContacto} contactId={contact.id}/> */}
        </div>
          <RadioGroup defaultValue="1" onValueChange={setPromesa}>
            <div className="flex items-center gap-3  bg-green-100 text-green-800 p-1 rounded-md">
              <RadioGroupItem value="1" id="r1" />
              <Label htmlFor="r1">Promesa de Pago</Label>
            </div>
            <div className="flex items-center gap-3 bg-red-100 text-red-800 p-1 rounded-md ">
              <RadioGroupItem value="2" id="r2" />
              <Label htmlFor="r2">Promesa de Impago</Label>
            </div>
          </RadioGroup>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Nota:</Label>
              <Textarea id="name-1" name="name" placeholder="Que te informo el socio?" onChange={(e) => setNote(e.target.value)}/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            {note && <Button onClick={() => updateCasePromise({id, note, promesa})} >Actualizar Caso</Button>}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
