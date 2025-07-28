import { useEffect, useState } from "react"


interface useInvitadosProps {
  accion: string
}

interface Invitados {
  accion: string
  cedula_i: string
  nombre_i: string
  fecha_hora: string
  tipo_pase: string
  id_invit: number
}

export const useInvitados = ({ accion }: useInvitadosProps) => {

  const [invitados, setInvitados] = useState<Invitados[]>()


  useEffect(() => {
    if (!accion) return

    fetch(`http://10.10.1.4:3000/socios/invitados/${accion}`)
      .then(res => res.json())
      .then(response => {


        setInvitados(response)
      })

  }, [accion])

  return { invitados }

}