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
import { Cobranza_info, enviarWs } from "../../../components/DataTable"
// import useFetchcases from "../../casos/hooks/useCases"
import { ReactNode, useEffect } from "react"
import { DataCase } from "./DataCaseRow"
import { useGetCasesByAction } from "../../../hooks/useGetCasesByAction"
export function DialogCase({accion, cobranza, children}: {accion: string, cobranza: Cobranza_info, children: ReactNode}) {
      const {cases,isLoading} = useGetCasesByAction({accion})
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Expediente accion: {accion}</DialogTitle>
            <DialogDescription>
              apreta el boton Actualizar caso para editarlo.
            </DialogDescription>
          </DialogHeader>
            <div className='flex gap-2 items-center '>
              <h1 className='font-bold text-xl'>Casos: {accion}</h1>
            {cobranza.celular ? <Button className="w-26 text-start" variant="outline" onClick={enviarWs.bind(null, cobranza!)}>Enviar Mensaje</Button> : <p>No tiene numero de contacto</p>}
            <h1 className='font-bold text-sm bg-slate-200 p-1 rounded-sm '>{cobranza?.celular}</h1>
            </div>
                <div className='flex items-center mb-3  p-2 rounded-md h-full'>
                  <div className='flex justify-center gap-3 overflow-auto h-full p-4'>
                    {
                      isLoading || !cases
                      ?
                      <p>cargando</p>
                      :
                      cases.map((caso) => (
                          <DataCase caso={caso} key={caso.id}/>
                      ))
                    }
                  </div>
                </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cerrar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
