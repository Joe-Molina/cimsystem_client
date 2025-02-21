import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import useSelect from "../hooks/useSelect";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";
import { DialogClose } from "@radix-ui/react-dialog";

export function DialogInteractions({ accion }: { accion: string }) {

  const { selectedOption, factura, setSelectedOption, setFactura } = useSelect('1');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://10.10.1.4:3002/interactions/create', { accion: accion, interaction_TypeId: Number(selectedOption), factura: Number(factura) })
      toast('interaccion registrada con exito')
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
          <DialogTitle>Registrar interaccion</DialogTitle>
          <DialogDescription>
            Tipo de interaccion
          </DialogDescription>
        </DialogHeader>
        <div>
          {/* Etiqueta para el select */}
          <label htmlFor="options">Tipo de interaccion:</label>

          {/* Elemento select */}
          <Select value={selectedOption} onValueChange={setSelectedOption} required>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Selecciona una opcion</SelectLabel>
                <SelectItem value="1">Mensaje de WhastApp</SelectItem>
                <SelectItem value="2">Cobro por Email</SelectItem>
                <SelectItem value="3">Cobro por WhastApp</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {
            (selectedOption == '2' || selectedOption == '3') && <div className=" mt-2">
              <div>
                <p>factura:</p>
                <Input type="number" placeholder="factura" onChange={(e) => setFactura(e.target.value)} required />
              </div>
            </div>
          }
        </div>

        <DialogClose asChild>
          <Button type="submit" onClick={handleSubmit}>Save changes</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}