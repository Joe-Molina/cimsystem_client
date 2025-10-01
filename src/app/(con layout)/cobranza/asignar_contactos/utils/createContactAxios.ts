import axios from "axios";

export const crearContacto = async (user: number, accion: string) => {
  const response = await axios({
    method: 'post',
    withCredentials: true,
    url: 'http://10.10.1.4:3002/interactions/create_contact',
    data: {
      user,
      accion
    }
  });

  if(response) console.log('contacto creado' + user + accion)
  return response
}