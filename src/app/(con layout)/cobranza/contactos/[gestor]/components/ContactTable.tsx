import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ContactActions, ContactProps } from "../page"
import { format } from "@formkit/tempo"
import TableRowContact from "./TableRow"
import useFetchCobranzas from "../hooks/useFetchCobranzas"



export function ContactTable({ contacts, contactActions }: { contacts: ContactProps[], contactActions: ContactActions}) {

  const {isLoading, cobranzas} = useFetchCobranzas()

  return (
    // APLICAR OVERFLOW Y ALTURA AL CONTENEDOR DIV EXTERNO
    <div className="max-h-[calc(100%-20px)] overflow-y-auto"> 
    
      <Table>
        <TableCaption>Lista de primeros contactos asignados</TableCaption>
        <TableHeader className="sticky top-0 bg-white z-10"> 
          <TableRow>
            <TableHead className="w-[100px]">accion</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>WhatsApp</TableHead>
            <TableHead>Enviar Mensaje</TableHead>
            <TableHead>Respuesta WhatsApp</TableHead>
            <TableHead>Contacto Llamada</TableHead>
            <TableHead>Telefono</TableHead>
            <TableHead>Respuesta Llamada</TableHead>
            <TableHead>Estado del Contacto</TableHead>
            <TableHead>Cuotas</TableHead>
            <TableHead className="text-right">Fecha de Asignacion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody> 
          {!isLoading ? contacts.map((contact) => {
            const cobranza = cobranzas.filter(cobranza => cobranza.accion == contact.accion)

            return (
            <TableRowContact contact={contact}  key={contact.id} contactActions={contactActions}  cobranza={cobranza[0]}/>
          )
          }) : <TableRow><TableCell>Cargando...</TableCell></TableRow> }
        </TableBody>
       </Table>
    </div>
  )
}