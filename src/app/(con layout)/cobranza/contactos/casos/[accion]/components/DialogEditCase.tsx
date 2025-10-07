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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import axios from "axios"
import { Textarea } from "@/components/ui/textarea"


export function DialogEditCase({id}: {id: number}) {


  const [note, setNote] = useState('')
  const [promesa, setPromesa] = useState('1')

  const updateCase = async ({id, note}:{id: number, note: string}) => {

        const response1 = await axios({
            method: 'patch',
            withCredentials: true,
            url: 'http://10.10.1.4:3002/interactions/update_promise',
            data: {
            id, promesa
            }
        });

  const response = await axios({
    method: 'patch',
    withCredentials: true,
    url: 'http://10.10.1.4:3002/interactions/update_note',
    data: {
      id, note
    }
  });

  if(response && response1){
    window.location.reload(); 
  }
}

useEffect(() => {
  console.log(note)
},[note])


  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Actualizar Historial del caso</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Actualizar Historial del caso</DialogTitle>
            <DialogDescription>
              Registra promesas de pago o impago por parte del socio acompañandolo de una nota
            </DialogDescription>
        </DialogHeader>
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
              <Textarea id="name-1" name="name" defaultValue="Que te informo el socio?" onChange={(e) => setNote(e.target.value)}/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            {note && <Button onClick={() => updateCase({id, note})} >Actualizar Caso</Button>}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
