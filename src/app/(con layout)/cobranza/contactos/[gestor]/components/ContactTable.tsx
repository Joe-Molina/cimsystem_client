import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import TableRowContact from "./TableRow"
import { ContactActions, ContactProps } from "../../types/types"
import { useAllCobranzaInfo } from "../../../react_query_hooks/useCobranza"

export function ContactTable({isLoadingContact, contacts, contactActions}: {isLoadingContact: boolean, contacts: ContactProps[], contactActions: ContactActions}) {
  const {query: {data}} = useAllCobranzaInfo()
  return (
    // APLICAR OVERFLOW Y ALTURA AL CONTENEDOR DIV EXTERNO
    <div className="max-h-[calc(100%-100px)] overflow-y-auto"> 
    
      <Table>
        <TableCaption>Lista de primeros contactos asignados</TableCaption>
        <TableHeader className="sticky top-0 bg-white z-10"> 
          <TableRow>
            <TableHead className="w-[100px]">accion</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>WhatsApp</TableHead>
            <TableHead>Respuesta WhatsApp</TableHead>
            <TableHead>Contacto Llamada</TableHead>
            <TableHead>Respuesta Llamada</TableHead>
            <TableHead>Estado del Contacto</TableHead>
            <TableHead>Cuotas Iniciales</TableHead>
            <TableHead>Cuotas Actuales</TableHead>
            <TableHead className="text-right">Fecha de Asignacion</TableHead>
            <TableHead className="text-right">Opciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody> 
          {!isLoadingContact && data ? contacts.map((contact) => {
            const cobranza = data.filter(cobranza => cobranza.accion == contact.accion)
            return (
            <TableRowContact contact={contact}  key={contact.id} contactActions={contactActions}  cobranza={cobranza[0]}/>
          )
          }) : <TableRow><TableCell>Cargando...</TableCell></TableRow> }
        </TableBody>
       </Table>
    </div>
  )
}