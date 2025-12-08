'use client'
import axios from "axios"
import { Cobranza_info } from "./DataTable"
import { toast } from "sonner"
import { addHour, format } from "@formkit/tempo"
import { copiarTextoLegacy } from "../utills/copiarTexto"
import copy from "copy-to-clipboard"

interface mesDeudaProps {
  mes: Date
  divisa: number
  bs: number
}

interface EstadoDeCUentaProps {
  accion: string
  totalDivisa: number
  totalBs: number
  mesesDeuda: mesDeudaProps[]
}


export class Msj {
  static getWs(data: Cobranza_info) {
    const msj = `Estimado/a Socio/a ${data.nombre}%0A %0AReciba nuestros cordiales  saludos, en nombre del Dpto. de Cobranzas de CASA DE ITALIA DE MARACAY. Le escribimos el dia de hoy para hacerle un amable recordatorio en relación a sus cuotas vencidas con nuestra Asociación, bajo el Nro. De Acción ${data.accion}%0A %0AEl monto total pendiente,  es de $${data.deuda_total.toFixed(2)} USD, su pago equivalente en Bolívares (tasa BCV) al cambio del dia, correspondiente a ${data.cant_cuotas_vencidas} cuota(s).%0A %0ACualquier información adicional puede solicitarla via WhatsApp al teléfono 0412-7863830, a la presente dirección de correo, en recepción hasta las 10pm o en nuestras oficinas administrativas hasta las 5pm.%0A %0AEn caso de hacer pago móvil o transferencias debe enviarlas igualmente por esta vía o el correo electronico cobranzas@casaitaliamaracay.com para el debido registro y posterior emisión de su factura.%0A %0AAgradecemos además su atención.%0Aatte Dpto. de cobranzas`
    return msj
  }
  
  
  
static async getEstadoDeCuenta(accion: string) {
    // 1. Obtención de Datos
    const data: EstadoDeCUentaProps = (await axios(`http://10.10.1.4:3000/cobranza/get/${accion}`)).data

    // 2. Creación de la Lista de Meses
    const listaMeses = data.mesesDeuda.map(mes => {
        // Asegúrate de que los saltos de línea y el formato sean los deseados
        return `
${format(addHour(mes.mes, 12), 'long').substring(5)}: $${mes.divisa.toFixed(2)} / Bs ${mes.bs.toFixed(2)}`;
    }).join(''); // <--- ¡AQUÍ ESTÁ LA CLAVE! Une los elementos sin separador (o con '\n')

    // 3. Creación del Mensaje Final
    const msj = 
`ESTADO DE CUENTA ACCION ${data.accion}

El monto total pendiente es de $ ${data.totalDivisa.toFixed(2)} / Bs ${data.totalBs.toFixed(2)} (al cambio BCV de hoy ${format(new Date(), "short")}) correspondiente a ${data.mesesDeuda.length} cuotas de mantenimiento:
${listaMeses}
`; // Se deja una línea vacía al final para mejor separación

    // 4. Acciones Finales
    copy(msj)
    toast('Texto copiado')
    
    // Devolver el mensaje en consola (o devolver la promesa de copia)
    return console.log(msj)
}

  static async sentMail() {


    toast('Emails enviados. no volver a enviar en un lapso de 14 dias.')

    const sendmail = await axios.post('http://10.10.1.4:3000/cobranza/sendmail',) // cambiar por 10.10.1.4 al terminar los cambios 

    console.log(sendmail)

    return sendmail
  }
}