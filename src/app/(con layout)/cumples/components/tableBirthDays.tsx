'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useBirdthDay } from "../hooks/useBirdthDay"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { familiares, Socio } from "@/types"
import { Key } from "react"

export interface TableBProps {
  Socios: Socio[]
  updatedConyuges: familiares[]
}


const TableB: React.FC<TableBProps> = ({ Socios, updatedConyuges }) => {
  return (
    <Table>
      <TableCaption>Lista De Cumpleañeros</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">accion</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>cedula</TableHead>
          <TableHead>telefono</TableHead>
          <TableHead>email</TableHead>
          <TableHead className="text-right">fecha</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-zinc-600">
        {Socios.map((birthDay: Socio, index: Key | null | undefined) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{birthDay.accion}</TableCell>
            <TableCell>{birthDay.nombre}</TableCell>
            <TableCell>{birthDay.cedula}</TableCell>
            <TableCell>{birthDay.celular}</TableCell>
            <TableCell>{birthDay.e_mail}</TableCell>
            <TableCell className="text-right">{birthDay.fecha_nac.slice(0, 10)}</TableCell>
          </TableRow>
        ))}
        {updatedConyuges.map((birthDay, index: Key | null | undefined) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{birthDay.accion}</TableCell>
            <TableCell>{birthDay.nom_fam}</TableCell>
            <TableCell>{birthDay.ced_fam}</TableCell>
            <TableCell>{birthDay.cel_fam}</TableCell>
            <TableCell>{birthDay.email_fam}</TableCell>
            <TableCell className="text-right">{birthDay.fec_fam.slice(0, 10)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const TabsBirthDdays = () => {

  const { Month, Today, Tomorrow } = useBirdthDay()

  console.log({ Month, Today, Tomorrow })

  return (
    <Tabs defaultValue="hoy" className="w-full px-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="hoy">hoy</TabsTrigger>
        <TabsTrigger value="manana">Mañana</TabsTrigger>
        <TabsTrigger value="mes">Mes</TabsTrigger>
      </TabsList>
      <TabsContent value="hoy" className="p-10 h-[70vh] overflow-y-auto">
        {Today && <TableB Socios={Today.Socios} updatedConyuges={Today.updatedConyuges} />}
      </TabsContent>
      <TabsContent value="manana" className="p-10 h-[70vh] overflow-y-auto">
        {Tomorrow && <TableB Socios={Tomorrow.Socios} updatedConyuges={Tomorrow.updatedConyuges} />}
      </TabsContent>
      <TabsContent value="mes" className="p-10 h-[70vh] overflow-y-auto">
        {Month && <TableB Socios={Month.Socios} updatedConyuges={Month.updatedConyuges} />}
      </TabsContent>
    </Tabs>
  )
}