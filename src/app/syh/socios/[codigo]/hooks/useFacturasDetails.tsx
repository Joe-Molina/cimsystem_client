import { useEffect, useState } from "react"


interface useFacturasProps {
  codigo: string
}

interface FacturaDetalle {
  nombre: string,
  notas: string,
  tipodoc: string
  proveedor: string,
  emisor: string,
  cantidad: number,
  montototal: number,
  fechadoc: string
  documento: string
  statusdoc: string
}

export const useFacturasDetails = ({ codigo }: useFacturasProps) => {

  const [DetallesFactura, setFacturas] = useState<FacturaDetalle[]>()


  useEffect(() => {
    if (!codigo) return

    fetch(`http://10.10.1.4:3010/facturas/${codigo}`)
      .then(res => res.json())
      .then(response => {
        setFacturas(response.facturas)
      })

  }, [codigo])

  return { DetallesFactura }

}