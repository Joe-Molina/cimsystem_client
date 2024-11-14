import { useEffect, useState } from "react"


interface useFacturasProps {
  numero: string
}

interface FacturaDetalle {
  numero: string,
  accion: string,
  descripcio: string
  cantidad: number,
  pvp: number,
  importe: number,
  fecha_hora: string
}

export const useFacturasDetails = ({ numero }: useFacturasProps) => {

  const [DetallesFactura, setFacturas] = useState<FacturaDetalle[]>()


  useEffect(() => {
    if (!numero) return

    fetch(`http://10.10.1.4:3000/facturas/detalles/${numero}`)
      .then(res => res.json())
      .then(response => {


        setFacturas(response)
      })

  }, [numero])

  return { DetallesFactura }

}