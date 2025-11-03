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
        <DialogContent className="flex flex-col w-full h-[600px]">
          <DialogHeader>
            <DialogTitle>Expediente casos: {accion}</DialogTitle>
            <DialogDescription className="flex gap-2 justify-center items-center">
              Casos: {accion} / {cobranza.celular? cobranza.celular: 'sin numero'} 
             {cobranza.celular && <Button className="w-26 text-start" variant="outline" onClick={enviarWs.bind(null, cobranza!)}>Enviar Mensaje</Button>}
            </DialogDescription>
          </DialogHeader>
              <div className="flex flex-col h-96 justify-center gap-3 p-4 pt-[400px] overflow-auto">
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
