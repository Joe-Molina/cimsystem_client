import axios from "axios"
import { Cobranza_info } from "./DataTable"

export class Msj {
  static getWs(data: Cobranza_info) {
    const a = `
Estimado/a Socio/a 
${data.nombre}

Reciba nuestros cordiales  saludos, en nombre del Depto. de Cobranzas de CASA DE ITALIA DE MARACAY. Le escribimos el dia de hoy para hacerle un amable recordatorio en relación a sus cuentas pendientes(vencidas) con nuestra Asociación, bajo el Nro. De Acción ${data.accion}

El monto total pendiente,  asciende a $${data.deuda_total.toFixed(2)} USD, su pago equivalente en Bolívares (tasa BCV) al cambio del dia, correspondiente a ${data.cant_cuotas_vencidas} cuota(s) vencida(s).

Es importante acotar, que debe asegurarse que todas las cuotas por diferencia(aumentos) estén canceladas, aunque es nuestro deber informarle.

Es muy importante recibir oportunamente sus pagos, eso nos permite retribui en mantenimientos constantes y demás obligaciones de la asociación. 

Cualquier información adicional puede solicitarla via WhatsApp al teléfono 0412-7863830, a la presente dirección de correo, en recepción hasta las 10pm o en nuestras oficinas administrativas hasta las 5pm.

En caso de hacer pago móvil o transferencias debe enviarlas igualmente por esta vía para el debido registro y posterior emisión de su factura.

Es para nosotros un placer poder recibirle. Confiamos en su absoluta disposición y contamos con su aporte a la brevedad. 

Agradecemos además su atención.

Maryelin Ruiz
Departamento de cobranzas
    `
    return a
  }

  static async sentMail(data: Cobranza_info[]) {

    const sendmail = await axios.post('http://localhost:3000/cobranza/sendmail', { data })

    console.log(sendmail)

    return sendmail
  }
}