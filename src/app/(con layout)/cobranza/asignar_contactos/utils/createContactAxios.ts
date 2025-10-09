import axios from "axios";

export const crearCaso = async ({accion,cuotasIniciales,user}:{user: number, accion: string, cuotasIniciales: number}) => {
  const response = await axios({
    method: 'post',
    withCredentials: true,
    url: 'http://10.10.1.4:3002/interactions/create_contact',
    data: {
      user,
      accion,
      cuotasIniciales
    }
  });

  if(response) console.log('caso creado' + user + accion)
  return response
}

export const updateCuotas = async ({ id, cuotas}: { id: number, cuotas: number, }) => {
  const response = await axios({
    method: 'patch',
    withCredentials: true,
    url: 'http://10.10.1.4:3002/interactions/update_cuotas',
    data: {
      id,cuotas
    }
  });

  if (response) console.log(`orden ${id} actualizo sus cuotas iniciales a ${cuotas}`)
  return response
}