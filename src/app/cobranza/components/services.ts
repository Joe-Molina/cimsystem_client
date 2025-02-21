import axios from "axios"
import { Cobranza_info } from "./DataTable"

export class Msj {
  static getWs(data: Cobranza_info) {
    const a = `
Estimado/a Socio/a 
${data.nombre}

Reciba nuestros cordiales  saludos, en nombre del Dpto. de Cobranzas de CASA DE ITALIA DE MARACAY. Le escribimos el dia de hoy para hacerle un amable recordatorio en relación a sus cuotas vencidas con nuestra Asociación, bajo el Nro. De Acción ${data.accion}

El monto total pendiente,  es de $${data.deuda_total.toFixed(2)} USD, su pago equivalente en Bolívares (tasa BCV) al cambio del dia, correspondiente a ${data.cant_cuotas_vencidas} cuota(s) vencida(s).

Cualquier información adicional puede solicitarla via WhatsApp al teléfono 0412-7863830, a la presente dirección de correo, en recepción hasta las 10pm o en nuestras oficinas administrativas hasta las 5pm.

En caso de hacer pago móvil o transferencias debe enviarlas igualmente por esta vía o el correo electronico cobranzas@casaitaliamaracay.com para el debido registro y posterior emisión de su factura.

Agradecemos además su atención.
atte Dpto. de cobranzas
    `
    return a
  }

  static async sentMail() {

    const sendmail = await axios.post('http://10.10.1.4:3000/cobranza/sendmail',) // cambiar por 10.10.1.4 al terminar los cambios 

    console.log(sendmail)

    return sendmail
  }
}