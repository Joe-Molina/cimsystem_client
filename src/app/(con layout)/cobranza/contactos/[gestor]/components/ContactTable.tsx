import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ContactProps } from "../page"
import { format } from "@formkit/tempo"
import TableRowContact from "./TableRow"
import useFetchCobranzas from "../hooks/useFetchCobranzas"



export function ContactTable({ contacts, actualizarContacto, actualizarResponse }: { contacts: ContactProps[], actualizarContacto: (id: number) => Promise<void>, actualizarResponse: (id: number) => Promise<void> }) {

  const {isLoading, cobranzas} = useFetchCobranzas()

  return (
    // APLICAR OVERFLOW Y ALTURA AL CONTENEDOR DIV EXTERNO
    <div className="max-h-full overflow-y-auto"> 
    
      <Table>
        <TableCaption>Lista de primeros contactos asignados</TableCaption>
        <TableHeader className="sticky top-0 bg-white z-10"> 
          <TableRow>
            <TableHead className="w-[100px]">accion</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead>Respuesta</TableHead>
            <TableHead>Contactar</TableHead>
            <TableHead>Telefono</TableHead>
            <TableHead>Cuotas</TableHead>
            <TableHead className="text-right">Fecha de Asignacion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody> 
          {!isLoading ? contacts.map((contact) => {
            const cobranza = cobranzas.filter(cobranza => cobranza.accion == contact.accion)

            return (
            <TableRowContact contact={contact} actualizarContacto={actualizarContacto} actualizarResponse={actualizarResponse} key={contact.id} cobranza={cobranza[0]}/>
          )
          }) : <TableRow><TableCell>Cargando...</TableCell></TableRow> }
        </TableBody>
       </Table>
    </div>
  )
}