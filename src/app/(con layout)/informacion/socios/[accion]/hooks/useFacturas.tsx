import { useEffect, useState } from "react"


interface useFacturasProps {
  accion: string
}

interface Factura {
  numero: string,
  accion: string,
  total: number,
  sub_total: number,
  monto_iva: number,
  recibido: number,
  fecha_hora: string
}

export const useFacturas = ({ accion }: useFacturasProps) => {

  const [facturas, setFacturas] = useState<Factura[]>()


  useEffect(() => {
    if (!accion) return

    fetch(`http://10.10.1.4:3000/facturas/${accion}`)
      .then(res => res.json())
      .then(response => {


        setFacturas(response)
      })

  }, [accion])

  return { facturas }

}